import type { Site, SocialObjects } from "./types";
import type { GiscusProps } from "@giscus/react";


export const SITE: Site = {
  website: "https://yeoleobun.github.io/", // replace this with your deployed domain
  author: "L1zz",
  title: "&'static blog",
  desc: "L1zz's blog",
  lightAndDarkMode: true,
  postPerIndex: 10,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/yeoleobun",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Zhihu",
    href: "https://zhihu.com/people/boomdrummer",
    linkTitle: `${SITE.title} on Facebook`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:ezksdo@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Telegram",
    href: "https://t.me/Ezl1zz",
    linkTitle: `${SITE.title} on Telegram`,
    active: true,
  },
];

export const GISCUS: GiscusProps = {
  repo: "yeoleobun/yeoleobun.github.io",
  repoId: "R_kgDOHvKegA",
  category: "Announcements",
  categoryId: "DIC_kwDOHvKegM4CgCXX",
  mapping: "pathname",
  reactionsEnabled: "0",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "en",
  loading: "lazy",
};
