import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { LanguageProvider, GlobalLangToggle } from "@/i18n/LanguageProvider";
import { GlobalClickTracker } from "@/lib/GlobalClickTracker";
import { GoogleAdsLoader } from "@/components/GoogleAdsLoader";
import { buildLocalBusinessSchema } from "@/data/business";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Sayfa bulunamadı</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Aşağıdaki bağlantılardan
          devam edebilir ya da 7/24 acil hattımızı arayabilirsiniz.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ana Sayfa
          </Link>
          <Link
            to="/hizmetler"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Hizmetler
          </Link>
          <Link
            to="/tesisatci"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Bölgeler
          </Link>
          <Link
            to="/acil-tesisatci"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Acil Tesisatçı
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Sayfa yüklenemedi
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Bir sorun oluştu. Sayfayı yenileyebilir veya ana sayfaya dönebilirsiniz.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tekrar dene
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Ana Sayfa
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#06080d" },
      { title: "Gölge Tesisat — İstanbul 7/24 Acil Tesisatçı" },
      { name: "description", content: "Gölge Tesisat: İstanbul'da 7/24 acil tesisatçı. Su kaçağı tespiti, tıkanıklık açma, kombi ve petek servisi. Ortalama 30 dakikada kapınızda." },
      { name: "author", content: "Gölge Tesisat" },
      { name: "google-site-verification", content: "Is4zK_LQ4IqVqNXqu0aacaPhD2IUk83VgeKKgXDEIFs" },
      { property: "og:site_name", content: "Gölge Tesisat" },
      { property: "og:title", content: "Gölge Tesisat — İstanbul 7/24 Acil Tesisatçı" },
      { property: "og:description", content: "İstanbul'da 7/24 acil tesisatçı: su kaçağı, tıkanıklık, kombi ve petek servisi. Ortalama 30 dakikada kapınızda." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:image", content: "https://golgetesisat.com/og-image.jpg?w=1200&h=630" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:alt", content: "Gölge Tesisat — İstanbul 7/24 acil tesisatçı" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gölge Tesisat — İstanbul 7/24 Acil Tesisatçı" },
      { name: "twitter:description", content: "İstanbul'da 7/24 acil tesisatçı: su kaçağı, tıkanıklık, kombi ve petek servisi." },
      { name: "twitter:image", content: "https://golgetesisat.com/og-image.jpg?w=1200&h=628" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(buildLocalBusinessSchema()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Gölge Tesisat",
          url: "https://golgetesisat.com",
          inLanguage: "tr-TR",
          publisher: { "@id": "https://golgetesisat.com/#organization" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://golgetesisat.com/#organization",
          name: "Gölge Tesisat",
          url: "https://golgetesisat.com",
          logo: "https://golgetesisat.com/og-image.jpg",
          image: "https://golgetesisat.com/og-image.jpg",
          telephone: "+905338960503",
          areaServed: "İstanbul",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+905338960503",
            contactType: "customer service",
            availableLanguage: ["Turkish"],
            areaServed: "TR",
          },
          sameAs: ["https://wa.me/905338960503"],
        }),
      },
      {
        type: "text/javascript",
        children: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "x9le6ra71l");`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  // These pages already render their own inline TR/EN toggle in their header,
  // so hide the global floating one there to avoid a duplicate / overlap.
  const hasOwnToggle = location.pathname === "/" || location.pathname.startsWith("/google-ads");

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {!isAdmin && !hasOwnToggle && <GlobalLangToggle />}
        {!isAdmin && <GlobalClickTracker />}
        {!isAdmin && <GoogleAdsLoader />}
        {!isAdmin && <GA4Tracker />}
        <Outlet />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
