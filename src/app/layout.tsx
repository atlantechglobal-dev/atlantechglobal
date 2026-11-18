import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { asset } from "@/lib/asset";
import { SITE_URL } from "@/lib/site";
import Script from "next/script";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Atlantech Global — Your AI-Ready Technology & Consulting Partner",
    template: "%s | Atlantech Global",
  },
  description:
    "Leading IT Solutions Company delivering AI, Digital Transformation, and Product Engineering worldwide.",
  applicationName: "Atlantech Global",
  openGraph: {
    type: "website",
    siteName: "Atlantech Global",
    locale: "en_IN",
    images: [{ url: "/images/who-are-we.webp", width: 1600, height: 1200, alt: "Atlantech Global" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7c3aed",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Atlantech Global",
  url: SITE_URL,
  logo: `${SITE_URL}/images/attm.webp`,
  email: "hello@atlantechglobal.com",
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+91-73871-40440", contactType: "sales", areaServed: "IN" },
    { "@type": "ContactPoint", telephone: "+965-6685-8781", contactType: "sales", areaServed: "KW" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jakarta.variable} data-scroll-behavior="smooth">
      <head>
        <link rel="preload" as="image" href={asset("/images/attm.webp")} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
                {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1PYPM922K1" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1PYPM922K1');`}
        </Script>

        {/* Mixpanel */}
        <Script id="mixpanel" strategy="afterInteractive">
          {`(function (e, c) {
      if (!c.__SV) {
        var l, h; window.mixpanel = c; c._i = []; c.init = function (q, r, f) {
          function t(d, a) { var g = a.split("."); 2 == g.length && (d = d[g[0]], a = g[1]); d[a] = function () { d.push([a].concat(Array.prototype.slice.call(arguments, 0))) } } var b = c; "undefined" !== typeof f ? b = c[f] = [] : f = "mixpanel"; b.people = b.people || []; b.toString = function (d) { var a = "mixpanel"; "mixpanel" !== f && (a += "." + f); d || (a += " (stub)"); return a }; b.people.toString = function () { return b.toString(1) + ".people (stub)" }; l = "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders start_session_recording stop_session_recording people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
          for (h = 0; h < l.length; h++)t(b, l[h]); var n = "set set_once union unset remove delete".split(" "); b.get_group = function () { function d(p) { a[p] = function () { b.push([g, [p].concat(Array.prototype.slice.call(arguments, 0))]) } } for (var a = {}, g = ["get_group"].concat(Array.prototype.slice.call(arguments, 0)), m = 0; m < n.length; m++)d(n[m]); return a }; c._i.push([q, r, f])
        }; c.__SV = 1.2; var k = e.createElement("script"); k.type = "text/javascript"; k.async = !0; k.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" ===
          e.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"; e = e.getElementsByTagName("script")[0]; e.parentNode.insertBefore(k, e)
      }
    })(document, window.mixpanel || []);

    mixpanel.init('961262238a357d1a35cfe5b38b7ee4cb', {
      autocapture: true,
      record_sessions_percent: 100,
    });`}
        </Script>

      </body>
    </html>
  );
}
