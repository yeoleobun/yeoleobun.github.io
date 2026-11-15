import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export interface NormalizedTag {
  slug: string;
  label: string;
}

const ASCII_LABEL_MAP: Record<string, string> = {
  java: "Java",
  linux: "Linux",
  rust: "Rust",
};

const CJK_CHAR_RE = /[\u4e00-\u9fff\u3400-\u4dbf]/g;

export function normalizeTagToken(raw: string): NormalizedTag | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const isAscii = /^[\x20-\x7e]+$/.test(trimmed);
  if (isAscii) {
    const lower = trimmed.toLowerCase();
    const slug = lower.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (!slug) return null;
    return {
      slug,
      label: ASCII_LABEL_MAP[lower] ?? trimmed,
    };
  }

  return {
    slug: trimmed,
    label: trimmed,
  };
}

export function extractPostTags(rawTags: string[] = []): NormalizedTag[] {
  const seen = new Set<string>();
  const result: NormalizedTag[] = [];

  for (const entry of rawTags) {
    for (const part of entry.split(/[,，]/)) {
      const normalized = normalizeTagToken(part);
      if (normalized && !seen.has(normalized.slug)) {
        seen.add(normalized.slug);
        result.push(normalized);
      }
    }
  }

  return result;
}

export function getTagHref(slug: string): string {
  return `/tags/${encodeURIComponent(slug)}/`;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort((a, b) => {
    const aTime = (a.data.modDatetime ?? a.data.pubDatetime).getTime();
    const bTime = (b.data.modDatetime ?? b.data.pubDatetime).getTime();
    return bTime - aTime;
  });
}

export interface TagGroup {
  slug: string;
  label: string;
  count: number;
  posts: BlogPost[];
}

export function getAllTagGroups(posts: BlogPost[]): TagGroup[] {
  const map = new Map<string, TagGroup>();

  for (const post of posts) {
    for (const tag of extractPostTags(post.data.tags)) {
      const existing = map.get(tag.slug);
      if (existing) {
        existing.count += 1;
        existing.posts.push(post);
      } else {
        map.set(tag.slug, {
          slug: tag.slug,
          label: tag.label,
          count: 1,
          posts: [post],
        });
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.label.localeCompare(b.label, "zh-Hans-CN");
  });
}

export function formatDateISO(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function getPostYear(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
  }).format(date);
}

export function estimateReadingTime(body: string): string {
  const stripped = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/\$[^$\n]+\$/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*`~_-]/g, " ");

  const cjkMatches = stripped.match(CJK_CHAR_RE);
  const cjkCount = cjkMatches ? cjkMatches.length : 0;

  const nonCjk = stripped.replace(CJK_CHAR_RE, " ").trim();
  const wordCount = nonCjk ? nonCjk.split(/\s+/).length : 0;

  const minutes = Math.max(1, Math.ceil((cjkCount + wordCount) / 300));
  return `${minutes} min read`;
}
