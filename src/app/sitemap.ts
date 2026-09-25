import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const ROUTES = ["", "/who-we-are/", "/why-us/", "/contact/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    changeFrequency: "monthly",
    priority: path ? 0.7 : 1,
  }));
}
