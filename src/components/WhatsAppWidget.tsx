import { useState, useEffect } from "react";
import { MessageCircle, X, Send, Clock } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { trackEvent } from "@/lib/analytics";

const WA_NUMBER = "905338960503";

const COPY = {
  tr: {
    open: "WhatsApp ile yaz",
    close: "WhatsApp sohbetini kapat",
    active: "Şu an aktif",
    greet: "Merhaba! 👋 Size nasıl yardımcı olabiliriz? Aşağıdan hızlı seçim yapabilir veya kendi mesajınızı yazabilirsiniz.",
    placeholder: "Mesajınızı yazın...",
    send: "Gönder",
    avgReply: "Ortalama yanıt süresi: 2 dk",
    quick: [
      "Su kaçağım var, acil yardım",
      "Tıkanıklık açma fiyatı?",
      "Kombi servisi randevusu",
      "Petek temizleme fiyatı",
    ],
  },
  en: {
    open: "Message us on WhatsApp",
    close: "Close WhatsApp chat",
    active: "Online now",
    greet: "Hi! 👋 How can we help? Pick a quick reply below or send your own message.",
    placeholder: "Type your message...",
    send: "Send",
    avgReply: "Average reply time: 2 min",
    quick: [
      "I have a water leak — urgent help",
      "Drain unclogging price?",
      "Book a boiler service",
      "Radiator cleaning price",
    ],
  },
} as const;

export function WhatsAppWidget() {
  const { lang } = useLang();
  const c = COPY[lang];
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowPulse(true), 4000);
    return () => clearTimeout(t);
  }, []);

  function send(text: string) {
    trackEvent("cta_whatsapp", "widget", { text: text.slice(0, 80) });
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
  }

  return (
    <>
      <div className="fixed bottom-24 right-3 z-40">
        {showPulse && !open && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-emerald-500/50" />
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? c.close : c.open}
          className="relative pulse-ring flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-emerald-500 shadow-2xl transition-transform hover:scale-110 active:scale-95"
        >
          {open ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-7 w-7 text-white" />}
        </button>
      </div>

      {open && (
        <div className="fixed bottom-44 right-3 z-40 w-[300px] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          <div className="flex items-center gap-2 bg-emerald-500 p-3 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-[10px] font-black">GT</div>
            <div className="flex-1 leading-tight">
              <div className="text-[13px] font-extrabold">Gölge Tesisat</div>
              <div className="flex items-center gap-1 text-[10px] opacity-90">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-200" /> {c.active}
              </div>
            </div>
          </div>

          <div className="bg-[#e5ddd5] p-3">
            <div className="rounded-lg rounded-tl-none bg-white p-2.5 text-[12px] text-slate-800 shadow-sm">
              {c.greet}
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.quick.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-emerald-500 bg-white px-2.5 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (msg.trim()) {
                send(msg.trim());
                setMsg("");
                setOpen(false);
              }
            }}
            className="flex items-center gap-2 border-t border-border bg-background p-2"
          >
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value.slice(0, 280))}
              placeholder={c.placeholder}
              className="flex-1 rounded-full border border-border bg-surface px-3 py-2 text-[12px] outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              aria-label={c.send}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="flex items-center justify-center gap-1 bg-background pb-2 text-[9.5px] text-muted-foreground">
            <Clock className="h-2.5 w-2.5" /> {c.avgReply}
          </div>
        </div>
      )}
    </>
  );
}
