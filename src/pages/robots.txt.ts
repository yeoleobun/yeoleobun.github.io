import type { APIRoute } from "astro";
import { SITE } from "@/site";

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site ?? SITE.url).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapURL}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
