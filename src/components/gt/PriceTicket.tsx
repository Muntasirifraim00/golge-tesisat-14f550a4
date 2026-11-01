import { useEffect, useRef, useState } from "react";

// Animated "quote ticket": a printer prints the quote line by line, the total is
// fixed, and the customer's approval stamp lands — before any work starts.
// Pure canvas, paused off-screen, static frame for prefers-reduced-motion.
const LINES: [string, string][] = [
  ["Keşif", "ÜCRETSİZ"],
  ["İşçilik", "✓"],
  ["Parça", "✓"],
  ["Toplam", "NET FİYAT"],
  ["Ek iş", "SADECE ONAYINIZLA"],
];

export function PriceTicket({ title = "FİYAT TEKLİFİ" }: { title?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState("KEŞİF YAPILIYOR…");

  useEffect(() => {
    const cv = cvRef.current, box = boxRef.current;
    if (!cv || !box) return;
    const cx = cv.getContext("2d");
    if (!cx) return;
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, DPR = 1, run = true, raf = 0, last = "";
    const t0 = performance.now();
    const rs = () => { const r = cv.getBoundingClientRect(); DPR = Math.min(2, devicePixelRatio || 1); W = r.width; H = r.height; cv.width = W * DPR; cv.height = H * DPR; };
    rs();
    addEventListener("resize", rs);
    const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => (run = e.isIntersecting))) : null;
    io?.observe(box);
    const rr = (x: number, y: number, w: number, h: number, r: number) => { cx.beginPath(); cx.moveTo(x + r, y); cx.arcTo(x + w, y, x + w, y + h, r); cx.arcTo(x + w, y + h, x, y + h, r); cx.arcTo(x, y + h, x, y, r); cx.arcTo(x, y, x + w, y, r); cx.closePath(); };
    const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!run && !RM) return;
      const T = 10, tt = RM ? 8.2 : ((now - t0) / 1000) % T;
      cx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx.clearRect(0, 0, W, H);
      cx.strokeStyle = "rgba(255,255,255,.04)"; cx.lineWidth = 1;
      for (let x = 0; x < W; x += 28) { cx.beginPath(); cx.moveTo(x, 0); cx.lineTo(x, H); cx.stroke(); }
      for (let y = 0; y < H; y += 28) { cx.beginPath(); cx.moveTo(0, y); cx.lineTo(W, y); cx.stroke(); }
      const s = Math.min(W, H) / 470, pw = 250 * s, px0 = (W - pw) / 2, slotY = H * 0.12;
      rr(px0 - 26 * s, slotY - 34 * s, pw + 52 * s, 46 * s, 14 * s); cx.fillStyle = "#2A2121"; cx.fill();
      cx.fillStyle = "#0B0808"; cx.fillRect(px0 - 6 * s, slotY - 4 * s, pw + 12 * s, 8 * s);
      cx.fillStyle = tt < 7.2 ? (Math.sin(now / 120) > 0 ? "#FF4A4A" : "#5A1A1A") : "#2BD46E";
      cx.beginPath(); cx.arc(px0 + pw + 6 * s, slotY - 18 * s, 5 * s, 0, 7); cx.fill();
      cx.fillStyle = "#8E8280"; cx.font = "700 " + 10 * s + 'px "JetBrains Mono",monospace'; cx.textAlign = "left"; cx.fillText("GÖLGE TESİSAT · TEKLİF", px0 - 6 * s, slotY - 14 * s);
      const full = 370 * s, len = full * ease(tt / 6.2);
      cx.save(); cx.beginPath(); cx.rect(0, slotY, W, H); cx.clip();
      const py = slotY + len - full;
      cx.shadowColor = "rgba(0,0,0,.5)"; cx.shadowBlur = 30 * s; cx.shadowOffsetY = 14 * s;
      cx.fillStyle = "#FBF7F5"; cx.beginPath(); cx.moveTo(px0, slotY - 10); cx.lineTo(px0 + pw, slotY - 10); cx.lineTo(px0 + pw, py + full);
      for (let k = 0; k <= 12; k++) cx.lineTo(px0 + pw - (k * pw) / 12, py + full + (k % 2 ? 7 * s : 0));
      cx.closePath(); cx.fill(); cx.shadowColor = "transparent";
      const L = px0 + 18 * s, R = px0 + pw - 18 * s;
      let y = py + 30 * s;
      cx.fillStyle = "#110D0D"; cx.font = "900 " + 20 * s + 'px "Barlow Condensed",sans-serif'; cx.fillText(title, L, y);
      y += 16 * s; cx.fillStyle = "#6E6260"; cx.font = "700 " + 9 * s + 'px "JetBrains Mono",monospace'; cx.fillText("TEK İŞ · TEK FİYAT · İŞTEN ÖNCE", L, y);
      y += 14 * s; cx.setLineDash([4 * s, 4 * s]); cx.strokeStyle = "#D9CCC9"; cx.beginPath(); cx.moveTo(L, y); cx.lineTo(R, y); cx.stroke(); cx.setLineDash([]);
      LINES.forEach((ln, i) => {
        y += 30 * s;
        const a = ease((tt - 1 - i * 0.7) / 0.5);
        if (a <= 0) return;
        cx.globalAlpha = a;
        cx.fillStyle = "#110D0D"; cx.font = "700 " + 13 * s + "px Archivo,sans-serif"; cx.textAlign = "left"; cx.fillText(ln[0], L, y);
        cx.fillStyle = i === 4 ? "#A30000" : "#1D8A4E"; cx.font = "700 " + 10.5 * s + 'px "JetBrains Mono",monospace'; cx.textAlign = "right"; cx.fillText(ln[1], R, y);
        cx.strokeStyle = "#EFE6E3"; cx.beginPath(); cx.moveTo(L, y + 10 * s); cx.lineTo(R, y + 10 * s); cx.stroke();
        cx.globalAlpha = 1;
      });
      y += 36 * s;
      const ta = ease((tt - 4.8) / 0.6);
      if (ta > 0) {
        cx.globalAlpha = ta; cx.fillStyle = "#110D0D"; cx.fillRect(L, y - 20 * s, R - L, 32 * s);
        cx.fillStyle = "#fff"; cx.textAlign = "left"; cx.font = "900 " + 15 * s + 'px "Barlow Condensed",sans-serif'; cx.fillText("ONAYINIZA SUNULDU", L + 10 * s, y + 1 * s);
        cx.textAlign = "right"; cx.fillStyle = "#FF6B6B"; cx.font = "700 " + 10.5 * s + 'px "JetBrains Mono",monospace'; cx.fillText("NET ✓", R - 10 * s, y + 1 * s);
        cx.globalAlpha = 1;
      }
      cx.restore();
      const sa = (tt - 6.6) / 0.35;
      if (sa > 0) {
        const k = sa < 1 ? 2.2 - 1.2 * ease(sa) : 1;
        cx.save(); cx.translate(px0 + pw / 2, py + 312 * s); cx.rotate(-0.12); cx.scale(k, k); cx.globalAlpha = Math.min(1, sa) * 0.92;
        cx.strokeStyle = "#D50A0A"; cx.lineWidth = 4 * s; rr(-82 * s, -26 * s, 164 * s, 52 * s, 10 * s); cx.stroke();
        cx.lineWidth = 1.5 * s; rr(-76 * s, -20 * s, 152 * s, 40 * s, 7 * s); cx.stroke();
        cx.fillStyle = "#D50A0A"; cx.textAlign = "center"; cx.font = "900 " + 18 * s + 'px "Barlow Condensed",sans-serif'; cx.fillText("ONAYLADINIZ", 0, 2 * s);
        cx.font = "700 " + 8 * s + 'px "JetBrains Mono",monospace'; cx.fillText("İŞ BAŞLAYABİLİR", 0, 14 * s);
        cx.restore();
      }
      const p = tt < 1 ? "KEŞİF YAPILIYOR…" : tt < 4.8 ? "FİYAT HESAPLANIYOR…" : tt < 6.6 ? "NET FİYAT ONAYINIZDA" : "ONAY VERDİNİZ · İŞ BAŞLIYOR";
      if (p !== last) { last = p; setPhase(p); }
      if (RM) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", rs); io?.disconnect(); };
  }, [title]);

  return (
    <div className="tk" ref={boxRef} role="img" aria-label="Animasyon: fiyat teklifi satır satır yazdırılır, net fiyat onayınıza sunulur ve siz onayladıktan sonra iş başlar.">
      <canvas ref={cvRef} />
      <div className="cap"><span>TEKLİF → <b>ONAYINIZ</b> → İŞ</span><span>{phase}</span></div>
    </div>
  );
}
