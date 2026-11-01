import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Gauge,
  Globe2,
  LayoutDashboard,
  Megaphone,
  Menu,
  MoreHorizontal,
  MousePointerClick,
  Search,
  Settings,
  Target,
  TrendingUp,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/google-ads")({
  head: () => ({
    meta: [
      { title: "Google Ads Reklam Merkezi | Gölge Tesisat" },
      { name: "description", content: "Gölge Tesisat Google Ads kampanyaları, anahtar kelimeleri, bütçeleri ve dönüşüm planı için reklam merkezi." },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "Google Ads Reklam Merkezi | Gölge Tesisat" },
      { property: "og:description", content: "Google Ads kampanya performansı ve reklam planını tek ekranda yönetin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: GoogleAdsDashboard,
});

type Campaign = {
  id: number;
  name: string;
  status: "Aktif" | "Taslak";
  budget: number;
  clicks: number;
  impressions: number;
  ctr: number;
  conversions: number;
  cost: number;
  color: string;
};

const CAMPAIGNS: Campaign[] = [
  { id: 1, name: "Acil Tesisatçı / 7-24", status: "Aktif", budget: 350, clicks: 1248, impressions: 18450, ctr: 6.76, conversions: 92, cost: 10440, color: "bg-primary" },
  { id: 2, name: "Su Kaçağı Tespiti / Kırmadan", status: "Aktif", budget: 500, clicks: 1864, impressions: 26380, ctr: 7.07, conversions: 148, cost: 16280, color: "bg-chart-4" },
  { id: 3, name: "Tıkanıklık Açma", status: "Aktif", budget: 400, clicks: 1087, impressions: 15820, ctr: 6.87, conversions: 78, cost: 9680, color: "bg-brand-green" },
  { id: 4, name: "Petek Temizleme", status: "Aktif", budget: 250, clicks: 652, impressions: 12940, ctr: 5.04, conversions: 41, cost: 4830, color: "bg-brand-gold" },
  { id: 5, name: "Boru ve Tesisat Tamiri", status: "Taslak", budget: 300, clicks: 0, impressions: 0, ctr: 0, conversions: 0, cost: 0, color: "bg-muted-foreground" },
  { id: 6, name: "Kamera ile Gider Kontrol", status: "Taslak", budget: 220, clicks: 0, impressions: 0, ctr: 0, conversions: 0, cost: 0, color: "bg-muted-foreground" },
];

const KEYWORDS = [
  { keyword: "su kaçağı tespiti", group: "Su Kaçağı", clicks: 924, impressions: 10980, ctr: 8.42, conversions: 82, cost: 6930 },
  { keyword: "tıkanıklık açma", group: "Tıkanıklık", clicks: 716, impressions: 9280, ctr: 7.72, conversions: 56, cost: 5180 },
  { keyword: "acil tesisatçı", group: "Acil", clicks: 603, impressions: 7640, ctr: 7.89, conversions: 48, cost: 4620 },
  { keyword: "kırmadan su kaçağı", group: "Su Kaçağı", clicks: 547, impressions: 6880, ctr: 7.95, conversions: 44, cost: 4910 },
  { keyword: "mutfak gider açma", group: "Tıkanıklık", clicks: 421, impressions: 6120, ctr: 6.88, conversions: 31, cost: 3650 },
];

const DAYS = [
  { day: "Pzt", value: 62, secondary: 38 },
  { day: "Sal", value: 78, secondary: 46 },
  { day: "Çar", value: 55, secondary: 34 },
  { day: "Per", value: 84, secondary: 53 },
  { day: "Cum", value: 96, secondary: 61 },
  { day: "Cmt", value: 73, secondary: 44 },
  { day: "Paz", value: 88, secondary: 57 },
];

const NAV_ITEMS = [
  { label: "Genel Bakış", icon: LayoutDashboard },
  { label: "Kampanyalar", icon: Megaphone },
  { label: "Reklam Grupları", icon: WalletCards },
  { label: "Anahtar Kelimeler", icon: Search },
  { label: "Hedef Kitleler", icon: Users },
  { label: "Dönüşümler", icon: Target },
];

function GoogleAdsDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Genel Bakış");
  const [activeTab, setActiveTab] = useState("Kampanyalar");
  const [campaignId, setCampaignId] = useState(0);
  const [period, setPeriod] = useState("Son 30 Gün");

  const selected = useMemo(() => CAMPAIGNS.find((campaign) => campaign.id === campaignId), [campaignId]);
  const activeCampaigns = selected ? [selected] : CAMPAIGNS.filter((campaign) => campaign.status === "Aktif");
  const totals = activeCampaigns.reduce(
    (sum, campaign) => ({
      clicks: sum.clicks + campaign.clicks,
      impressions: sum.impressions + campaign.impressions,
      conversions: sum.conversions + campaign.conversions,
      cost: sum.cost + campaign.cost,
    }),
    { clicks: 0, impressions: 0, conversions: 0, cost: 0 },
  );
  const ctr = totals.impressions ? (totals.clicks / totals.impressions) * 100 : 0;
  const cpc = totals.clicks ? totals.cost / totals.clicks : 0;

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      {sidebarOpen && <button aria-label="Menüyü kapat" className="fixed inset-0 z-40 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform lg:static lg:w-64 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-20 items-center justify-between border-b border-sidebar-border px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm"><TrendingUp className="h-5 w-5" /></div>
            <div><p className="font-display text-lg font-extrabold">Reklam Merkezi</p><p className="text-xs text-muted-foreground">Gölge Tesisat</p></div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Menüyü kapat"><X /></Button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-6" aria-label="Ana menü">
          {NAV_ITEMS.map(({ label, icon: Icon }) => (
            <Button key={label} variant="ghost" onClick={() => { setActiveNav(label); setSidebarOpen(false); }} className={`h-11 w-full justify-start rounded-md px-3 ${activeNav === label ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground" : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}>
              <Icon className="h-[18px] w-[18px]" />{label}
            </Button>
          ))}
          <div className="my-4 border-t border-sidebar-border" />
          <Button variant="ghost" className="h-11 w-full justify-start px-3 text-muted-foreground"><Settings />Ayarlar</Button>
          <Button variant="ghost" className="h-11 w-full justify-start px-3 text-muted-foreground"><CircleHelp />Yardım</Button>
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-md bg-sidebar-accent p-3 text-sidebar-accent-foreground">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">MK</div>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">Mehmet Kaya</p><p className="truncate text-xs text-muted-foreground">Yönetici</p></div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Menüyü aç"><Menu /></Button>
            <div><h1 className="font-display text-xl font-extrabold sm:text-2xl">{activeNav}</h1><p className="hidden text-sm text-muted-foreground sm:block">Kampanyalarınızın performansını takip edin ve yönetin.</p></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select value={period} onChange={(event) => setPeriod(event.target.value)} className="h-10 appearance-none rounded-md border border-input bg-card pl-10 pr-9 text-sm font-medium outline-none focus:ring-2 focus:ring-ring">
                <option>Son 7 Gün</option><option>Son 30 Gün</option><option>Son 90 Gün</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <Button variant="outline" size="icon" className="relative" aria-label="Bildirimler"><Bell /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" /></Button>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-8 sm:py-8">
          <section className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="mb-1 text-sm font-medium text-primary">{period}</p><h2 className="font-display text-2xl font-extrabold sm:text-3xl">Performans Özeti</h2><p className="mt-1 text-sm text-muted-foreground">Planlanan kampanyaların birleşik görünümü</p></div>
            <label className="relative w-full sm:w-72">
              <span className="sr-only">Kampanya seç</span>
              <select value={campaignId} onChange={(event) => setCampaignId(Number(event.target.value))} className="h-11 w-full appearance-none rounded-md border border-input bg-card px-4 pr-10 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring">
                <option value={0}>Tüm kampanyalar</option>{CAMPAIGNS.map((campaign) => <option key={campaign.id} value={campaign.id}>{campaign.name}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </label>
          </section>

          <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Temel performans göstergeleri">
            <MetricCard icon={MousePointerClick} label="Toplam Tıklama" value={formatNumber(totals.clicks)} change="%12,5" tone="primary" />
            <MetricCard icon={Globe2} label="Gösterim" value={formatNumber(totals.impressions)} change="%8,3" tone="blue" />
            <MetricCard icon={Gauge} label="Ortalama Tıklama Oranı" value={`%${ctr.toFixed(2)}`} change="%0,6" tone="green" />
            <MetricCard icon={Target} label="Dönüşüm" value={formatNumber(totals.conversions)} change="%15,2" tone="gold" />
          </section>

          <section className="mb-6 grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,.8fr)]">
            <div className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-display text-lg font-bold">Tıklama ve Dönüşümler</h3><p className="text-sm text-muted-foreground">Haftalık performans dağılımı</p></div><div className="flex items-center gap-4 text-xs text-muted-foreground"><LegendDot className="bg-primary" label="Tıklama" /><LegendDot className="bg-brand-green" label="Dönüşüm" /></div></div>
              <div className="mt-8 flex h-56 items-end justify-between gap-3 border-b border-border px-1 sm:h-64 sm:gap-5">
                {DAYS.map((item) => <div key={item.day} className="flex h-full flex-1 flex-col justify-end"><div className="flex h-full items-end justify-center gap-1"><div className="w-2/5 rounded-t-sm bg-primary transition-all hover:opacity-80" style={{ height: `${item.value}%` }} /><div className="w-2/5 rounded-t-sm bg-brand-green transition-all hover:opacity-80" style={{ height: `${item.secondary}%` }} /></div><span className="py-3 text-center text-xs text-muted-foreground">{item.day}</span></div>)}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="flex items-start justify-between"><div><h3 className="font-display text-lg font-bold">Bütçe Kullanımı</h3><p className="text-sm text-muted-foreground">Aktif kampanyalar</p></div><Button variant="ghost" size="icon" aria-label="Bütçe seçenekleri"><MoreHorizontal /></Button></div>
              <div className="mt-7 flex items-center gap-6">
                <div className="grid h-32 w-32 shrink-0 place-items-center rounded-full p-3" style={{ background: "conic-gradient(var(--primary) 0 72%, var(--muted) 72% 100%)" }}><div className="grid h-full w-full place-items-center rounded-full bg-card text-center"><div><div className="text-2xl font-extrabold">%72</div><div className="text-xs text-muted-foreground">kullanıldı</div></div></div></div>
                <div className="space-y-3 text-sm"><BudgetRow label="Harcanan" value={`₺${formatNumber(totals.cost)}`} dot="bg-primary" /><BudgetRow label="Kalan" value={`₺${formatNumber(Math.max(0, 57200 - totals.cost))}`} dot="bg-muted-foreground" /><BudgetRow label="Ort. TBM" value={`₺${cpc.toFixed(2)}`} dot="bg-brand-green" /></div>
              </div>
              <div className="mt-7 rounded-md bg-accent p-3 text-xs leading-5 text-muted-foreground"><span className="font-semibold text-foreground">Plan notu:</span> Bu ekran kampanya yapısını ve hedef değerleri gösterir; canlı Ads hesabı verisi değildir.</div>
            </div>
          </section>

          <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="flex flex-col gap-3 border-b border-border px-5 pt-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
              <div className="flex gap-6 overflow-x-auto">
                {["Kampanyalar", "Anahtar Kelimeler", "Dönüşümler"].map((tab) => <Button key={tab} variant="ghost" onClick={() => setActiveTab(tab)} className={`h-11 shrink-0 rounded-none border-b-2 px-0 ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>{tab}</Button>)}
              </div>
              <div className="pb-4 sm:pb-3"><Button variant="outline" size="sm"><Clock3 />Son güncelleme: bugün</Button></div>
            </div>
            {activeTab === "Kampanyalar" && <CampaignTable onSelect={(id) => setCampaignId(id)} />}
            {activeTab === "Anahtar Kelimeler" && <KeywordTable />}
            {activeTab === "Dönüşümler" && <ConversionPanel />}
          </section>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, change, tone }: { icon: typeof Target; label: string; value: string; change: string; tone: "primary" | "blue" | "green" | "gold" }) {
  const toneClass = { primary: "bg-primary/10 text-primary", blue: "bg-chart-4/15 text-chart-4", green: "bg-brand-green/10 text-brand-green", gold: "bg-brand-gold/15 text-brand-gold" }[tone];
  return <div className="rounded-lg border border-border bg-card p-5 shadow-sm"><div className="flex items-center justify-between"><div className={`grid h-10 w-10 place-items-center rounded-md ${toneClass}`}><Icon className="h-5 w-5" /></div><span className="inline-flex items-center gap-1 rounded-full bg-brand-green/10 px-2 py-1 text-xs font-semibold text-brand-green"><TrendingUp className="h-3 w-3" />{change}</span></div><p className="mt-4 text-sm text-muted-foreground">{label}</p><p className="mt-1 font-display text-3xl font-extrabold">{value}</p><p className="mt-1 text-xs text-muted-foreground">önceki döneme göre</p></div>;
}

function CampaignTable({ onSelect }: { onSelect: (id: number) => void }) {
  return <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-sm"><thead className="bg-muted/45 text-left text-xs font-semibold uppercase text-muted-foreground"><tr><th className="px-6 py-3">Kampanya</th><th className="px-4 py-3">Durum</th><th className="px-4 py-3 text-right">Günlük Bütçe</th><th className="px-4 py-3 text-right">Tıklama</th><th className="px-4 py-3 text-right">Gösterim</th><th className="px-4 py-3 text-right">TO</th><th className="px-4 py-3 text-right">Dönüşüm</th><th className="px-4 py-3 text-right">Maliyet</th><th className="w-12" /></tr></thead><tbody className="divide-y divide-border">{CAMPAIGNS.map((campaign) => <tr key={campaign.id} className="transition-colors hover:bg-accent/60"><td className="px-6 py-4"><button onClick={() => onSelect(campaign.id)} className="flex items-center gap-3 text-left font-semibold hover:text-primary"><span className={`h-2.5 w-2.5 rounded-full ${campaign.color}`} />{campaign.name}</button></td><td className="px-4 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${campaign.status === "Aktif" ? "bg-brand-green/10 text-brand-green" : "bg-muted text-muted-foreground"}`}><span className={`h-1.5 w-1.5 rounded-full ${campaign.status === "Aktif" ? "bg-brand-green" : "bg-muted-foreground"}`} />{campaign.status}</span></td><td className="px-4 py-4 text-right font-medium">₺{campaign.budget}</td><td className="px-4 py-4 text-right tabular-nums">{formatNumber(campaign.clicks)}</td><td className="px-4 py-4 text-right tabular-nums">{formatNumber(campaign.impressions)}</td><td className="px-4 py-4 text-right tabular-nums">%{campaign.ctr.toFixed(2)}</td><td className="px-4 py-4 text-right tabular-nums">{campaign.conversions}</td><td className="px-4 py-4 text-right font-semibold tabular-nums">₺{formatNumber(campaign.cost)}</td><td className="px-3 py-4"><Button variant="ghost" size="icon" aria-label={`${campaign.name} seçenekleri`}><MoreHorizontal /></Button></td></tr>)}</tbody></table></div>;
}

function KeywordTable() {
  return <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-sm"><thead className="bg-muted/45 text-left text-xs font-semibold uppercase text-muted-foreground"><tr><th className="px-6 py-3">Anahtar Kelime</th><th className="px-4 py-3">Reklam Grubu</th><th className="px-4 py-3 text-right">Tıklama</th><th className="px-4 py-3 text-right">Gösterim</th><th className="px-4 py-3 text-right">TO</th><th className="px-4 py-3 text-right">Dönüşüm</th><th className="px-6 py-3 text-right">Maliyet</th></tr></thead><tbody className="divide-y divide-border">{KEYWORDS.map((item) => <tr key={item.keyword} className="hover:bg-accent/60"><td className="px-6 py-4 font-semibold">{item.keyword}</td><td className="px-4 py-4 text-muted-foreground">{item.group}</td><td className="px-4 py-4 text-right">{formatNumber(item.clicks)}</td><td className="px-4 py-4 text-right">{formatNumber(item.impressions)}</td><td className="px-4 py-4 text-right">%{item.ctr.toFixed(2)}</td><td className="px-4 py-4 text-right">{item.conversions}</td><td className="px-6 py-4 text-right font-semibold">₺{formatNumber(item.cost)}</td></tr>)}</tbody></table></div>;
}

function ConversionPanel() {
  const rows = [{ name: "Telefon araması", value: 186 }, { name: "WhatsApp tıklaması", value: 104 }, { name: "Randevu formu", value: 41 }, { name: "Geri arama talebi", value: 28 }];
  return <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">{rows.map((row) => <div key={row.name} className="rounded-md border border-border bg-background p-4"><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">{row.name}</span><span className="grid h-7 w-7 place-items-center rounded-full bg-brand-green/10 text-brand-green"><Check className="h-4 w-4" /></span></div><p className="mt-4 text-2xl font-extrabold">{row.value}</p><p className="mt-1 text-xs text-muted-foreground">planlanan birincil sinyal</p></div>)}</div>;
}

function LegendDot({ className, label }: { className: string; label: string }) { return <span className="inline-flex items-center gap-1.5"><span className={`h-2 w-2 rounded-full ${className}`} />{label}</span>; }
function BudgetRow({ label, value, dot }: { label: string; value: string; dot: string }) { return <div className="flex items-center justify-between gap-6"><span className="flex items-center gap-2 text-muted-foreground"><span className={`h-2 w-2 rounded-full ${dot}`} />{label}</span><strong>{value}</strong></div>; }
function formatNumber(value: number) { return new Intl.NumberFormat("tr-TR").format(value); }