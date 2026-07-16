import { createFileRoute, Outlet, useRouter, useLocation, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Workflow,
  PhoneCall,
  MousePointerClick,
  LogOut,
  MessageCircle,
  Menu,
  X,
  Activity,
  Search,
  Star,
  Target,
  Database,
  PenLine,
  
  ChevronRight,
  ChevronsLeft,
  Command,
  Sun,
  Moon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { AdminNotificationBell } from "@/components/admin/AdminNotificationBell";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Gölge Tesisat" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

type GateState = "checking" | "login" | "ok" | "unauthorized";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact: boolean;
  hint: string;
};

const NAV_GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: "General",
    items: [
      { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true, hint: "Overview" },
    ],
  },
  {
    label: "Operations",
    items: [
      { to: "/admin/pipeline", label: "Workflow", icon: Workflow, exact: false, hint: "Lead pipeline" },
      { to: "/admin/bookings", label: "Requests", icon: Calendar, exact: false, hint: "Service requests" },
      { to: "/admin/callbacks", label: "Callback", icon: PhoneCall, exact: false, hint: "Call me back" },
      { to: "/admin/contact-clicks", label: "Call & WhatsApp", icon: MessageCircle, exact: false, hint: "Arama & WhatsApp tıklamaları" },
      { to: "/admin/events", label: "Events", icon: MousePointerClick, exact: false, hint: "Clickstream" },
    ],
  },
  {
    label: "Marketing",
    items: [
      { to: "/admin/search-console", label: "Search", icon: Search, exact: false, hint: "Google ranking" },
      { to: "/admin/keywords", label: "Keywords", icon: Target, exact: false, hint: "Ranking progress" },
      { to: "/admin/seo-data", label: "SEO Data", icon: Database, exact: false, hint: "Research log" },
      { to: "/admin/seo-writer", label: "AI Writer", icon: PenLine, exact: false, hint: "Blog yazarı" },
      { to: "/admin/reviews", label: "Reviews", icon: Star, exact: false, hint: "Moderation" },
    ],
  },
];

const ALL_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);

/**
 * Resolve the single active nav item for a pathname using longest-prefix
 * matching. Shared by the header and the sidebar so highlighting is always
 * consistent and exactly one item is active at a time.
 */
function matchNavItem(pathname: string): NavItem {
  const match = [...ALL_ITEMS]
    .sort((a, b) => b.to.length - a.to.length)
    .find((it) => (it.exact ? pathname === it.to : pathname.startsWith(it.to)));
  return match ?? ALL_ITEMS[0];
}



function AdminLayout() {
  const location = useLocation();
  const router = useRouter();
  const isLogin = location.pathname === "/admin/login";
  const [state, setState] = useState<GateState>("checking");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [peeking, setPeeking] = useState(false);
  const peekedRef = useRef(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // restore saved admin theme
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("admin-theme") : null;
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  function toggleTheme() {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") window.localStorage.setItem("admin-theme", next);
      return next;
    });
  }

  // close mobile drawer when route changes
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // One-time "peek" hint: slide the menu in then back so the admin notices it
  useEffect(() => {
    if (state === "ok" && !peekedRef.current) {
      peekedRef.current = true;
      setPeeking(true);
      const t = setTimeout(() => setPeeking(false), 1900);
      return () => clearTimeout(t);
    }
  }, [state]);

  useEffect(() => {
    let mounted = true;

    async function check() {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;
      if (!session) {
        if (!mounted) return;
        setState("login");
        if (!isLogin) router.navigate({ to: "/admin/login" });
        return;
      }
      setEmail(session.user.email ?? null);
      const { data: roleRows } = await supabase
        .from("app_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!mounted) return;
      if (roleRows) {
        setState("ok");
        if (isLogin) router.navigate({ to: "/admin" });
      } else {
        setState("unauthorized");
      }
    }

    void check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      void check();
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [isLogin, router]);

  const current = useMemo(() => matchNavItem(location.pathname), [location.pathname]);

  if (isLogin) {
    return (
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    );
  }

  if (state === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="h-2 w-2 animate-pulse rounded-full bg-brand-red" />
          <span className="font-mono text-xs uppercase tracking-[0.3em]">Authenticating</span>
        </div>
      </div>
    );
  }

  if (state === "unauthorized") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background p-6 text-center">
        <h1 className="text-xl font-bold">Not authorized</h1>
        <p className="text-sm text-muted-foreground">Your account is not an admin.</p>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.navigate({ to: "/admin/login" });
          }}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Sign out
        </button>
      </div>
    );
  }

  if (state !== "ok") return null;

  return (
    <div
      className={cn(
        "relative min-h-screen bg-background text-foreground lg:flex",
        theme === "light" && "theme-light",
      )}
    >
      <Toaster position="top-right" richColors closeButton />

      {/* ambient backdrop */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[420px] w-[420px] rounded-full bg-brand-red/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-brand-green/8 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(var(--color-foreground)_1px,transparent_1px),linear-gradient(90deg,var(--color-foreground)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      {/* ===== Desktop sidebar ===== */}
      <DesktopSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} email={email} />

      {/* ===== Mobile drawer ===== */}
      {drawerOpen && (
        <>
          <button
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-[82vw] max-w-[300px] flex-col border-r border-border bg-sidebar shadow-2xl lg:hidden">
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
              <Brandmark />
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <SidebarNav collapsed={false} />
            </div>
            <ProfileCard collapsed={false} email={email} />
          </aside>
        </>
      )}

      {/* ===== One-time peek hint (slides in then back) ===== */}
      {peeking && !drawerOpen && (
        <aside
          aria-hidden
          className="animate-drawer-peek pointer-events-none fixed inset-y-0 left-0 z-50 flex w-[82vw] max-w-[300px] flex-col border-r border-border bg-sidebar shadow-2xl lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
            <Brandmark />
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4">
            <SidebarNav collapsed={false} />
          </div>
          <ProfileCard collapsed={false} email={email} />
        </aside>
      )}

      {/* ===== Content column ===== */}
      <div className="relative z-10 flex min-h-screen min-w-0 flex-1 flex-col">
        {/* Top header bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/70 px-4 backdrop-blur-xl sm:px-6">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="menu-glow relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-brand-red-foreground lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumb + title */}
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-red/12 text-brand-red ring-1 ring-inset ring-brand-red/20">
              <current.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 leading-tight">
              <div className="hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/70 sm:flex">
                <span>Admin</span>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className="text-brand-red/80">{current.hint}</span>
              </div>
              <h1 className="truncate text-base font-bold tracking-tight">{current.label}</h1>
            </div>
          </div>

          {/* Command bar (visual ⌘K) */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="group ml-6 hidden h-9 max-w-[260px] flex-1 items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3 text-left text-xs text-muted-foreground transition hover:border-brand-red/40 hover:bg-card/70 xl:flex"
          >
            <Search className="h-3.5 w-3.5 shrink-0" />
            <span className="flex-1 truncate">Search panels, leads, settings…</span>
            <kbd className="flex items-center gap-0.5 rounded border border-border/70 bg-background/60 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
              <Command className="h-2.5 w-2.5" /> K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-green" />
              </span>
              Online
            </span>
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              title={theme === "dark" ? "Light theme" : "Dark theme"}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-card/50 text-muted-foreground transition hover:border-brand-red/40 hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <AdminNotificationBell />

            <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-red/70 text-sm font-bold text-brand-red-foreground ring-2 ring-brand-red/20 ring-offset-2 ring-offset-background sm:flex">
              {(email ?? "A").charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Mobile horizontal tab strip */}
        <nav className="scrollbar-none flex gap-2 overflow-x-auto border-b border-border/60 bg-background/60 px-4 py-2.5 backdrop-blur lg:hidden">
          {ALL_ITEMS.map((it) => {
            const active = it.to === current.to;
            return (
              <Link
                key={it.to}
                to={it.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-300",
                  active
                    ? "border-brand-red/50 bg-brand-red/12 text-brand-red"
                    : "border-border/60 bg-card/50 text-muted-foreground",
                )}
              >
                <it.icon className="h-3.5 w-3.5" />
                {it.label}
              </Link>
            );
          })}
        </nav>

        {/* Main */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      {/* spacer so bottom content isn't hidden behind any mobile elements */}
      <div className="h-4 lg:hidden" aria-hidden />
    </div>
  );
}

function Brandmark({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <Link to="/admin" className="flex items-center gap-2.5">
      <div className="relative shrink-0">
        <div className="absolute inset-0 rounded-xl bg-brand-red blur-md opacity-50" />
        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red to-brand-red/70 text-brand-red-foreground shadow-lg shadow-brand-red/30">
          <Activity className="h-4 w-4" />
        </div>
      </div>
      {!collapsed && (
        <div className="flex flex-col leading-none">
          <span className="text-sm font-extrabold tracking-tight">Gölge Admin</span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            v1 · live
          </span>
        </div>
      )}
    </Link>
  );
}

function DesktopSidebar({
  collapsed,
  onToggle,
  email,
}: {
  collapsed: boolean;
  onToggle: () => void;
  email: string | null;
}) {
  return (
    <aside
      className={cn(
        "sticky top-0 z-30 hidden h-screen shrink-0 flex-col border-r border-border/60 bg-sidebar/70 backdrop-blur-xl transition-[width] duration-300 lg:flex",
        collapsed ? "w-[76px]" : "w-[264px]",
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-border/60",
          collapsed ? "justify-center px-2" : "justify-between px-5",
        )}
      >
        <Brandmark collapsed={collapsed} />
        {!collapsed && (
          <button
            onClick={onToggle}
            aria-label="Collapse sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:border-brand-red/40 hover:text-foreground"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={onToggle}
          aria-label="Expand sidebar"
          className="mx-auto mt-3 flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:border-brand-red/40 hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-none">
        <SidebarNav collapsed={collapsed} />
      </div>

      <ProfileCard collapsed={collapsed} email={email} />
    </aside>
  );
}

function SidebarNav({ collapsed }: { collapsed: boolean }) {
  const location = useLocation();
  const activeTo = matchNavItem(location.pathname).to;

  return (
    <nav className="flex flex-col gap-6">
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          {!collapsed ? (
            <div className="mb-1.5 flex items-center gap-2 px-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60">
                {group.label}
              </span>
              <span className="h-px flex-1 bg-border/50" />
            </div>
          ) : (
            <div className="mx-auto mb-1 h-px w-6 bg-border/50" />
          )}
          {group.items.map((it) => {
            const active = it.to === activeTo;
            return (
              <Link
                key={it.to}
                to={it.to}
                title={collapsed ? it.label : undefined}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-300",
                  collapsed && "justify-center px-0",
                  active
                    ? "bg-gradient-to-r from-brand-red/15 to-transparent text-foreground"
                    : "text-muted-foreground hover:bg-accent/40 hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-brand-red transition-all duration-300",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background/40 transition-all duration-300",
                    active
                      ? "border-brand-red/50 bg-brand-red/15 text-brand-red shadow-[0_0_14px_-2px_var(--brand-red)]"
                      : "border-border/60 group-hover:border-brand-red/40",
                  )}
                >
                  <it.icon className="h-4 w-4" />
                </span>
                <span
                  className={cn(
                    "flex flex-col overflow-hidden leading-tight transition-all duration-300",
                    collapsed ? "w-0 opacity-0" : "w-auto min-w-0 opacity-100",
                  )}
                >
                  <span className="truncate">{it.label}</span>
                  <span className="truncate font-mono text-[9px] font-normal uppercase tracking-widest text-muted-foreground/60">
                    {it.hint}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

function ProfileCard({ collapsed, email }: { collapsed: boolean; email: string | null }) {
  const router = useRouter();
  const initial = (email ?? "A").charAt(0).toUpperCase();

  async function signOut() {
    await supabase.auth.signOut();
    router.navigate({ to: "/admin/login" });
  }

  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-2 border-t border-border/60 p-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-red/70 text-sm font-bold text-brand-red-foreground ring-2 ring-brand-red/20">
          {initial}
        </div>
        <button
          onClick={signOut}
          aria-label="Sign out"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-destructive/50 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="border-t border-border/60 p-3">
      <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/50 p-3 transition hover:border-brand-red/30">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-red/70 text-sm font-bold text-brand-red-foreground ring-2 ring-brand-red/20">
          {initial}
        </div>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-xs font-bold">Administrator</p>
          <p className="truncate font-mono text-[10px] text-muted-foreground">{email ?? "admin"}</p>
        </div>
      </div>
      <button
        onClick={signOut}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background/50 px-3 py-2.5 text-xs font-bold uppercase tracking-widest text-muted-foreground transition hover:border-destructive/50 hover:text-destructive"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </div>
  );
}
