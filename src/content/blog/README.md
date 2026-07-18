# Markdown Blog Posts (Hybrid Mode)

পুরনো ১২০টি পোস্ট `src/data/blog.ts`-এ TS array হিসেবে আছে। নতুন পোস্টগুলো এখানে `.md` ফাইল হিসেবে যোগ করুন।

## নিয়ম

1. ফাইলের নাম হবে `<slug>.md` (URL-safe, lowercase, hyphen-separated). এই slug-ই `/blog/<slug>` URL হবে।
2. পুরো পোস্ট YAML **frontmatter**-এ থাকে (--- এর ভেতরে). Frontmatter-এর বাইরের markdown body optional (author notes হিসেবে ব্যবহার করা যায়, render হবে না)।
3. Image ফাইল রাখুন `public/blog-images/` ফোল্ডারে, reference করুন `/blog-images/<file>.jpg` হিসেবে।
4. একই slug যদি TS array এবং MD দুজায়গায় থাকে, **MD version wins** (override হয়)।
5. Underscore-prefixed ফাইল (যেমন `_example.md`) skip হয়... আসলে না — কোনো ফাইলে `slug:` না থাকলে skip হয়। তাই template ফাইলে `slug` field রাখবেন না।

## Field Reference

`BlogPost` type (`src/data/blog.ts` line ~212) এ সব field দেখুন। Required fields:

- `slug`, `title`, `seoTitle` (≤44 chars), `keyword`, `volume`, `kdi`, `category`
- `readMin`, `published` (ISO date), `excerpt`, `metaDescription`, `serviceSlug`
- `intro`, `sections` (array), `faq` (array)

Optional: `updated`, `featuredImage`, `manualRelated`, `inlineLinks`, `linkAliases`.

`sections[]` এর প্রতিটা entry-তে থাকে: `heading` (H2), `paragraphs` (array), optional `bullets`, `image`, `table`, `chart`.

সবচেয়ে ভালো উদাহরণের জন্য `_example.md` দেখুন।
