## লক্ষ্য
Gölge Tesisat প্রজেক্টে ব্লগ পোস্ট যোগ করার কাজটা যেন Lovable AI-এর বারবার ক্রেডিট ছাড়া, সরাসরি code editor-এ manual copy-paste করে করা যায়। এর জন্য ২০টি প্রস্তুত `.md` টেমপ্লেট ফাইল তৈরি করে দেওয়া হবে এবং পরবর্তী এডিটিংয়ের স্টেপস বুঝিয়ে দেওয়া হবে।

## বর্তমান সেটআপ
- ব্লগ পোস্ট লোড হয় hybrid mode-এ: `src/data/blog.ts` (TS array) + `src/content/blog/*.md` (Markdown) — দুটোই একসাথে merge হয়ে `BLOG_POSTS` এ যায়।
- যদি একই slug দুই জায়গায় থাকে, Markdown version প্রাধান্য পায়।
- নতুন `.md` ফাইল যোগ করলেই সেটা auto-discover হয়, আলাদা কোনো রাউট বা লোডার বদলানো লাগে না।
- ইমেজ রাখতে হবে `public/blog-images/` ফোল্ডারে, রেফারেন্স `/blog-images/<filename>.jpg`।

## কী করা হবে (আমি করব)
1. `src/content/blog/` ফোল্ডারে ২০টি টেমপ্লেট ফাইল তৈরি:
   - নাম: `blog-post-01.md`, `blog-post-02.md`, ..., `blog-post-20.md`
   - প্রতিটিতে `_example.md` থেকে পূর্ণ frontmatter স্ট্রাকচার থাকবে, কিন্তু placeholder value (যেমন `slug: blog-post-01`, generic title, generic keyword ইত্যাদি)।
   - YAML-এর নিচে (body অংশে) বাংলা/ইংরেজি নোট থাকবে কীভাবে filename এবং slug rename করতে হয়।
2. `public/blog-images/` ফোল্ডারে না থাকলে একটি `README.md` বা `.gitkeep` যোগ করা যেতে পারে (ঐচ্ছিক, শুধু গাইডেন্সের জন্য)।
3. কোনো রাউট বা `src/data/blog.ts` বদলানো হবে না — কারণ hybrid loader already active।

## আপনি কীভাবে নিজে পোস্ট যোগ করবেন (ক্রেডিট ছাড়া)
1. Lovable editor-এ বা GitHub synced repo-তে `src/content/blog/` ফোল্ডার খুলুন।
2. যেকোনো টেমপ্লেট ফাইল (যেমন `blog-post-01.md`) ক্লিক করুন।
3. ফাইলের নাম rename করুন: আপনার পোস্টের slug দিয়ে, যেমন `petek-temizligi-fiyati-2026.md`।
   **গুরুত্বপূর্ণ:** ফাইলনাম আর frontmatter-এর `slug:` ফিল্ড দুটো একই রাখুন।
4. Editor-এ ফাইলের ভিতরের YAML frontmatter ক্লিক করে পুরোটা সিলেক্ট করুন, আপনার গবেষণা করা content দিয়ে replace করুন।
5. যদি featured/inline image থাকে, ছবি `public/blog-images/`-এ রাখুন এবং `src:`-এ `/blog-images/<filename>.jpg` রাখুন।
6. Save করুন। Preview build automatic হবে, আর সাইটে নতুন পোস্ট দেখা যাবে `/blog/<slug>` URL-এ।

## ক্রেডিট/খরচ নোট
- এই প্ল্যান approve করলে এবং আমি টেমপ্লেট ফাইলগুলো তৈরি করলে, সেটা একবারের build-mode কাজ — ছোট পরিবর্তন, তাই ক্রেডিট খরচ খুবই কম।
- টেমপ্লেট তৈরির পর আপনি নিজে ফাইল rename + content paste করলে Lovable AI ক্রেডিট খরচ হবে না।
- শুধু এই plan-mode কথোপকথনের প্রতিটি মেসেজ ১ ক্রেডিট করে খরচ হয় (Lovable-এর নিয়ম), কিন্তু সেটা আমার নিয়ন্ত্রণের বাইরে।

## কী যাচাই করা হবে
- `src/content/blog/`-এ ২০টি `.md` টেমপ্লেট ফাইল আছে কিনা।
- `src/data/blog.ts` এর `BlogPost` type-এর সব required field frontmatter-এ আছে কিনা।
- কোনো file-এর `slug` missing নয় (missing হলে loader skip করে)।
