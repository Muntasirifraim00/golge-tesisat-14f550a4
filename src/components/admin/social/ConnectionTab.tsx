import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Loader2, Plug, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { checkMetaConnection, type MetaConnectionStatus } from "@/lib/social.functions";

export function ConnectionTab({ notify }: { notify: (kind: "ok" | "err", msg: string) => void }) {
  const check = useServerFn(checkMetaConnection);
  const [status, setStatus] = useState<MetaConnectionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setStatus(await check());
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Could not check");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ready = status?.hasPageToken && !status?.error;

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold">
          <Plug className="h-4 w-4 text-brand-red" /> Meta Connection
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-bold text-muted-foreground transition hover:border-brand-red/40 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />} Recheck
        </button>
      </div>

      {loading && <div className="h-40 animate-pulse rounded-2xl border border-border/60 bg-card/50" />}

      {!loading && status && (
        <>
          <div
            className={`rounded-2xl border p-4 ${
              ready ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-bold">
              {ready ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : (
                <XCircle className="h-5 w-5 text-amber-500" />
              )}
              {ready ? "Ready for publishing" : "Token pending"}
            </div>
            {status.pageName && (
              <p className="mt-1 text-sm text-muted-foreground">
                Connected page: <span className="font-semibold text-foreground">{status.pageName}</span>
              </p>
            )}
            {status.error && <p className="mt-1 text-sm text-destructive">{status.error}</p>}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <StatusRow label="Facebook Page Token" ok={status.hasPageToken} />
            <StatusRow label="Instagram Business Account ID" ok={status.hasInstagramId} />
          </div>

          {!ready && (
            <div className="rounded-xl border border-border/60 bg-card/40 p-4 text-sm text-muted-foreground space-y-4">
              <p className="font-semibold text-foreground">To complete the connection, follow these exact steps:</p>

              <div className="space-y-3">
                <details className="group rounded-lg border border-border/40 bg-background/30">
                  <summary className="flex cursor-pointer items-center gap-2 p-3 text-sm font-semibold text-foreground">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-red/15 text-[10px] font-bold text-brand-red">1</span>
                    Create a Meta App
                    <svg className="ml-auto h-4 w-4 transition group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <div className="px-3 pb-3 text-xs text-muted-foreground space-y-1.5">
                    <p>• Go to <a href="https://developers.facebook.com/apps/" target="_blank" rel="noreferrer" className="text-brand-red underline">developers.facebook.com/apps</a></p>
                    <p>• Click <strong>"Create App"</strong> (blue button top-right)</p>
                    <p>• Select use case: <strong>"Other"</strong> → click <strong>"Next"</strong></p>
                    <p>• Select app type: <strong>"Business"</strong> → click <strong>"Next"</strong></p>
                    <p>• Enter app name: <code className="rounded bg-muted px-1 py-0.5 text-[10px]">GolgeTesisatStudio</code></p>
                    <p>• Choose an app purpose (e.g. "Manage my business") → click <strong>"Create App"</strong></p>
                    <p>• Complete any security check (reCAPTCHA) if shown</p>
                  </div>
                </details>

                <details className="group rounded-lg border border-border/40 bg-background/30">
                  <summary className="flex cursor-pointer items-center gap-2 p-3 text-sm font-semibold text-foreground">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-red/15 text-[10px] font-bold text-brand-red">2</span>
                    Add Facebook Login & Pages API
                    <svg className="ml-auto h-4 w-4 transition group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <div className="px-3 pb-3 text-xs text-muted-foreground space-y-1.5">
                    <p>• On the app dashboard, click <strong>"Add Product"</strong> in the left sidebar</p>
                    <p>• Find <strong>"Facebook Login"</strong> → click <strong>"Set Up"</strong></p>
                    <p>• Go back to <strong>"Add Product"</strong></p>
                    <p>• Find <strong>"Pages API"</strong> under "Marketing" or search "Page" → click <strong>"Set Up"</strong></p>
                    <p>• You will now see both products in your left sidebar under "Products"</p>
                  </div>
                </details>

                <details className="group rounded-lg border border-border/40 bg-background/30">
                  <summary className="flex cursor-pointer items-center gap-2 p-3 text-sm font-semibold text-foreground">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-red/15 text-[10px] font-bold text-brand-red">3</span>
                    Connect Your Facebook Page
                    <svg className="ml-auto h-4 w-4 transition group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <div className="px-3 pb-3 text-xs text-muted-foreground space-y-1.5">
                    <p>• Open the <a href="https://developers.facebook.com/tools/explorer/" target="_blank" rel="noreferrer" className="text-brand-red underline">Graph API Explorer</a></p>
                    <p>• In the top-right dropdown, select your newly created app</p>
                    <p>• Click <strong>"Generate Access Token"</strong></p>
                    <p>• A permissions popup appears — check these boxes:</p>
                    <ul className="list-disc pl-5 space-y-0.5">
                      <li><code className="rounded bg-muted px-1 py-0.5 text-[10px]">pages_manage_posts</code></li>
                      <li><code className="rounded bg-muted px-1 py-0.5 text-[10px]">pages_read_engagement</code></li>
                      <li><code className="rounded bg-muted px-1 py-0.5 text-[10px]">instagram_basic</code></li>
                      <li><code className="rounded bg-muted px-1 py-0.5 text-[10px]">instagram_content_publish</code></li>
                    </ul>
                    <p>• Choose the Facebook Page you want to connect</p>
                    <p>• Click <strong>"Done"</strong> then <strong>"OK"</strong></p>
                  </div>
                </details>

                <details className="group rounded-lg border border-border/40 bg-background/30">
                  <summary className="flex cursor-pointer items-center gap-2 p-3 text-sm font-semibold text-foreground">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-red/15 text-[10px] font-bold text-brand-red">4</span>
                    Get the Permanent Page Token
                    <svg className="ml-auto h-4 w-4 transition group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <div className="px-3 pb-3 text-xs text-muted-foreground space-y-1.5">
                    <p>• In Graph API Explorer, make sure your app is selected</p>
                    <p>• In the access token dropdown, pick <strong>"Page Access Token"</strong> (not User token)</p>
                    <p>• Select your page from the list</p>
                    <p>• Click the blue <strong>copy icon</strong> next to the token field to copy it</p>
                    <p>• Paste it somewhere safe — this is your <strong>META_PAGE_ACCESS_TOKEN</strong></p>
                    <p className="text-amber-500">⚠️ Never share this token publicly. Treat it like a password.</p>
                  </div>
                </details>

                <details className="group rounded-lg border border-border/40 bg-background/30">
                  <summary className="flex cursor-pointer items-center gap-2 p-3 text-sm font-semibold text-foreground">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-red/15 text-[10px] font-bold text-brand-red">5</span>
                    Get Instagram Business Account ID
                    <svg className="ml-auto h-4 w-4 transition group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <div className="px-3 pb-3 text-xs text-muted-foreground space-y-1.5">
                    <p>• In Graph API Explorer, set the query to:</p>
                    <code className="block rounded bg-muted px-2 py-1.5 text-[10px]">me?fields=instagram_business_account&#123;id&#125;</code>
                    <p>• Click <strong>"Submit"</strong></p>
                    <p>• Look for the JSON response. Find the <code className="rounded bg-muted px-1 py-0.5 text-[10px]">id</code> inside <code className="rounded bg-muted px-1 py-0.5 text-[10px]">instagram_business_account</code></p>
                    <p>• Copy that number — this is your <strong>META_INSTAGRAM_BUSINESS_ID</strong></p>
                    <p className="text-muted-foreground italic">Example: 17841400000000000</p>
                  </div>
                </details>

                <details className="group rounded-lg border border-border/40 bg-background/30">
                  <summary className="flex cursor-pointer items-center gap-2 p-3 text-sm font-semibold text-foreground">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-red/15 text-[10px] font-bold text-brand-red">6</span>
                    Submit Tokens to Studio
                    <svg className="ml-auto h-4 w-4 transition group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <div className="px-3 pb-3 text-xs text-muted-foreground space-y-1.5">
                    <p>• Copy your <strong>Page Access Token</strong> and <strong>Instagram Business ID</strong></p>
                    <p>• Paste both values in the chat and tell me: <em>"Here are my tokens"</em></p>
                    <p>• I will securely store them as <code className="rounded bg-muted px-1 py-0.5 text-[10px]">META_PAGE_ACCESS_TOKEN</code> and <code className="rounded bg-muted px-1 py-0.5 text-[10px]">META_INSTAGRAM_BUSINESS_ID</code></p>
                    <p>• Then click <strong>"Recheck"</strong> above — both lights should turn green ✅</p>
                  </div>
                </details>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function StatusRow({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/40 px-3.5 py-3 text-sm">
      {ok ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-muted-foreground" />}
      <span className={ok ? "font-semibold" : "text-muted-foreground"}>{label}</span>
      <span className={`ml-auto text-xs font-bold ${ok ? "text-emerald-500" : "text-muted-foreground"}`}>
        {ok ? "Present" : "Missing"}
      </span>
    </div>
  );
}
