import type { CollectionEntry } from "astro:content";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts
    .sort(
      (a, b) =>
        b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime()
    );
};

export default getSortedPosts;
