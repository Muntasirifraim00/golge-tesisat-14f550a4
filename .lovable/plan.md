## বর্তমান অবস্থা (যাচাই ফলাফল)

আপলোড করা `akilli-wifi-oda-termostati.md` ফাইল **সরাসরি copy-paste করে কাজ করবে না**। কারণ:

1. **ফরম্যাট ভুল:** এই প্রজেক্টের blog system শুধু **YAML frontmatter** বোঝে (যেমন `src/content/blog/_example.md` এ দেখানো) — standard Markdown headings/paragraphs/table render হয় না।
2. **YAML frontmatter নেই:** ফাইলটি H1 (`# Akıllı WiFi...`) দিয়ে শুরু হয়েছে, কিন্তু প্রজেক্টে `---` এর ভেতরে `slug`, `title`, `seoTitle`, `keyword`, `volume`, `kdi`, `category`, `readMin`, `published`, `excerpt`, `metaDescription`, `serviceSlug`, `intro`, `sections`, `faq` লাগবে।
3. **Content structure ম্যাপ করা হয়নি:** Standard Markdown sections, bullets, tables, FAQ-গুলোকে project-এর `sections[]`, `faq[]`, YAML table format এ রূপান্তর করতে হবে।
4. **ServiceSlug missing:** `serviceSlug` ফিল্ড না থাকলে post conversion/linking কাজ করবে না। এই topic-এর জন্য `kombi-tamiri` সবচেয়ে উপযুক্ত।
5. **SEO metadata missing:** `volume`, `kdi`, `metaDescription`, `seoTitle` নেই।

## কী করা হবে (আমি করব)

1. **আপলোড করা ফাইলের content parse করব** — headings, paragraphs, bullet lists, comparison tables, FAQ-গুলো আলাদা করব।
2. **Project-এর `BlogPost` type অনুযায়ী YAML frontmatter তৈরি করব:**
   - `slug: akilli-wifi-oda-termostati`
   - `title`, `seoTitle` (≤44 chars)
   - `keyword`, `volume`, `kdi` (placeholder/estimate দেওয়া হবে, আপনি পরে edit করতে পারবেন)
   - `category: "Kombi & Kalorifer"`
   - `readMin: 12` (content length অনুযায়ী)
   - `published`, `updated`
   - `excerpt`, `metaDescription`
   - `serviceSlug: "kombi-tamiri"`
   - `intro` → ফাইলের introduction paragraph
   - `sections[]` → প্রতিটি H2 section-কে YAML section এ রূপান্তর, যেখানে প্রয়োজনে table/chart/image যোগ করব
   - `faq[]` → শেষের FAQ-গুলোকে `q/a` format এ রূপান্তর
3. **নতুন `.md` ফাইল `src/content/blog/akilli-wifi-oda-termostati.md` হিসেবে সেভ করব।**
4. **Placeholder images থাকলে `public/blog-images/` এর জন্য reference ঠিক করে দেব।** (আপলোডে image নেই, তাই placeholder থাকবে।)
5. **Build check / validation** — যাতে loader file-টা skip না করে।

## আপনার জন্য কী সুবিধা

- এই একটা ফাইল ঠিক করে দিলে আপনি বুঝতে পারবেন **বাকি ১৯টা post কীভাবে লেখতে হবে** বাইরে থেকে, যাতে সরাসরি paste করা যায়।
- আপনি চাইলে future-এ আমাকে না বলে নিজেও এই ফরম্যাটে রূপান্তর করতে পারবেন।
- আমি কেবল এই **একটি ফাইলের রূপান্তর** করব; বাকি ১৯টা আপনি ঐ ফরম্যাট অনুসরণ করে লিখবেন।

## ম্যানুয়াল করতে চাইলে আপনার জন্য নিয়ম

আপনি যদি নিজে বাকি ১৯টা post বাইরে থেকে লেখেন, তাহলে প্রতিটি ফাইলের শুরুতে এই ধরনের YAML frontmatter থাকতে হবে (আমি `akilli-wifi-oda-termostati.md` থেকে উদাহরণ তৈরি করে দেব):

```yaml
---
slug: "your-post-slug"
title: "Your H1 Title"
seoTitle: "Short Title"       # ≤44 chars
keyword: "target keyword"
volume: 500
kdi: 30
category: "Kombi & Kalorifer"
readMin: 10
published: "2026-08-01"
updated: "2026-08-01"
excerpt: "Short summary..."
metaDescription: "Meta description..."
serviceSlug: "kombi-tamiri"
featuredImage:
  src: "/blog-images/your-image.jpg"
  alt: "alt text"
intro: "Introduction paragraph..."
sections:
  - heading: "H2 Heading"
    paragraphs:
      - "Paragraph 1."
      - "Paragraph 2."
    bullets:
      - "Bullet 1"
      - "Bullet 2"
faq:
  - q: "Question?"
    a: "Answer."
---
```

## ক্রেডিট/খরচ নোট

- এই ফাইল রূপান্তর করার কাজ ছোট build-mode পরিবর্তন — আমি করলে কিছু ক্রেডিট খরচ হবে।
- রূপান্তর শেষে আপনি নিজে বাকি ১৯টা ফাইল বাইরে থেকে লিখে copy-paste করলে AI ক্রেডিট খরচ হবে না।
- শুধু এই plan-mode কথোপকথনের মেসেজগুলো ১ ক্রেডিট করে খরচ হয়।

## যাচাই

- `src/content/blog/akilli-wifi-oda-termostati.md` ফাইল সঠিক YAML frontmatter সহ থাকবে।
- `slug` field present থাকবে।
- `blog/` index-এ post-টি দেখা যাবে।
- `/blog/akilli-wifi-oda-termostati` URL-এ post render হবে।
