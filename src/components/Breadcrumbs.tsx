import { Link } from "@tanstack/react-router";

/**
 * Reusable breadcrumb trail for internal linking + crawl hierarchy.
 *
 * Each crumb is a real <Link> (type-safe TanStack navigation) except the last,
 * which is the current page. Pass `jsonLd` to emit a matching BreadcrumbList
 * for rich results — most routes already emit their own in head(), so this is
 * opt-in to avoid duplicate schema.
 */
export type Crumb = {
  label: string;
  /** Absolute route path, e.g. "/hizmetler". Omit for the current page. */
  to?: string;
  /** Params for dynamic routes, e.g. { slug }. */
  params?: Record<string, string>;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="px-4 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1">
              {c.to && !isLast ? (
                <Link
                  to={c.to}
                  params={c.params as never}
                  className="hover:text-foreground"
                >
                  {c.label}
                </Link>
              ) : (
                <span className={isLast ? "font-semibold text-foreground" : undefined}>
                  {c.label}
                </span>
              )}
              {!isLast && <span aria-hidden>›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
