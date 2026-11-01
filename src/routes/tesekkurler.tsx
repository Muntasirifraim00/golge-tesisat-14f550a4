import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { GtChrome } from "@/components/gt/GtShell";
import { SiteFooter } from "@/components/SiteFooter";
import { TY_MAIN, TY_SPRITE } from "@/components/pages/ty-html";
import { FEATURED_POSTS } from "@/data/featured-posts";

// Thank-you page after the booking popup (design: booking-confirmed). Reads the request the popup left in
// sessionStorage ("gt-last-request"); without one it shows a clearly marked example. Not indexed.
export const Route = createFileRoute("/tesekkurler")({
  head: () => ({
    meta: [
      { title: "Talebiniz alındı — Teşekkürler | Gölge Tesisat" },
      { name: "description", content: "Randevu talebiniz alındı. Gölge Tesisat ekibi kısa süre içinde sizinle iletişime geçecek." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ThankYou,
});

type Req = { wo?: string; svc?: string; when?: string; urgent?: boolean; start?: string | null; dist?: string; addr?: string; name?: string; phone?: string; by?: string; note?: string; msg?: string };

const esc = (s: unknown) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

function ThankYou() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const $ = <T extends HTMLElement = HTMLElement>(s: string) => root.querySelector(s) as T;
    const $$ = (s: string) => [...root.querySelectorAll<HTMLElement>(s)];
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const buzz = () => { try { navigator.vibrate?.(8); } catch { /* ignore */ } };
    const toast = (t: string) => { const e = $("#toast") as HTMLElement & { _t?: number }; e.textContent = t; e.classList.add("on"); clearTimeout(e._t); e._t = window.setTimeout(() => e.classList.remove("on"), 1800); };
    let R: Req | null = null;
    try { R = JSON.parse(sessionStorage.getItem("gt-last-request") || "null"); } catch { /* ignore */ }
    const sample = !R;
    if (!R) {
      const d = new Date(); d.setDate(d.getDate() + 1); d.setHours(10, 0, 0, 0);
      R = { wo: "GT-ÖRNEK", svc: "Su Kaçağı Tespiti", when: "Yarın · 10:00–12:00", urgent: false, start: d.toISOString(), dist: "Kadıköy", addr: "Örnek Cad. No 1", name: "Örnek Müşteri", phone: "05xx xxx xx xx", by: "WhatsApp", note: "", msg: "Merhaba Gölge Tesisat, randevu almak istiyorum." };
    }
    const first = (R.name || "").trim().split(/\s+/)[0];
    if (first && !sample) $("#hName").textContent = ", " + first;
    const wa = "https://wa.me/905338960503?text=" + encodeURIComponent(R.msg || "Merhaba Gölge Tesisat");
    ($("#waAgain") as HTMLAnchorElement).href = wa;
    ($("#notYet") as HTMLAnchorElement).href = wa;
    if (R.urgent) {
      $("#emg").hidden = false;
      $("#s3h").textContent = "Acil ekip yolda";
      $("#s3p").textContent = "Teyit ettiğimiz anda en yakın ekip adresinize çıkar. Gece ya da gündüz, ortalama müdahale yaklaşık 30 dakikadır.";
    } else if (R.when) {
      $("#s3h").textContent = "Usta belirlediğiniz saat aralığında gelir";
      $("#s3p").innerHTML = "Varış aralığınız: <b>" + esc(R.when) + "</b>. Usta yola çıktığında size haber veririz.";
      $("#t3").textContent = R.when.toLocaleUpperCase("tr");
    }
    if (R.by === "Phone call") $("#lead").innerHTML = "Talebiniz kaydedildi ve <b>WhatsApp</b>’ta açıldı. <b>Gönder</b>’e bastığınızda teyit için <b>sizi ararız</b> — genellikle dakikalar içinde.";
    const rows: [string, string | undefined][] = [["HİZMET", R.svc], ["VARIŞ", R.urgent ? "Acil · teyitten sonra ekip çıkar" : R.when], ["İLÇE", R.dist], ["ADRES", R.addr], ["AD SOYAD", R.name], ["TELEFON", R.phone], ["İLETİŞİM", R.by === "Phone call" ? "Telefon" : R.by]];
    if (R.note) rows.push(["NOT", R.note]);
    $("#ticket").innerHTML = '<span class="seal">' + (sample ? "ÖRNEK" : "HAZIR") + '</span><div class="t-h"><b>İş emri</b><small class="num">' + esc(R.wo) + "</small></div>" + rows.map(([k, v]) => '<div class="tr"><span>' + k + "</span><b>" + esc(v || "—") + "</b></div>").join("");
    if (sample) { $("#woSub").innerHTML = '<span class="sample">ÖRNEK · gerçek talebinizi görmek için bu sayfayı randevu formundan açın</span>'; $("#kickT").textContent = "Randevu onayı · önizleme"; }
    const ib = $("#ics") as HTMLAnchorElement;
    if (R.start && !R.urgent) {
      const s = new Date(R.start), e = new Date(s.getTime() + 2 * 3600e3);
      const f = (x: Date) => x.getFullYear() + String(x.getMonth() + 1).padStart(2, "0") + String(x.getDate()).padStart(2, "0") + "T" + String(x.getHours()).padStart(2, "0") + String(x.getMinutes()).padStart(2, "0") + "00";
      const c = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Golge Tesisat//Randevu//TR", "BEGIN:VEVENT", "UID:" + R.wo + "@golgetesisat", "DTSTAMP:" + f(new Date()), "DTSTART:" + f(s), "DTEND:" + f(e), "SUMMARY:Gölge Tesisat · " + (R.svc || "Tesisat"), "LOCATION:" + ((R.addr || "") + ", " + (R.dist || "") + ", İstanbul").replace(/,/g, "\\,"), "DESCRIPTION:İş emri " + R.wo + " · varış aralığı. Telefon 0533 896 05 03", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
      try { ib.href = URL.createObjectURL(new Blob([c], { type: "text/calendar" })); } catch { ib.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(c); }
    } else ib.hidden = true;
    const onPrint = () => window.print();
    $("#prt").addEventListener("click", onPrint);
    let stage = 1, sentAt = 0, lateT = 0;
    const paint = () => {
      $$(".st").forEach((s) => { const i = +(s.dataset.s || 0); s.classList.toggle("done", i < stage); s.classList.toggle("now", i === stage); });
      const cur = $('.st[data-s="' + stage + '"]'); if (cur) $("#tf").style.height = cur.offsetTop + 20 + "px";
    };
    const sent = () => {
      stage = 2; sentAt = Date.now(); $("#ask").hidden = true; const t = $("#t1"); t.hidden = false;
      t.textContent = "✓ Gönderildi " + new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
      paint(); buzz(); toast("Harika — yanıtımız birazdan gelir"); clearInterval(lateT);
      lateT = window.setInterval(() => { const m = Math.floor((Date.now() - sentAt) / 60000), s = Math.floor((Date.now() - sentAt) / 1000) % 60; $("#t2").textContent = "BEKLENİYOR " + m + ":" + String(s).padStart(2, "0") + " · ~2 DK YANIT"; if (Date.now() - sentAt > 10 * 60000) $("#late").classList.add("on"); }, 1000);
    };
    $("#yes").addEventListener("click", sent);
    paint(); addEventListener("resize", paint);
    const C = [["Yolu açın", "Çalışılacak alanı, dolabı veya şaftı erişilebilir yapın."], ["Ana vanayı bulun", "Genellikle su sayacının yanındadır — suyu kesmemiz gerekirse işe yarar."], ["Değerli eşyaları kaldırın", "Elektronikleri, halıları ve kırılabilir eşyaları alandan uzaklaştırın."], ["Evcil hayvanlar başka odada", "Onların ve ekibimizin güvenliği için."], ["Giriş ve park bilgisi", "Bina kodu, kat, aracın duracağı yer — WhatsApp’tan iletin."], ["Sorunun fotoğrafı", "WhatsApp’tan kısa bir fotoğraf veya video doğru parçaları getirmemize yardım eder."]];
    $("#chk").innerHTML = C.map((c, i) => '<button type="button" class="ci" aria-pressed="false" data-i="' + i + '"><span class="bx"><svg><use href="#i-ck"/></svg></span><span><b>' + c[0] + "</b><span>" + c[1] + "</span></span></button>").join("");
    const cc = () => { const n = $$('.ci[aria-pressed="true"]').length; $("#cm").style.width = (n / C.length) * 100 + "%"; $("#cp").textContent = n + " / " + C.length; if (n === C.length) toast("Ziyarete hazırsınız ✓"); };
    $$(".ci").forEach((b) => b.addEventListener("click", () => { b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true"); buzz(); cc(); }));
    $("#tyReads").innerHTML = FEATURED_POSTS.slice(0, 3).map((p) => '<a href="/blog/' + p.slug + '"><small>' + esc(p.category.toLocaleUpperCase("tr")) + " · " + p.readMin + " DK</small><b>" + esc(p.title) + "</b><em>Oku →</em></a>").join("");
    const bt = window.setTimeout(() => $("#badge").classList.add("go"), RM ? 0 : 150);
    if (!RM) $("#drops").innerHTML = [...Array(30)].map(() => '<i style="left:' + (Math.random() * 100).toFixed(1) + "%;animation-delay:" + (1.6 + Math.random() * 1.2).toFixed(2) + "s;background:" + (Math.random() < 0.6 ? "#D50A0A" : "#2BD46E") + '"></i>').join("");
    return () => { clearInterval(lateT); clearTimeout(bt); removeEventListener("resize", paint); };
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <GtChrome />
      <div className="gt-ty" lang="tr" ref={ref}>
        <div dangerouslySetInnerHTML={{ __html: TY_SPRITE }} />
        <div dangerouslySetInnerHTML={{ __html: TY_MAIN }} />
        <div className="toast" id="toast" role="status" />
      </div>
      <SiteFooter />
    </div>
  );
}
