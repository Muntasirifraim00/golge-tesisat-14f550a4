#!/usr/bin/env node
/**
 * i18n coverage scanner.
 *
 * Walks src/{routes,components,i18n} and flags JSX text and string literals
 * that look like hardcoded Turkish or English UI copy not routed through
 * the dictionary. Output: a per-file table of suspects, grouped by language.
 *
 * Usage: node scripts/i18n-coverage.mjs [--json]
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["src/routes", "src/components"];
const EXTS = new Set([".tsx", ".ts"]);
const SKIP_FILES = new Set([
  "src/i18n/dictionary.ts",
  "src/i18n/LanguageProvider.tsx",
  "src/routeTree.gen.ts",
]);

// Turkish-specific characters strongly indicate TR copy.
const TR_CHARS = /[çğıöşüÇĞİÖŞÜ]/;
// Common TR words that lack diacritics but are clearly Turkish.
const TR_WORDS = /\b(ve|ile|için|bir|bu|de|da|mı|mi|mu|mü|var|yok|hemen|şu an|adres|telefon|tarih|saat|hizmet|randevu|bölge|ilçe|mahalle|onay|tamam|iptal|geri|ileri|gönder|kaydet|sil|ekle|seç|seçin|adınız|adres bilgileri|tesisat|tıkanıklık|kaçak|kombi|usta|garanti|sözleşme|kvkk|çerez|saniyede|dakikada|yıl|yılında|tamamlanan|aktif|teslim|edilen|proje|mutlu|müşteri|memnuniyet)\b/i;
// EN words common in UI; treated as suspect only inside ternary fallbacks we already detect.
const EN_WORD_HINT = /\b(the|and|with|for|your|book|now|next|back|submit|cancel|please|select|choose|address|district|date|time|service|appointment|name|phone|emergency|review|confirm|loading|error)\b/i;

const IGNORE_LITERAL = /^(?:[A-Z_]+|[0-9.,:/+\-*\sxX×#%]+|https?:\/\/.+|[a-z][a-zA-Z0-9-]*|tr|en|TR|EN)$/;
const TECHNICAL_PROPS = new Set([
  "className", "id", "key", "name", "type", "href", "src", "alt", "rel", "role",
  "aria-label", "aria-labelledby", "aria-describedby", "data-testid", "to",
  "from", "method", "encType", "target", "rel", "as", "viewBox", "xmlns",
  "fill", "stroke", "d", "transform", "fillRule", "clipRule", "strokeLinecap",
  "strokeLinejoin", "strokeWidth", "cx", "cy", "r", "x", "y", "x1", "y1",
  "x2", "y2", "points", "preserveAspectRatio", "color", "bg", "size",
]);

function* walk(dir) {
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const name of entries) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (EXTS.has(p.slice(p.lastIndexOf(".")))) yield p;
  }
}

function classify(str) {
  if (TR_CHARS.test(str) || TR_WORDS.test(str)) return "tr";
  // Heuristic: an English sentence has ≥2 EN words and a space.
  if (str.includes(" ") && (str.match(EN_WORD_HINT) || []).length >= 1) return "en";
  return null;
}

function scanFile(path) {
  const src = readFileSync(path, "utf8");
  const rel = relative(ROOT, path);
  const findings = { tr: [], en: [] };

  // Strip block comments and line comments
  let clean = src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => " ".repeat(m.length))
    .replace(/^\s*\/\/.*$/gm, (m) => " ".repeat(m.length));

  // Strip internal bilingual dictionary blocks: anywhere we see `tr: {` matched by a
  // corresponding `en: {` later, blank both blocks out so their literals don't get
  // double-counted. This handles per-file dictionaries like randevu.tsx STR.tr/STR.en.
  clean = blankBilingualBlocks(clean);

  // Build a set of "bilingual" line numbers — lines that contain an `en ? ... : ...`
  // (or `lang === "en"`) ternary. We treat strings/JSX on those lines as already
  // covered in both languages and exclude them from findings.
  const bilingualLines = new Set();
  const lines = clean.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const L = lines[i];
    if (/\ben\s*\?/.test(L) || /lang\s*===\s*["']en["']/.test(L) || /\?\s*["'`].+?["'`]\s*:\s*["'`].+?["'`]/.test(L)) {
      bilingualLines.add(i + 1);
    }
  }



  // 1) JSX text children: > visible text <
  const jsxText = /(?<=>)([^<>{}\n]{3,}?)(?=<)/g;
  let m;
  while ((m = jsxText.exec(clean))) {
    const text = m[1].trim();
    if (!text || text.length < 3) continue;
    if (IGNORE_LITERAL.test(text)) continue;
    const lang = classify(text);
    if (!lang) continue;
    const ln = lineOf(src, m.index);
    if (bilingualLines.has(ln)) continue;
    findings[lang].push({ line: ln, text: snippet(text) });
  }


  // 2) String literals: "..." or '...' or `...` excluding imports / certain props
  const strLit = /(?<![A-Za-z0-9_$])(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g;
  while ((m = strLit.exec(clean))) {
    const text = m[2];
    if (!text || text.length < 3) continue;
    if (IGNORE_LITERAL.test(text)) continue;

    // Skip imports / requires
    const lineStart = clean.lastIndexOf("\n", m.index) + 1;
    const lineEnd = clean.indexOf("\n", m.index);
    const line = clean.slice(lineStart, lineEnd === -1 ? undefined : lineEnd);
    if (/^\s*(?:import|export)\s/.test(line)) continue;
    if (/from\s+["'`]/.test(line) && line.indexOf(m[0]) >= line.indexOf("from")) continue;

    // Skip technical prop values: className="...", id="..."
    const before = clean.slice(Math.max(0, m.index - 40), m.index);
    const propMatch = before.match(/(\w[\w-]*)\s*=\s*\{?\s*$/);
    if (propMatch && TECHNICAL_PROPS.has(propMatch[1])) continue;

    // Skip CSS-like strings (contains tailwind tokens)
    if (/(?:px-|py-|mx-|my-|gap-|text-|bg-|border|rounded|flex|grid|absolute|relative|inline-|font-|tracking-|leading-|shadow|hover:|focus:|md:|lg:|sm:)/.test(text)) continue;

    const lang = classify(text);
    if (!lang) continue;
    const ln = lineOf(src, m.index);
    if (bilingualLines.has(ln)) continue;
    findings[lang].push({ line: ln, text: snippet(text) });
  }

  // Dedupe by line+text
  for (const k of ["tr", "en"]) {
    const seen = new Set();
    findings[k] = findings[k].filter((f) => {
      const key = `${f.line}::${f.text}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  return { file: rel, ...findings };
}

function lineOf(src, idx) { return src.slice(0, idx).split("\n").length; }

// Replace `tr: { ... }` and `en: { ... }` blocks with spaces when a file is a
// bilingual dictionary (i.e. it contains both keys). Keeps line numbers stable.
function blankBilingualBlocks(src) {
  if (!/\btr\s*:\s*\{/.test(src) || !/\ben\s*:\s*\{/.test(src)) return src;
  let out = src;
  for (const key of ["tr", "en"]) {
    const re = new RegExp(`\\b${key}\\s*:\\s*\\{`, "g");
    let m;
    while ((m = re.exec(out))) {
      const start = m.index + m[0].length - 1; // index of "{"
      let depth = 1;
      let i = start + 1;
      while (i < out.length && depth > 0) {
        const ch = out[i];
        if (ch === "{") depth++;
        else if (ch === "}") depth--;
        else if (ch === '"' || ch === "'" || ch === "`") {
          // skip string literal
          const q = ch;
          i++;
          while (i < out.length && out[i] !== q) {
            if (out[i] === "\\") i++;
            i++;
          }
        }
        i++;
      }
      // Blank out the contents between { and } but keep braces and newlines
      const inner = out.slice(start + 1, i - 1);
      const blanked = inner.replace(/[^\n]/g, " ");
      out = out.slice(0, start + 1) + blanked + out.slice(i - 1);
    }
  }
  return out;
}

function snippet(s) { return s.length > 80 ? s.slice(0, 77) + "..." : s; }

function main() {
  const json = process.argv.includes("--json");
  const files = [];
  for (const d of SCAN_DIRS) files.push(...walk(join(ROOT, d)));

  const results = files
    .filter((f) => !SKIP_FILES.has(relative(ROOT, f)))
    .map(scanFile)
    .filter((r) => r.tr.length || r.en.length)
    .sort((a, b) => (b.tr.length + b.en.length) - (a.tr.length + a.en.length));

  if (json) {
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  const totalTR = results.reduce((s, r) => s + r.tr.length, 0);
  const totalEN = results.reduce((s, r) => s + r.en.length, 0);

  console.log(`\n=== i18n hardcoded-string scan ===`);
  console.log(`Scanned ${files.length} files in ${SCAN_DIRS.join(", ")}`);
  console.log(`Files with suspects: ${results.length}`);
  console.log(`Hardcoded TR strings: ${totalTR}`);
  console.log(`Hardcoded EN strings: ${totalEN}\n`);

  for (const r of results) {
    console.log(`── ${r.file}  (TR:${r.tr.length}  EN:${r.en.length})`);
    for (const f of r.tr.slice(0, 8)) console.log(`   TR L${f.line}: ${f.text}`);
    if (r.tr.length > 8) console.log(`   … +${r.tr.length - 8} more TR`);
    for (const f of r.en.slice(0, 8)) console.log(`   EN L${f.line}: ${f.text}`);
    if (r.en.length > 8) console.log(`   … +${r.en.length - 8} more EN`);
    console.log("");
  }
}
main();
