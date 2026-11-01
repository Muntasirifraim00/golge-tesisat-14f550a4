# Project Architecture Rules

- Keep the Google Ads planning experience in `src/routes/google-ads.tsx` as a self-contained interactive dashboard; this preserves its private planning context and prevents the public-site layout from constraining campaign data views.- Blog section lists must use `bullets` (plain string array); `list`/`list2`/`paragraphs2` are ignored by the renderer (src/routes/blog.$slug.tsx reads only section.bullets) and silently drop content.
- Keep bespoke technical editorial presentations scoped to their explicitly selected blog slugs; this preserves reference-specific layouts without changing other posts.
- Keep the Taharet Musluğu long-form guide in its dedicated editorial component; this supports its 17-section visual flow without overloading the generic blog renderer.
- Top-traffic blog guides with a dedicated `*Editorial.tsx` component are rendered via early returns in `src/routes/blog.$slug.tsx` and registered in `__root.tsx` hasOwnToggle; this gives high-intent pages a compact visual layout while other posts keep the generic renderer.
- Homepage is rendered entirely by `src/components/home/SpHome.tsx` in the light `.sp` reference theme; its FAQ list feeds the homepage FAQ JSON-LD so visible answers and schema stay identical.
- Keep the sitewide footer's full link directory collapsed by default behind one accessible disclosure; this preserves SEO links while reducing page length.
- Keep every `/hizmet/{slug}` page on the shared service presentation (now the light `.sp` reference theme) in `hizmet.$slug.index.tsx`; this preserves consistent conversion-focused navigation while service data stays centralized.
- Service list-item images (circle-framed cut-outs) are opt-in per slug via `src/data/service-item-images.ts`; slugs without an entry keep the plain check-list panels.
- Do not render promotional popups on individual blog post pages; this keeps reading uninterrupted and removes duplicate calls to action.
- Pages redesigned from the Shadow Plumbing ZIP reference use the scoped `.sp` wrapper and `sp-*` utilities in src/styles.css (Barlow Condensed/Archivo/JetBrains Mono); this keeps the new light/red look from altering un-migrated pages.
