import { createFileRoute } from "@tanstack/react-router";
import { BUSINESS } from "@/data/business";

// Dynamic Open Graph / social share image.
// Rendered on the server from live data so the phone number (and other NAP
// details) in the share preview always match src/data/business.ts — change the
// number in one place and every shared link updates automatically.
//
// Implementation note: this stack runs server code in a Worker/Node SSR
// runtime where WASM-based renderers (satori/resvg) fail to bundle. We use
// pureimage (pure JS, no native deps, no WASM) to draw a branded PNG.

// Base design canvas. All coordinates below are authored against this size,
// then uniformly scaled to whatever w/h the caller requests so the layout
// matches each platform's recommended OG dimensions (1200x630, 1200x628, etc.).
const BASE_WIDTH = 1200;
const BASE_HEIGHT = 630;
// Safety bounds so a crafted URL can't request a huge canvas.
const MIN_DIM = 200;
const MAX_DIM = 2400;
const FONT_URL =
  "https://cdn.jsdelivr.net/npm/@expo-google-fonts/inter/Inter_700Bold.ttf";
const FONT_FAMILY = "Inter";
const FONT_TMP_PATH = "/tmp/og-inter-bold.ttf";

const COLORS = {
  navy: "#0b1428",
  navyDeep: "#08101f",
  red: "#e11d2a",
  white: "#ffffff",
  muted: "#9fb4d4",
  chip: "#cdd8ea",
};

let fontReady: Promise<void> | null = null;

async function ensureFont(PImage: typeof import("pureimage")) {
  if (!fontReady) {
    fontReady = (async () => {
      const { writeFile } = await import("node:fs/promises");
      const res = await fetch(FONT_URL);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(FONT_TMP_PATH, buf);
      const reg = PImage.registerFont(FONT_TMP_PATH, FONT_FAMILY);
      await reg.load();
    })();
  }
  await fontReady;
}

async function renderPng(width: number, height: number): Promise<Buffer> {
  const PImage = await import("pureimage");
  const { Writable } = await import("node:stream");
  await ensureFont(PImage);

  const phone = BUSINESS.phoneDisplay;
  const domain = BUSINESS.url.replace(/^https?:\/\//, "");

  // Uniform scale from the base design to the requested canvas. Using the
  // smaller axis keeps text/elements inside the frame for any aspect ratio.
  const scale = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
  // Helpers map base-design coordinates onto the scaled, centered canvas.
  const offsetX = (width - BASE_WIDTH * scale) / 2;
  const offsetY = (height - BASE_HEIGHT * scale) / 2;
  const sx = (x: number) => offsetX + x * scale;
  const sy = (y: number) => offsetY + y * scale;
  const sv = (v: number) => v * scale;

  const img = PImage.make(width, height);
  // pureimage's bundled TS types are incomplete for gradients; use a loose handle.
  const ctx = img.getContext("2d") as unknown as {
    font: string;
    fillStyle: unknown;
    fillRect: (x: number, y: number, w: number, h: number) => void;
    fillText: (text: string, x: number, y: number) => void;
    measureText: (text: string) => { width?: number };
    createLinearGradient: (
      x0: number,
      y0: number,
      x1: number,
      y1: number,
    ) => { addColorStop: (offset: number, color: string) => void };
  };

  // Diagonal navy -> red gradient background (fills the full requested canvas)
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, COLORS.navyDeep);
  grad.addColorStop(0.55, COLORS.navy);
  grad.addColorStop(1, "#5e0d18");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  const PAD = 76;

  // measure returns a width in BASE-design units so layout math stays simple.
  const measure = (text: string, pt: number) => {
    ctx.font = `${sv(pt)}pt ${FONT_FAMILY}`;
    const m = ctx.measureText(text) as { width?: number };
    const w =
      typeof m.width === "number" ? m.width : text.length * sv(pt) * 0.6;
    return w / scale;
  };



  // Eyebrow
  ctx.fillStyle = COLORS.muted;
  ctx.font = `${sv(20)}pt ${FONT_FAMILY}`;
  ctx.fillText("İSTANBUL 7/24 ACİL TESİSATÇI", sx(PAD), sy(96));

  // 7/24 ACİL badge (top-right)
  const badgeText = "7/24 ACİL";
  const badgeW = measure(badgeText, 20) + 52;
  const badgeX = BASE_WIDTH - PAD - badgeW;
  ctx.fillStyle = COLORS.red;
  ctx.fillRect(sx(badgeX), sy(66), sv(badgeW), sv(46));
  ctx.fillStyle = COLORS.white;
  ctx.font = `${sv(20)}pt ${FONT_FAMILY}`;
  ctx.fillText(badgeText, sx(badgeX + 26), sy(98));

  // Title (two lines)
  ctx.fillStyle = COLORS.white;
  ctx.font = `${sv(96)}pt ${FONT_FAMILY}`;
  ctx.fillText("GÖLGE", sx(PAD), sy(250));
  ctx.fillText("TESİSAT", sx(PAD), sy(358));

  // Red accent bar
  ctx.fillStyle = COLORS.red;
  ctx.fillRect(sx(PAD), sy(388), sv(280), sv(9));

  // Phone pill
  const phonePt = 52;
  const phoneW = measure(phone, phonePt);
  const pillX = PAD;
  const pillY = 432;
  const pillH = 100;
  const pillW = phoneW + 96;
  ctx.fillStyle = COLORS.red;
  ctx.fillRect(sx(pillX), sy(pillY), sv(pillW), sv(pillH));
  ctx.fillStyle = COLORS.white;
  ctx.font = `${sv(phonePt)}pt ${FONT_FAMILY}`;
  ctx.fillText(phone, sx(pillX + 48), sy(pillY + 70));

  // Bottom row: services (left) + domain (right)
  ctx.fillStyle = COLORS.chip;
  ctx.font = `${sv(21)}pt ${FONT_FAMILY}`;
  ctx.fillText("SU KAÇAĞI  •  TIKANIKLIK  •  KOMBİ SERVİSİ", sx(PAD), sy(596));

  ctx.fillStyle = COLORS.white;
  const domainW = measure(domain, 22);
  ctx.font = `${sv(22)}pt ${FONT_FAMILY}`;
  ctx.fillText(domain, sx(BASE_WIDTH - PAD - domainW), sy(596));


  const chunks: Buffer[] = [];
  const sink = new Writable({
    write(chunk, _enc, cb) {
      chunks.push(Buffer.from(chunk));
      cb();
    },
  });
  await PImage.encodePNGToStream(img, sink);
  return Buffer.concat(chunks);
}

// Parse a dimension query param, clamp to safe bounds, fall back to a default.
function parseDim(raw: string | null, fallback: number): number {
  const n = raw === null ? NaN : Math.round(Number(raw));
  if (!Number.isFinite(n)) return fallback;
  return Math.max(MIN_DIM, Math.min(MAX_DIM, n));
}

export const Route = createFileRoute("/og-image.jpg")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          // ?w= / ?h= let each platform request its recommended size, e.g.
          // /og-image.jpg?w=1200&h=630 (Open Graph) or ?w=1200&h=628 (Twitter).
          const url = new URL(request.url);
          const width = parseDim(url.searchParams.get("w"), BASE_WIDTH);
          const height = parseDim(url.searchParams.get("h"), BASE_HEIGHT);
          const png = await renderPng(width, height);
          const body = png.buffer.slice(
            png.byteOffset,
            png.byteOffset + png.byteLength,
          ) as ArrayBuffer;
          return new Response(body, {
            status: 200,
            headers: {
              "Content-Type": "image/png",
              "Cache-Control": "public, max-age=86400, s-maxage=86400",
            },
          });
        } catch (err) {
          return new Response(
            `OG image error: ${err instanceof Error ? err.stack || err.message : String(err)}`,
            { status: 500, headers: { "Content-Type": "text/plain" } },
          );
        }
      },
    },
  },
});

