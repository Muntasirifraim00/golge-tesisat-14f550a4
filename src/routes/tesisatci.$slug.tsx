import { createFileRoute, Outlet } from "@tanstack/react-router";

// Pathless pass-through layout so /tesisatci/$slug (index) and
// /tesisatci/$slug/$service (matrix) can both render full pages without
// wrapping chrome. See tesisatci.$slug.index.tsx and tesisatci.$slug.$service.tsx.
export const Route = createFileRoute("/tesisatci/$slug")({
  component: () => <Outlet />,
});
