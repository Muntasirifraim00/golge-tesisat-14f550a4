import { MARKET_CHECKED, tl } from "@/data/market-prices";

// Log-scale range bar (₺300 – ₺200.000) used on the price pages.
const L0 = Math.log(300), L1 = Math.log(200000);
export const px = (v: number) => ((Math.log(v) - L0) / (L1 - L0)) * 100;
export const TICKS = [500, 1000, 5000, 20000, 100000];

export function MarketBar({ min, max, label, delay = 0 }: { min: number; max: number; label?: string; delay?: number }) {
  return (
    <div className="bar" title={label}>
      <div className="ax" />
      <div className="rg" style={{ left: px(min) + "%", width: px(max) - px(min) + "%", transitionDelay: delay + "ms" }} />
      <span className="lb" style={{ left: Math.min(px(min), 62) + "%" }}>{tl(min)} – {tl(max)}</span>
    </div>
  );
}

export function Ticks() {
  return <div className="ticks">{TICKS.map((t) => <span key={t} style={{ left: px(t) + "%" }}>{t >= 1000 ? t / 1000 + "B" : t}</span>)}</div>;
}

export const fmtChecked = () => new Date(MARKET_CHECKED + "T12:00:00").toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
