import { useEffect, useState } from "react";
import { List } from "lucide-react";

export type TocItem = { id: string; label: string };

/**
 * Sticky desktop table of contents with scroll-spy. Highlights the section
 * currently in view via an IntersectionObserver. Client-only behaviour; the
 * links degrade to plain in-page anchors without JS.
 */
export function ArticleToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-12% 0px -78% 0px", threshold: 0 },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="İçindekiler" className="text-[12.5px]">
      <p className="mb-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        <List className="h-3.5 w-3.5 text-brand-red" /> İçindekiler
      </p>
      <ul className="space-y-0.5 border-l border-border">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={`-ml-px block border-l-2 py-1.5 pl-3 leading-snug transition-colors ${
                active === it.id
                  ? "border-brand-red font-bold text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
