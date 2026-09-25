import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { asset } from "@/lib/asset";
import { SITE_URL } from "@/lib/site";

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
      </body>
    </html>
  );
}
