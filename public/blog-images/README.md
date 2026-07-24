# Blog Images

Put all blog post images in this folder.

## How to reference

In your `.md` frontmatter use absolute paths:

```yaml
featuredImage:
  src: "/blog-images/my-photo.jpg"
  alt: "Descriptive alt text with keyword"
  caption: "Short caption shown below the image"
```

For inline section images:

```yaml
sections:
  - heading: "My Section"
    paragraphs:
      - "Some text."
    image:
      src: "/blog-images/my-diagram.jpg"
      alt: "Descriptive alt text"
      caption: "Caption text"
```

## Notes

- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.
- Use descriptive, keyword-rich `alt` text.
- Keep file names lowercase, no spaces, use hyphens: `petek-temizligi-oncesi-sonrasi.jpg`.
- Optimized/web-ready images are preferred (compress before uploading).
