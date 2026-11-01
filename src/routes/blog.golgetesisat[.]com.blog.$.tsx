import { createFileRoute, redirect } from "@tanstack/react-router";

// External sites linked to /blog/golgetesisat.com/blog/{slug} (doubled domain).
// Permanently forward to the real post, or to the blog index when no slug.
export const Route = createFileRoute("/blog/golgetesisat.com/blog/$")({
  loader: ({ params }) => {
    const slug = (params._splat ?? "").split("/").filter(Boolean)[0];
    if (slug) throw redirect({ to: "/blog/$slug", params: { slug }, statusCode: 301 });
    throw redirect({ to: "/blog", statusCode: 301 });
  },
});
