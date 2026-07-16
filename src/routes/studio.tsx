import { createFileRoute, Outlet, useRouter, useLocation } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Sparkles,
  Send,
  Trash2,
  Clock,
  Loader2,
  Facebook,
  Instagram,
  Save,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  LayoutGrid,
  CalendarDays,
  Layers,
  LayoutTemplate,
  Building2,
  Plug,
  ScrollText,
  BarChart3,
  Bell,
  FileBarChart,
  Film,
  ImagePlus,
  Images,
  MessageCircle,
  Megaphone,
  LayoutDashboard,
  Drama,
  Rocket,
  ShieldCheck,
  Share2,
  Lightbulb,
  Inbox,
  UserPlus,

  FlaskConical,
  ShieldAlert,
  Menu,
  X,
  ChevronsLeft,
  ChevronRight,
  Sun,
  Moon,
  LogOut,
  Search,
  Command,
  CornerDownLeft,
  FileText,
  CalendarClock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  Hash,
  Recycle,
  Link2,
  Radar,




} from "lucide-react";
import {
  listSocialPosts,
  generateSocialPost,
  regeneratePost,
  saveSocialPost,
  deleteSocialPost,
  publishSocialPostNow,
  addPostImage,
  removePostMedia,
  setPostVideo,
  listCampaigns,
  assignPostCampaign,
  listVoiceProfiles,
  assignPostVoiceProfile,
  type SocialPost,
  type CampaignWithStats,
  type VoiceProfile,
} from "@/lib/social.functions";
import { BrandTab } from "@/components/admin/social/BrandTab";
import { BatchTab } from "@/components/admin/social/BatchTab";
import { CalendarTab } from "@/components/admin/social/CalendarTab";
import { ConnectionTab } from "@/components/admin/social/ConnectionTab";
import { LogsTab } from "@/components/admin/social/LogsTab";
import { AnalyticsTab } from "@/components/admin/social/AnalyticsTab";
import { AutoReplyTab } from "@/components/admin/social/AutoReplyTab";
import { OverviewTab } from "@/components/admin/social/OverviewTab";
import { CampaignsTab } from "@/components/admin/social/CampaignsTab";
import { PersonaTab } from "@/components/admin/social/PersonaTab";
import { AutopilotTab } from "@/components/admin/social/AutopilotTab";
import { ApprovalTab } from "@/components/admin/social/ApprovalTab";
import { MediaLibraryTab } from "@/components/admin/social/MediaLibraryTab";
import { PlatformsTab } from "@/components/admin/social/PlatformsTab";
import { InsightsTab } from "@/components/admin/social/InsightsTab";
import { InboxTab } from "@/components/admin/social/InboxTab";
import { ExperimentsTab } from "@/components/admin/social/ExperimentsTab";
import { AutomationTab } from "@/components/admin/social/AutomationTab";
import { PostVariantsPanel } from "@/components/admin/social/PostVariantsPanel";
import { IdeaBankTab } from "@/components/admin/social/IdeaBankTab";
import { HashtagStudioTab } from "@/components/admin/social/HashtagStudioTab";
import { TemplatesTab } from "@/components/admin/social/TemplatesTab";
import { RepurposeTab } from "@/components/admin/social/RepurposeTab";
import { UtmStudioTab } from "@/components/admin/social/UtmStudioTab";
import { TrendRadarTab } from "@/components/admin/social/TrendRadarTab";
import { LeadsBridgeTab } from "@/components/admin/social/LeadsBridgeTab";
import { ReportsTab } from "@/components/admin/social/ReportsTab";
import { ActivityTab } from "@/components/admin/social/ActivityTab";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "AI Content Studio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: StudioLayout,
});

type GateState = "checking" | "login" | "ok" | "unauthorized";
type PlatformOpt = "both" | "facebook" | "instagram";

type SectionId =
  | "overview"
  | "analytics"
  | "insights"
  | "reports"
  | "ideas"
  | "hashtags"
  | "templates"
  | "repurpose"
  | "utm"
  | "trends"
  | "posts"
  | "batch"
  | "calendar"
  | "media"
  | "campaigns"
  | "persona"
  | "autopilot"
  | "automation"
  | "approval"
  | "experiments"
  | "inbox"
  | "leads"
  | "autoreply"
  | "platforms"
  | "connection"
  | "brand"
  | "logs"
  | "activity";

type NavItem = { id: SectionId; label: string; icon: typeof LayoutGrid; hint: string };

const NAV_GROUPS: { label: string; step: string; items: NavItem[] }[] = [
  {
    label: "Dashboard",
    step: "01",
    items: [
      { id: "overview", label: "Overview", icon: LayoutDashboard, hint: "At a glance" },
      { id: "analytics", label: "Analytics", icon: BarChart3, hint: "Performance" },
      { id: "insights", label: "Insights", icon: Lightbulb, hint: "AI suggestions" },
      { id: "reports", label: "Reports", icon: FileBarChart, hint: "Export & PDF" },
    ],
  },
  {
    label: "Setup",
    step: "02",
    items: [
      { id: "brand", label: "Brand", icon: Building2, hint: "Brand identity" },
      { id: "persona", label: "Persona", icon: Drama, hint: "Voice profiles" },
      { id: "connection", label: "Connection", icon: Plug, hint: "Accounts" },
      { id: "platforms", label: "Platforms", icon: Share2, hint: "Channels" },
    ],
  },
  {
    label: "Create",
    step: "03",
    items: [
      { id: "ideas", label: "Idea Bank", icon: Lightbulb, hint: "Brainstorm & plan" },
      { id: "trends", label: "Trend Radar", icon: Radar, hint: "Spot opportunities" },
      { id: "hashtags", label: "Hashtag Studio", icon: Hash, hint: "Tags & keywords" },
      { id: "templates", label: "Templates", icon: LayoutTemplate, hint: "Reusable formats" },
      { id: "posts", label: "Create Posts", icon: LayoutGrid, hint: "Generate content" },
      { id: "repurpose", label: "Repurpose", icon: Recycle, hint: "1 content → all channels" },
      { id: "utm", label: "UTM Links", icon: Link2, hint: "Track link clicks" },
      { id: "batch", label: "Batch Generate", icon: Layers, hint: "Bulk creation" },
      { id: "campaigns", label: "Campaigns", icon: Megaphone, hint: "Themes" },
      { id: "media", label: "Media Library", icon: Images, hint: "Assets" },
    ],
  },
  {
    label: "Review & Schedule",
    step: "04",
    items: [
      { id: "approval", label: "Approval", icon: ShieldCheck, hint: "Review queue" },
      { id: "calendar", label: "Calendar", icon: CalendarDays, hint: "Schedule" },
      { id: "experiments", label: "A/B Test", icon: FlaskConical, hint: "Variants" },
    ],
  },
  {
    label: "Automate & Engage",
    step: "05",
    items: [
      { id: "autopilot", label: "Autopilot", icon: Rocket, hint: "Hands-free" },
      { id: "automation", label: "Automation", icon: ShieldAlert, hint: "Rules" },
      { id: "inbox", label: "Inbox", icon: Inbox, hint: "Messages" },
      { id: "leads", label: "Leads Bridge", icon: UserPlus, hint: "Social → CRM" },
      { id: "autoreply", label: "Auto-Reply", icon: MessageCircle, hint: "Responses" },
      { id: "logs", label: "Logs", icon: ScrollText, hint: "Activity" },
      { id: "activity", label: "Activity", icon: Bell, hint: "Notifications & notes" },
    ],
  },
];

const ALL_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);

function findItem(id: SectionId): NavItem {
  return ALL_ITEMS.find((it) => it.id === id) ?? ALL_ITEMS[0];
}

function StudioLayout() {
  const location = useLocation();
  const router = useRouter();
  const isLogin = location.pathname === "/studio/login";
  const [state, setState] = useState<GateState>("checking");
  const [email, setEmail] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

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

  useEffect(() => {
    let mounted = true;
    async function check() {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;
      if (!session) {
        if (!mounted) return;
        setState("login");
        if (!isLogin) router.navigate({ to: "/studio/login" });
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
        if (isLogin) router.navigate({ to: "/studio" });
      } else {
        setState("unauthorized");
      }
    }
    void check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => void check());
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [isLogin, router]);

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
          <span className="font-mono text-xs uppercase tracking-[0.3em]">Loading Studio</span>
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
            router.navigate({ to: "/studio/login" });
          }}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Sign out
        </button>
      </div>
    );
  }

  if (state !== "ok") return null;

  return <StudioApp email={email} theme={theme} toggleTheme={toggleTheme} router={router} />;
}

function StudioApp({
  email,
  theme,
  toggleTheme,
  router,
}: {
  email: string | null;
  theme: "light" | "dark";
  toggleTheme: () => void;
  router: ReturnType<typeof useRouter>;
}) {
  const [section, setSection] = useState<SectionId>("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const current = findItem(section);


  // Shared "Create Posts" workflow state
  const fetchPosts = useServerFn(listSocialPosts);
  const generate = useServerFn(generateSocialPost);
  const regenerate = useServerFn(regeneratePost);
  const save = useServerFn(saveSocialPost);
  const remove = useServerFn(deleteSocialPost);
  const publish = useServerFn(publishSocialPostNow);
  const addImage = useServerFn(addPostImage);
  const removeMedia = useServerFn(removePostMedia);
  const setVideo = useServerFn(setPostVideo);
  const fetchCampaigns = useServerFn(listCampaigns);
  const assignCampaign = useServerFn(assignPostCampaign);
  const fetchProfiles = useServerFn(listVoiceProfiles);
  const assignVoice = useServerFn(assignPostVoiceProfile);

  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignWithStats[]>([]);
  const [campaignFilter, setCampaignFilter] = useState<string>("all");
  const [profiles, setProfiles] = useState<VoiceProfile[]>([]);
  const [genVoiceId, setGenVoiceId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<PlatformOpt>("both");
  const [generating, setGenerating] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | SocialPost["status"]>("all");
  const [toast, setToast] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);
  const loadedRef = useRef(false);

  function notify(kind: "ok" | "err", msg: string) {
    setToast({ kind, msg });
    setTimeout(() => setToast(null), 4000);
  }

  async function load() {
    setLoading(true);
    try {
      const [p, c, vp] = await Promise.all([fetchPosts(), fetchCampaigns(), fetchProfiles()]);
      setPosts(p);
      setCampaigns(c);
      setProfiles(vp);
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function patchLocal(id: string, patch: Partial<SocialPost>) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  async function onReschedule(postId: string, iso: string) {
    const prev = posts.find((p) => p.id === postId);
    const nextStatus =
      prev && (prev.status === "draft" || prev.status === "approved") ? "scheduled" : prev?.status;
    patchLocal(postId, { scheduled_for: iso, ...(nextStatus ? { status: nextStatus } : {}) });
    try {
      await save({ data: { id: postId, scheduled_for: iso, ...(nextStatus ? { status: nextStatus } : {}) } });
      notify("ok", "Rescheduled");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to reschedule");
      void load();
    }
  }

  async function onAssignCampaign(post: SocialPost, campaignId: string | null) {
    patchLocal(post.id, { campaign_id: campaignId });
    try {
      await assignCampaign({ data: { postId: post.id, campaignId } });
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to assign campaign");
      void load();
    }
  }

  async function onAssignVoice(post: SocialPost, voiceProfileId: string | null) {
    patchLocal(post.id, { voice_profile_id: voiceProfileId });
    try {
      await assignVoice({ data: { postId: post.id, voiceProfileId } });
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to assign persona");
      void load();
    }
  }

  async function onGenerate() {
    setGenerating(true);
    try {
      const post = await generate({ data: { topic, platform, voiceProfileId: genVoiceId || null } });
      setPosts((p) => [post, ...p]);
      setTopic("");
      notify("ok", "New content generated 🎉");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to generate");
    } finally {
      setGenerating(false);
    }
  }

  const counts = useMemo(
    () => ({
      all: posts.length,
      draft: posts.filter((p) => p.status === "draft").length,
      scheduled: posts.filter((p) => p.status === "scheduled").length,
      posted: posts.filter((p) => p.status === "posted").length,
      failed: posts.filter((p) => p.status === "failed").length,
    }),
    [posts],
  );

  const filtered = posts.filter(
    (p) =>
      (filter === "all" || p.status === filter) &&
      (campaignFilter === "all" ||
        (campaignFilter === "none" ? !p.campaign_id : p.campaign_id === campaignFilter)),
  );

  async function onSave(post: SocialPost) {
    setBusy(post.id);
    try {
      await save({
        data: {
          id: post.id,
          platform: post.platform,
          caption: post.caption,
          hashtags: post.hashtags ?? "",
          status: post.status,
          scheduled_for: post.scheduled_for,
        },
      });
      notify("ok", "Saved");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to save");
    } finally {
      setBusy(null);
    }
  }

  async function onSchedule(post: SocialPost, value: string) {
    const iso = value ? new Date(value).toISOString() : null;
    patchLocal(post.id, { scheduled_for: iso, status: iso ? "scheduled" : "draft" });
    setBusy(post.id);
    try {
      await save({ data: { id: post.id, scheduled_for: iso, status: iso ? "scheduled" : "draft" } });
      notify("ok", iso ? "Post scheduled" : "Schedule removed");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to schedule");
    } finally {
      setBusy(null);
    }
  }

  async function onPublish(post: SocialPost) {
    setBusy(post.id);
    try {
      const res = await publish({ data: { id: post.id } });
      if (res.ok) {
        patchLocal(post.id, { status: "posted", posted_at: new Date().toISOString(), error: null });
        notify("ok", "Published ✅");
      } else {
        patchLocal(post.id, { status: "failed", error: res.error ?? null });
        notify("err", res.error ?? "Failed to publish");
      }
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to publish");
    } finally {
      setBusy(null);
    }
  }

  async function onDelete(post: SocialPost) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setBusy(post.id);
    try {
      await remove({ data: { id: post.id } });
      setPosts((p) => p.filter((x) => x.id !== post.id));
      notify("ok", "Deleted");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to delete");
    } finally {
      setBusy(null);
    }
  }

  async function onRegenerate(post: SocialPost, textOnly: boolean) {
    setBusy(post.id);
    try {
      const updated = await regenerate({ data: { id: post.id, topic: post.idea ?? "", textOnly } });
      patchLocal(post.id, updated);
      notify("ok", textOnly ? "Text regenerated" : "Content regenerated 🎉");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to regenerate");
    } finally {
      setBusy(null);
    }
  }

  async function onAddImage(post: SocialPost) {
    setBusy(post.id);
    try {
      const updated = await addImage({ data: { id: post.id } });
      patchLocal(post.id, updated);
      notify("ok", "Image added (carousel)");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to add image");
    } finally {
      setBusy(null);
    }
  }

  async function onRemoveMedia(post: SocialPost, path: string) {
    setBusy(post.id);
    try {
      const updated = await removeMedia({ data: { id: post.id, path } });
      patchLocal(post.id, updated);
      notify("ok", "Media removed");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to remove");
    } finally {
      setBusy(null);
    }
  }

  async function onSetVideo(post: SocialPost, url: string) {
    setBusy(post.id);
    try {
      const updated = await setVideo({ data: { id: post.id, videoUrl: url, type: "reels" } });
      patchLocal(post.id, updated);
      notify("ok", "Video/Reels set 🎬");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to set video");
    } finally {
      setBusy(null);
    }
  }

  function go(id: SectionId) {
    setSection(id);
    setDrawerOpen(false);
    setCmdOpen(false);
  }

  // Global command palette shortcut (⌘K / Ctrl+K)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
      if (e.key === "Escape") setCmdOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);


  function renderSection() {
    switch (section) {
      case "overview":
        return <OverviewTab notify={notify} />;
      case "analytics":
        return <AnalyticsTab notify={notify} />;
      case "insights":
        return <InsightsTab notify={notify} />;
      case "reports":
        return <ReportsTab notify={notify} />;
      case "calendar":
        return <CalendarTab posts={posts} onReschedule={onReschedule} />;
      case "campaigns":
        return <CampaignsTab notify={notify} />;
      case "persona":
        return <PersonaTab notify={notify} />;
      case "autopilot":
        return <AutopilotTab notify={notify} />;
      case "approval":
        return <ApprovalTab notify={notify} />;
      case "media":
        return <MediaLibraryTab notify={notify} posts={posts} onPostUpdated={(p) => patchLocal(p.id, p)} />;
      case "platforms":
        return <PlatformsTab notify={notify} />;
      case "batch":
        return <BatchTab notify={notify} onDone={() => { setSection("posts"); void load(); }} />;
      case "brand":
        return <BrandTab notify={notify} />;
      case "connection":
        return <ConnectionTab notify={notify} />;
      case "experiments":
        return <ExperimentsTab notify={notify} />;
      case "inbox":
        return <InboxTab notify={notify} />;
      case "leads":
        return <LeadsBridgeTab notify={notify} />;
      case "autoreply":
        return <AutoReplyTab notify={notify} />;
      case "automation":
        return <AutomationTab notify={notify} />;
      case "logs":
        return <LogsTab notify={notify} />;
      case "activity":
        return <ActivityTab notify={notify} posts={posts} onNavigate={(s) => go(s as SectionId)} />;
      case "ideas":
        return <IdeaBankTab notify={notify} />;
      case "hashtags":
        return <HashtagStudioTab notify={notify} posts={posts} />;
      case "templates":
        return (
          <TemplatesTab
            notify={notify}
            onPostCreated={() => {
              setSection("posts");
              void load();
            }}
          />
        );
      case "repurpose":
        return (
          <RepurposeTab
            notify={notify}
            posts={posts}
            onPostCreated={() => {
              setSection("posts");
              void load();
            }}
          />
        );
      case "utm":
        return <UtmStudioTab notify={notify} posts={posts} />;
      case "trends":
        return (
          <TrendRadarTab
            notify={notify}
            onIdeaCreated={() => {
              setSection("ideas");
              void load();
            }}
          />
        );
      case "posts":
        return (
          <PostsWorkflow
            posts={posts}
            filtered={filtered}
            counts={counts}
            loading={loading}
            topic={topic}
            setTopic={setTopic}
            platform={platform}
            setPlatform={setPlatform}
            generating={generating}
            onGenerate={onGenerate}
            profiles={profiles}
            genVoiceId={genVoiceId}
            setGenVoiceId={setGenVoiceId}
            filter={filter}
            setFilter={setFilter}
            campaigns={campaigns}
            campaignFilter={campaignFilter}
            setCampaignFilter={setCampaignFilter}
            busy={busy}
            patchLocal={patchLocal}
            onSave={onSave}
            onSchedule={onSchedule}
            onPublish={onPublish}
            onDelete={onDelete}
            onRegenerate={onRegenerate}
            onAddImage={onAddImage}
            onRemoveMedia={onRemoveMedia}
            onSetVideo={onSetVideo}
            onAssignCampaign={onAssignCampaign}
            onAssignVoice={onAssignVoice}
            notify={notify}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className={cn("relative min-h-screen bg-background text-foreground lg:flex", theme === "light" && "theme-light")}>
      <Toaster position="top-right" richColors closeButton />
      {toast && (
        <div
          className={`fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-2xl backdrop-blur ${
            toast.kind === "ok"
              ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-500"
              : "border-destructive/40 bg-destructive/15 text-destructive"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[420px] w-[420px] rounded-full bg-brand-red/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-brand-green/8 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(var(--color-foreground)_1px,transparent_1px),linear-gradient(90deg,var(--color-foreground)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      {/* Desktop sidebar */}
      <StudioSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        section={section}
        onSelect={go}
        email={email}
        className="sticky top-0 z-30 hidden h-screen shrink-0 lg:flex"
      />

      {/* Mobile drawer */}
      {drawerOpen && (
        <>
          <button
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
            onClick={() => setDrawerOpen(false)}
          />
          <StudioSidebar
            collapsed={false}
            onToggle={() => setDrawerOpen(false)}
            section={section}
            onSelect={go}
            email={email}
            mobile
            className="fixed inset-y-0 left-0 z-50 flex w-[84vw] max-w-[300px] shadow-2xl lg:hidden"
          />
        </>
      )}

      {/* Content column */}
      <div className="relative z-10 flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/70 px-4 backdrop-blur-xl sm:px-6">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/60 text-foreground lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-red/12 text-brand-red ring-1 ring-inset ring-brand-red/20">
              <current.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 leading-tight">
              <div className="hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/70 sm:flex">
                <span>Studio</span>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className="text-brand-red/80">{current.hint}</span>
              </div>
              <h1 className="truncate text-base font-bold tracking-tight">{current.label}</h1>
            </div>
          </div>

          {/* Command bar (⌘K) */}
          <button
            onClick={() => setCmdOpen(true)}
            className="group ml-4 hidden h-9 max-w-[300px] flex-1 items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-3 text-left text-xs text-muted-foreground transition hover:border-brand-red/40 hover:bg-card/70 md:flex"
          >
            <Search className="h-3.5 w-3.5 shrink-0" />
            <span className="flex-1 truncate">Jump to any tool…</span>
            <kbd className="flex items-center gap-0.5 rounded border border-border/70 bg-background/60 px-1.5 py-0.5 font-mono text-[9px]">
              <Command className="h-2.5 w-2.5" /> K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setCmdOpen(true)}
              aria-label="Open command palette"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-card/50 text-muted-foreground transition hover:border-brand-red/40 hover:text-foreground md:hidden"
            >
              <Search className="h-4 w-4" />
            </button>
            <span className="hidden items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-green" />
              </span>
              Online
            </span>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-card/50 text-muted-foreground transition hover:border-brand-red/40 hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-red/70 text-sm font-bold text-brand-red-foreground ring-2 ring-brand-red/20 ring-offset-2 ring-offset-background sm:flex">
              {(email ?? "A").charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Live KPI ribbon */}
        <StatRibbon counts={counts} onJump={(f) => { setFilter(f); go("posts"); }} />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div key={section} className="mx-auto max-w-6xl animate-fade-in space-y-6">
            {renderSection()}
          </div>
        </main>
      </div>

      {cmdOpen && (
        <CommandPalette
          current={section}
          onClose={() => setCmdOpen(false)}
          onSelect={(id) => go(id)}
        />
      )}
    </div>
  );
}

function StatRibbon({
  counts,
  onJump,
}: {
  counts: { all: number; draft: number; scheduled: number; posted: number; failed: number };
  onJump: (f: "all" | SocialPost["status"]) => void;
}) {
  const stats: { key: "all" | SocialPost["status"]; label: string; value: number; icon: typeof FileText; tone: string }[] = [
    { key: "all", label: "Total", value: counts.all, icon: LayoutGrid, tone: "text-foreground" },
    { key: "draft", label: "Drafts", value: counts.draft, icon: FileText, tone: "text-slate-300" },
    { key: "scheduled", label: "Scheduled", value: counts.scheduled, icon: CalendarClock, tone: "text-amber-400" },
    { key: "posted", label: "Published", value: counts.posted, icon: CheckCircle, tone: "text-emerald-400" },
    { key: "failed", label: "Failed", value: counts.failed, icon: XCircle, tone: "text-destructive" },
  ];
  return (
    <div className="scrollbar-none flex gap-2 overflow-x-auto border-b border-border/60 bg-background/40 px-4 py-2.5 backdrop-blur sm:px-6">
      {stats.map((s) => (
        <button
          key={s.key}
          onClick={() => onJump(s.key)}
          className="group flex shrink-0 items-center gap-2.5 rounded-xl border border-border/60 bg-card/40 px-3.5 py-2 transition hover:border-brand-red/40 hover:bg-card/70"
        >
          <s.icon className={cn("h-4 w-4", s.tone)} />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{s.label}</span>
          <span className={cn("text-sm font-bold tabular-nums", s.tone)}>{s.value}</span>
          <ArrowUpRight className="h-3 w-3 text-muted-foreground/0 transition group-hover:text-muted-foreground" />
        </button>
      ))}
    </div>
  );
}

function CommandPalette({
  current,
  onClose,
  onSelect,
}: {
  current: SectionId;
  onClose: () => void;
  onSelect: (id: SectionId) => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const flat = NAV_GROUPS.flatMap((g) => g.items.map((it) => ({ ...it, group: g.label })));
    if (!q) return flat;
    return flat.filter(
      (it) => it.label.toLowerCase().includes(q) || it.hint.toLowerCase().includes(q) || it.group.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const sel = results[active];
      if (sel) onSelect(sel.id);
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[12vh]">
      <button aria-label="Close" className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <div className="animate-scale-in relative w-full max-w-lg overflow-hidden rounded-2xl border border-border/70 bg-card/95 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search tools and sections…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border/70 bg-background/60 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
            ESC
          </kbd>
        </div>
        <div className="scrollbar-none max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">No results for “{query}”.</div>
          )}
          {results.map((it, i) => {
            const isActive = i === active;
            const isCurrent = it.id === current;
            return (
              <button
                key={it.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => onSelect(it.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition",
                  isActive ? "bg-brand-red/12 text-brand-red" : "text-foreground hover:bg-accent/40",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
                    isActive ? "border-brand-red/40 bg-brand-red/10 text-brand-red" : "border-border/60 bg-background/50 text-muted-foreground",
                  )}
                >
                  <it.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{it.label}</div>
                  <div className="truncate font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                    {it.group} · {it.hint}
                  </div>
                </div>
                {isCurrent && (
                  <span className="rounded-full border border-brand-green/40 bg-brand-green/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-brand-green">
                    current
                  </span>
                )}
                {isActive && !isCurrent && <CornerDownLeft className="h-3.5 w-3.5 text-brand-red/70" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}


function StudioSidebar({
  collapsed,
  onToggle,
  section,
  onSelect,
  email,
  mobile = false,
  className,
}: {
  collapsed: boolean;
  onToggle: () => void;
  section: SectionId;
  onSelect: (id: SectionId) => void;
  email: string | null;
  mobile?: boolean;
  className?: string;
}) {
  const router = useRouter();
  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border/60 bg-sidebar/80 backdrop-blur-xl transition-[width] duration-300",
        collapsed ? "w-[76px]" : "w-[264px]",
        className,
      )}
    >
      <div className={cn("flex h-16 items-center border-b border-border/60", collapsed ? "justify-center px-2" : "justify-between px-5")}>
        <div className="flex items-center gap-2.5">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-xl bg-brand-red blur-md opacity-50" />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red to-brand-red/70 text-brand-red-foreground shadow-lg shadow-brand-red/30">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-none">
              <span className="text-sm font-extrabold tracking-tight">AI Content Studio</span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">creator · v1</span>
            </div>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={onToggle}
            aria-label={mobile ? "Close" : "Collapse sidebar"}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:border-brand-red/40 hover:text-foreground"
          >
            {mobile ? <X className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
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

      <div className="scrollbar-none flex-1 overflow-y-auto px-3 py-4">
        <nav className="flex flex-col gap-5">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col gap-1">
              {!collapsed ? (
                <div className="mb-1.5 flex items-center gap-2 px-3">
                  <span className="flex h-4 min-w-4 items-center justify-center rounded bg-brand-red/15 px-1 font-mono text-[8px] font-bold text-brand-red">
                    {group.step}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground/60">{group.label}</span>
                  <span className="h-px flex-1 bg-border/50" />
                </div>
              ) : (
                <div className="mx-auto mb-1 h-px w-6 bg-border/50" />
              )}
              {group.items.map((it) => {
                const active = it.id === section;
                return (
                  <button
                    key={it.id}
                    onClick={() => onSelect(it.id)}
                    aria-current={active ? "page" : undefined}
                    title={collapsed ? it.label : undefined}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-300",
                      collapsed && "justify-center px-0",
                      active
                        ? "bg-gradient-to-r from-brand-red/20 via-brand-red/10 to-transparent text-brand-red ring-1 ring-inset ring-brand-red/25 shadow-[0_4px_20px_-8px_var(--color-brand-red)]"
                        : "text-muted-foreground hover:translate-x-0.5 hover:bg-accent/40 hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand-red transition-all duration-300",
                        active ? "opacity-100 shadow-[0_0_10px_var(--color-brand-red)]" : "opacity-0",
                      )}
                    />
                    <it.icon className={cn("h-[18px] w-[18px] shrink-0 transition", active && "drop-shadow-[0_0_6px_var(--color-brand-red)]")} />
                    <span className={cn("overflow-hidden whitespace-nowrap transition-all duration-300", collapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
                      {it.label}
                    </span>
                    {active && !collapsed && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-red shadow-[0_0_8px_var(--color-brand-red)]" />
                    )}
                  </button>

                );
              })}
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-border/60 p-3">
        {!collapsed && email && (
          <div className="mb-2 truncate px-2 font-mono text-[10px] text-muted-foreground" title={email}>
            {email}
          </div>
        )}
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.navigate({ to: "/studio/login" });
          }}
          className={cn(
            "flex w-full items-center gap-2 rounded-xl border border-border/60 px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:border-destructive/50 hover:text-destructive",
            collapsed && "justify-center px-0",
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && "Sign out"}
        </button>
      </div>
    </aside>
  );
}

// ====================== Posts workflow ======================

const WORKFLOW_STEPS = [
  { n: 1, label: "Generate" },
  { n: 2, label: "Review & edit" },
  { n: 3, label: "Schedule" },
  { n: 4, label: "Publish" },
];

function PostsWorkflow(props: {
  posts: SocialPost[];
  filtered: SocialPost[];
  counts: { all: number; draft: number; scheduled: number; posted: number; failed: number };
  loading: boolean;
  topic: string;
  setTopic: (v: string) => void;
  platform: PlatformOpt;
  setPlatform: (p: PlatformOpt) => void;
  generating: boolean;
  onGenerate: () => void;
  profiles: VoiceProfile[];
  genVoiceId: string;
  setGenVoiceId: (v: string) => void;
  filter: "all" | SocialPost["status"];
  setFilter: (f: "all" | SocialPost["status"]) => void;
  campaigns: CampaignWithStats[];
  campaignFilter: string;
  setCampaignFilter: (v: string) => void;
  busy: string | null;
  patchLocal: (id: string, patch: Partial<SocialPost>) => void;
  onSave: (post: SocialPost) => void;
  onSchedule: (post: SocialPost, value: string) => void;
  onPublish: (post: SocialPost) => void;
  onDelete: (post: SocialPost) => void;
  onRegenerate: (post: SocialPost, textOnly: boolean) => void;
  onAddImage: (post: SocialPost) => void;
  onRemoveMedia: (post: SocialPost, path: string) => void;
  onSetVideo: (post: SocialPost, url: string) => void;
  onAssignCampaign: (post: SocialPost, cid: string | null) => void;
  onAssignVoice: (post: SocialPost, vid: string | null) => void;
  notify: (kind: "ok" | "err", msg: string) => void;
}) {
  const {
    filtered, counts, loading, topic, setTopic, platform, setPlatform, generating, onGenerate,
    profiles, genVoiceId, setGenVoiceId, filter, setFilter, campaigns, campaignFilter, setCampaignFilter,
    busy, patchLocal, onSave, onSchedule, onPublish, onDelete, onRegenerate, onAddImage,
    onRemoveMedia, onSetVideo, onAssignCampaign, onAssignVoice, notify,
  } = props;

  return (
    <div className="space-y-6">
      {/* Workflow stepper */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border/60 bg-card/40 p-3 backdrop-blur">
        {WORKFLOW_STEPS.map((s, i) => (
          <div key={s.n} className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3 py-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-brand-red-foreground">
                {s.n}
              </span>
              <span className="text-xs font-semibold">{s.label}</span>
            </div>
            {i < WORKFLOW_STEPS.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />}
          </div>
        ))}
      </div>

      {/* Step 1 — Generator */}
      <section className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur sm:p-5">
        <div className="flex items-center gap-2 text-sm font-bold">
          <Sparkles className="h-4 w-4 text-brand-red" />
          Step 1 — Generate new content
        </div>
        <div className="mt-3 flex flex-col gap-3">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Topic (optional) — e.g. winter boiler maintenance campaign"
            className="w-full rounded-xl border border-border/60 bg-background/60 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-red/60"
          />
          {profiles.length > 0 && (
            <div className="flex items-center gap-2">
              <Drama className="h-4 w-4 shrink-0 text-brand-red" />
              <select
                value={genVoiceId}
                onChange={(e) => setGenVoiceId(e.target.value)}
                className="w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/60"
              >
                <option value="">Default persona</option>
                {profiles.filter((p) => p.active).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}{p.is_default ? " (default)" : ""}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="flex gap-2">
              {(["both", "facebook", "instagram"] as PlatformOpt[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition sm:flex-none ${
                    platform === p
                      ? "border-brand-red bg-brand-red/15 text-brand-red"
                      : "border-border/60 bg-background/40 text-muted-foreground hover:border-brand-red/40"
                  }`}
                >
                  {p === "facebook" && <Facebook className="h-3.5 w-3.5" />}
                  {p === "instagram" && <Instagram className="h-3.5 w-3.5" />}
                  {platformLabel(p)}
                </button>
              ))}
            </div>
            <button
              onClick={onGenerate}
              disabled={generating}
              className="ml-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-2.5 text-sm font-bold text-brand-red-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {generating ? "Generating…" : "Generate"}
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {(["all", "draft", "scheduled", "posted", "failed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
              filter === f
                ? "border-brand-red bg-brand-red text-white"
                : "border-border bg-card/40 text-muted-foreground hover:border-brand-red/40"
            }`}
          >
            {statusLabel(f)} · {counts[f]}
          </button>
        ))}
        {campaigns.length > 0 && (
          <select
            value={campaignFilter}
            onChange={(e) => setCampaignFilter(e.target.value)}
            className="rounded-full border border-border bg-card/40 px-3 py-1.5 text-xs font-bold text-muted-foreground outline-none focus:border-brand-red/40"
          >
            <option value="all">All campaigns</option>
            <option value="none">No campaign</option>
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        )}
      </div>

      {loading && <div className="h-40 animate-pulse rounded-2xl border border-border/60 bg-card/50" />}

      {!loading && filtered.length === 0 && (
        <div className="rounded-2xl border border-border/60 bg-card/40 p-8 text-center text-sm text-muted-foreground">
          No content yet. Generate your first post from above.
        </div>
      )}

      <div className="grid gap-4">
        {filtered.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            busy={busy === post.id}
            onChange={(patch) => patchLocal(post.id, patch)}
            onSave={() => onSave(post)}
            onSchedule={(v) => onSchedule(post, v)}
            onPublish={() => onPublish(post)}
            onDelete={() => onDelete(post)}
            onRegenerate={(textOnly) => onRegenerate(post, textOnly)}
            onAddImage={() => onAddImage(post)}
            onRemoveMedia={(path) => onRemoveMedia(post, path)}
            onSetVideo={(url) => onSetVideo(post, url)}
            campaigns={campaigns}
            onAssignCampaign={(cid) => onAssignCampaign(post, cid)}
            profiles={profiles}
            onAssignVoice={(vid) => onAssignVoice(post, vid)}
            notify={notify}
          />
        ))}
      </div>
    </div>
  );
}

function PostCard({
  post,
  busy,
  onChange,
  onSave,
  onSchedule,
  onPublish,
  onDelete,
  onRegenerate,
  onAddImage,
  onRemoveMedia,
  onSetVideo,
  campaigns,
  onAssignCampaign,
  profiles,
  onAssignVoice,
  notify,
}: {
  post: SocialPost;
  busy: boolean;
  onChange: (patch: Partial<SocialPost>) => void;
  onSave: () => void;
  onSchedule: (value: string) => void;
  onPublish: () => void;
  onDelete: () => void;
  onRegenerate: (textOnly: boolean) => void;
  onAddImage: () => void;
  onRemoveMedia: (path: string) => void;
  onSetVideo: (url: string) => void;
  campaigns: CampaignWithStats[];
  onAssignCampaign: (campaignId: string | null) => void;
  profiles: VoiceProfile[];
  onAssignVoice: (voiceProfileId: string | null) => void;
  notify: (kind: "ok" | "err", msg: string) => void;
}) {
  const [videoUrl, setVideoUrl] = useState("");
  const media = post.media_paths?.length ? post.media_paths : post.image_path ? [post.image_path] : [];
  const urls = post.media_urls?.length ? post.media_urls : post.image_url ? [post.image_url] : [];
  const isVideo = post.media_type === "video" || post.media_type === "reels";

  return (
    <article className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full shrink-0 bg-background/40 md:w-56">
          {isVideo ? (
            <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 text-center text-xs text-muted-foreground">
              <Film className="h-7 w-7 text-brand-red" />
              <span className="px-3 break-all">{post.media_type === "reels" ? "Reels" : "Video"}</span>
            </div>
          ) : post.image_url ? (
            <img src={post.image_url} alt={post.idea ?? "Post image"} className="aspect-square w-full object-cover" loading="lazy" />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center text-xs text-muted-foreground">No image</div>
          )}
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            <StatusBadge status={post.status} />
            <MediaBadge type={post.media_type} count={media.length} />
          </div>

          {!isVideo && media.length > 1 && (
            <div className="flex flex-wrap gap-1 p-2">
              {urls.map((u, i) => (
                <div key={media[i] ?? i} className="group relative h-10 w-10 overflow-hidden rounded-md">
                  <img src={u} alt="" className="h-full w-full object-cover" loading="lazy" />
                  <button
                    onClick={() => onRemoveMedia(media[i])}
                    disabled={busy}
                    aria-label="Remove image"
                    className="absolute inset-0 flex items-center justify-center bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {!isVideo && (
            <button
              onClick={onAddImage}
              disabled={busy}
              className="m-2 inline-flex w-[calc(100%-1rem)] items-center justify-center gap-1.5 rounded-lg border border-dashed border-border/70 px-2 py-1.5 text-[11px] font-bold text-muted-foreground transition hover:border-brand-red/50 hover:text-foreground disabled:opacity-50"
            >
              <ImagePlus className="h-3.5 w-3.5" /> Add image (carousel)
            </button>
          )}

          <div className="flex items-center gap-1 px-2 pb-2">
            <input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Video/Reels URL"
              className="min-w-0 flex-1 rounded-lg border border-border/60 bg-background/60 px-2 py-1.5 text-[11px] outline-none"
            />
            <button
              onClick={() => { if (videoUrl.trim()) onSetVideo(videoUrl.trim()); }}
              disabled={busy || !videoUrl.trim()}
              aria-label="Set video"
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-red text-brand-red-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              <Film className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
          {post.idea && (
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">💡 {post.idea}</div>
          )}

          <textarea
            value={post.caption}
            onChange={(e) => onChange({ caption: e.target.value })}
            rows={4}
            className="w-full resize-y rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none transition focus:border-brand-red/60"
          />
          <input
            value={post.hashtags ?? ""}
            onChange={(e) => onChange({ hashtags: e.target.value })}
            placeholder="#hashtags"
            className="w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-xs text-brand-red outline-none transition focus:border-brand-red/60"
          />

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={post.platform}
              onChange={(e) => onChange({ platform: e.target.value })}
              className="rounded-lg border border-border/60 bg-background/60 px-2.5 py-1.5 text-xs font-semibold outline-none"
            >
              <option value="both">Facebook + Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
            </select>

            <label className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/60 px-2.5 py-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <input
                type="datetime-local"
                value={toLocalInput(post.scheduled_for)}
                onChange={(e) => onSchedule(e.target.value)}
                className="bg-transparent text-xs outline-none"
              />
            </label>

            <label className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/60 px-2.5 py-1.5 text-xs text-muted-foreground">
              <Megaphone className="h-3.5 w-3.5" />
              <select
                value={post.campaign_id ?? ""}
                onChange={(e) => onAssignCampaign(e.target.value || null)}
                className="bg-transparent text-xs font-semibold outline-none"
              >
                <option value="">No campaign</option>
                {campaigns.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
              </select>
            </label>

            <label className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/60 px-2.5 py-1.5 text-xs text-muted-foreground">
              <Drama className="h-3.5 w-3.5" />
              <select
                value={post.voice_profile_id ?? ""}
                onChange={(e) => onAssignVoice(e.target.value || null)}
                className="bg-transparent text-xs font-semibold outline-none"
              >
                <option value="">Default persona</option>
                {profiles.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
              </select>
            </label>
          </div>

          <PostVariantsPanel post={post} notify={notify} onUpdated={onChange} />

          {post.error && (
            <div className="flex items-start gap-1.5 rounded-lg border border-destructive/40 bg-destructive/10 px-2.5 py-1.5 text-xs text-destructive">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {post.error}
            </div>
          )}

          {post.posted_at && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-500">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Published on {new Date(post.posted_at).toLocaleString("en-US")}
            </div>
          )}

          <div className="mt-auto flex flex-wrap gap-2 pt-1">
            <button
              onClick={onSave}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-muted-foreground transition hover:bg-accent/40 disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" /> Save
            </button>
            <button
              onClick={() => onRegenerate(true)}
              disabled={busy}
              title="Regenerate text only"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-muted-foreground transition hover:bg-accent/40 disabled:opacity-50"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Regenerate Text
            </button>
            <button
              onClick={() => onRegenerate(false)}
              disabled={busy}
              title="Regenerate text + image"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-muted-foreground transition hover:bg-accent/40 disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5" /> Regenerate
            </button>
            <button
              onClick={onPublish}
              disabled={busy || post.status === "posted"}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-red px-3 py-1.5 text-xs font-bold text-brand-red-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              Publish Now
            </button>
            <button
              onClick={onDelete}
              disabled={busy}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-destructive/40 px-3 py-1.5 text-xs font-bold text-destructive transition hover:bg-destructive/10 disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function StatusBadge({ status }: { status: SocialPost["status"] }) {
  const map = {
    draft: "border-slate-400/40 bg-slate-500/20 text-slate-200",
    pending_review: "border-purple-500/40 bg-purple-500/20 text-purple-300",
    approved: "border-teal-500/40 bg-teal-500/20 text-teal-300",
    rejected: "border-rose-500/40 bg-rose-500/20 text-rose-300",
    scheduled: "border-amber-500/40 bg-amber-500/20 text-amber-300",
    posted: "border-emerald-500/40 bg-emerald-500/20 text-emerald-300",
    failed: "border-destructive/40 bg-destructive/20 text-destructive",
  } as const;
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold backdrop-blur ${map[status]}`}>
      {statusLabel(status)}
    </span>
  );
}

function MediaBadge({ type, count }: { type: SocialPost["media_type"]; count: number }) {
  if (type === "reels" || type === "video") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-brand-red/40 bg-brand-red/20 px-2 py-0.5 text-[10px] font-bold text-brand-red backdrop-blur">
        <Film className="h-3 w-3" /> {type === "reels" ? "Reels" : "Video"}
      </span>
    );
  }
  if (count > 1) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-sky-500/40 bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-300 backdrop-blur">
        <Images className="h-3 w-3" /> {count}
      </span>
    );
  }
  return null;
}

function statusLabel(s: "all" | SocialPost["status"]): string {
  return {
    all: "All",
    draft: "Draft",
    pending_review: "Pending Review",
    approved: "Approved",
    rejected: "Rejected",
    scheduled: "Scheduled",
    posted: "Posted",
    failed: "Failed",
  }[s];
}

function platformLabel(p: PlatformOpt): string {
  return { both: "Both", facebook: "Facebook", instagram: "Instagram" }[p];
}

function toLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60000);
  return local.toISOString().slice(0, 16);
}
