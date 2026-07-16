import { createFileRoute, Outlet } from "@tanstack/react-router";

// Pathless pass-through layout so /hizmet/$slug (hub) and
// /hizmet/$slug/fiyat (pricing) can both render full pages without
// wrapping chrome. See hizmet.$slug.index.tsx and hizmet.$slug.fiyat.tsx.
export const Route = createFileRoute("/hizmet/$slug")({
  component: () => <Outlet />,
});
