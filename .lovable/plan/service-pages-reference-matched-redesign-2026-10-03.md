# Service Pages — Reference-Matched Redesign

## Goal
Rebuild every `/hizmet/{slug}` service page around the supplied dark “Our Plumbing Services” reference while preserving each service’s existing Turkish content, SEO metadata, reviews, FAQ, guides, and regional links.

## What will change
- Replace the current compact top area with a deep-black, red-accent service header: brand bar, breadcrumb, service label, large service-specific title, short description, and a real technician/work image.
- Place three prominent service cards directly below the header, using the current service plus two related services; each card will show a relevant image, icon, short benefit, and clear arrow link.
- Add the full-width “Tüm Hizmetleri Gör” action and the three trust signals from the reference: free discovery, approximate response time, and 24/7 emergency support.
- Keep Call and WhatsApp actions fixed and easy to reach on mobile, while using a contained desktop layout with the same visual language.
- Restyle the remaining service-page content into compact dark panels, readable grids, process steps, FAQs, reviews, related guides/services, service areas, and the existing review form without removing information.
- Generate a cohesive set of realistic plumbing-service images where the current project has no suitable matching image; use service-specific visuals rather than repeating one generic image.

## Interaction and accessibility
- Preserve working links to every existing service, district, guide, phone, WhatsApp, pricing guide, and review action.
- Keep visible focus states, readable contrast, semantic headings, descriptive image text, and reduced-motion support.
- Ensure long Turkish titles fit without clipping and the page has no horizontal overflow.

## Technical details
- Implement one reusable service-page presentation so all service slugs receive the design consistently.
- Add semantic service-page color/shadow tokens and scoped animation styles to the global design system.
- Keep the existing route data, structured data, canonical links, and per-service metadata unchanged except for visual image references where appropriate.
- Record the shared service-page design rule in the project architecture notes.

## Verification
- Check representative service types on mobile and desktop, including the longest titles.
- Verify service navigation, Call, WhatsApp, “Tüm Hizmetleri Gör,” pricing, FAQ, and related-content links.
- Confirm no layout overflow, browser errors, missing images, or build errors.
