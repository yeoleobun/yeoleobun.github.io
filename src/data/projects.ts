import type { ImageMetadata } from "astro";
import quotaIcon from "@assets/projects/quota-icon.png";
import quotaScreenshot from "@assets/projects/quota-screenshot.png";
import groveIcon from "@assets/projects/grove-icon.png";
import groveScreenshot from "@assets/projects/grove-screenshot.png";

export interface ProjectFeature {
  title: string;
  description: string;
  codeHint?: string;
}

export interface ProjectInstallOption {
  title: string;
  badge?: string;
  description: string;
  code: string;
}

export interface Project {
  slug: "quota" | "grove";
  name: string;
  version: string;
  accent: "amber" | "emerald";
  layout: "popover" | "landscape";
  subtitle: string;
  tagline: string;
  platform: string;
  stack: string[];
  repoUrl: string;
  releaseUrl: string;
  dmgName: string;
  icon: ImageMetadata;
  screenshot: ImageMetadata;
  screenshotAlt: string;
  quickInstall: {
    homebrew: string;
    curl: string;
  };
  highlights: string[];
  fullInstall: ProjectInstallOption[];
  features: ProjectFeature[];
  prerequisites: string[];
  buildCommands: string;
  testCommand: string;
  notes?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "quota",
    name: "Quota",
    version: "v0.2.0",
    accent: "amber",
    layout: "popover",
    subtitle: "macOS Menu Bar Quota Monitor",
    tagline:
      "A lightweight, native macOS menu bar indicator for OpenAI Codex and Google Antigravity subscription usage and reset countdowns.",
    platform: "macOS 26.0+ · Apple Silicon",
    stack: ["Swift", "AppKit", "NSMenu"],
    repoUrl: "https://github.com/yeoleobun/Quota",
    releaseUrl: "https://github.com/yeoleobun/Quota/releases/latest",
    dmgName: "Quota-macos-arm64.dmg",
    icon: quotaIcon,
    screenshot: quotaScreenshot,
    screenshotAlt:
      "Quota native macOS menu bar popover showing OpenAI Codex and Google Antigravity usage rings and reset timers",
    quickInstall: {
      homebrew: "brew tap yeoleobun/tap && brew install --cask yeoleobun/tap/quota",
      curl: "curl -fsSL https://raw.githubusercontent.com/yeoleobun/Quota/main/scripts/install.sh | zsh",
    },
    highlights: [
      "Genuine AppKit NSMenu with native macOS translucency, hover-to-peek, and click-to-pin",
      "Monochrome menu bar icon with Green / Yellow / Red weekly quota watermark dot",
      "Zero credentials stored — reads local codex and agy sessions with serverless updates",
    ],
    fullInstall: [
      {
        title: "Homebrew",
        badge: "Recommended · No Gatekeeper Warning",
        description:
          "Tap yeoleobun/tap once, trust the tap, and install the signed/unquarantined cask directly into /Applications.",
        code: `brew tap yeoleobun/tap\nbrew trust yeoleobun/tap 2>/dev/null || true\nbrew install --cask yeoleobun/tap/quota`,
      },
      {
        title: "One-Line Terminal Installer",
        description:
          "Downloads the latest Apple Silicon release archive, verifies checksums, removes quarantine attributes, and launches Quota.",
        code: `curl -fsSL https://raw.githubusercontent.com/yeoleobun/Quota/main/scripts/install.sh | zsh`,
      },
      {
        title: "Manual .dmg Download",
        description:
          "Download Quota-macos-arm64.dmg from the latest GitHub Release, drag Quota.app to /Applications, and clear quarantine once before first launch.",
        code: `xattr -cr /Applications/Quota.app\nopen /Applications/Quota.app`,
      },
    ],
    features: [
      {
        title: "Native macOS Menu (NSMenu)",
        description:
          "Built directly on AppKit's statusItem.menu so backdrop translucency, section headers, badges, checkmarks, and hover highlights feel indistinguishable from macOS system menus.",
      },
      {
        title: "Weekly Watermark Status Dot",
        description:
          "Displays a monochrome template wheat-beer glass icon in the menu bar with an optional Green (>25% remaining), Yellow (11%–25%), or Red (<=10%) corner watermark.",
      },
      {
        title: "Hover or Click to Reveal",
        description:
          "Hover over the menu bar item to glance at remaining percentages, ring gauges, and reset timers — move your cursor away to auto-dismiss, or click to pin it open.",
      },
      {
        title: "Zero Credentials Stored",
        description:
          "Reads live quota directly from your existing local CLI sessions (codex app-server --stdio and ~/.local/bin/agy /usage) with resilient cached fallback and automatic login-shell PATH resolution.",
        codeHint: "~/.config/quota/settings.json",
      },
      {
        title: "Serverless In-App Self-Update",
        description:
          "Polls GitHub Releases (releases/latest) in the background and surfaces a 1-click Update menu item that SHA-256 verifies, unquarantines, swaps Quota.app, and relaunches.",
      },
    ],
    prerequisites: [
      "macOS 26.0+ on Apple Silicon (arm64)",
      "OpenAI Codex: standalone codex CLI, Codex.app, or ChatGPT.app",
      "Google Antigravity: agy CLI installed and signed in locally",
    ],
    buildCommands: `./scripts/build-app.sh\nopen dist/Quota.app`,
    testCommand: "swift test",
    notes:
      "GUI menu bar apps don't inherit interactive .zshrc PATH additions, so Quota resolves codex and agy across ~/.config/quota/settings.json overrides, login shell PATH, Homebrew/Mise/NVM shims, and bundled app runtimes.",
  },
  {
    slug: "grove",
    name: "Grove",
    version: "v0.1.0",
    accent: "emerald",
    layout: "landscape",
    subtitle: "macOS Git Worktree & Branch Dashboard",
    tagline:
      "A lightweight, native macOS dashboard for managing Git worktrees and local branches — surfacing merged checkouts, idle commits, and orphaned detached HEADs at a glance.",
    platform: "macOS 26.0+ · Apple Silicon",
    stack: ["Swift", "SwiftUI", "Liquid Glass", "Git"],
    repoUrl: "https://github.com/yeoleobun/Grove",
    releaseUrl: "https://github.com/yeoleobun/Grove/releases/latest",
    dmgName: "Grove-macos-arm64.dmg",
    icon: groveIcon,
    screenshot: groveScreenshot,
    screenshotAlt:
      "Grove native SwiftUI macOS dashboard showing repository sidebar, branch merge badges, idle timers, and linked worktrees",
    quickInstall: {
      homebrew: "brew tap yeoleobun/tap && brew install --cask yeoleobun/tap/grove",
      curl: "curl -fsSL https://raw.githubusercontent.com/yeoleobun/Grove/main/scripts/install.sh | zsh",
    },
    highlights: [
      "Unified single-page repository view showing primary checkout, branches, and linked worktrees",
      "100% deterministic Git tags: Merged, Squash-merged, idle Nd, Detached, Orphaned, origin gone",
      "Worktree-scoped editor & terminal launchers, safe rescue refs, and 0% idle CPU usage",
    ],
    fullInstall: [
      {
        title: "Homebrew",
        badge: "Recommended · No Gatekeeper Warning",
        description:
          "Install via the shared yeoleobun/tap cask formula with zero manual quarantine steps.",
        code: `brew tap yeoleobun/tap\nbrew trust yeoleobun/tap 2>/dev/null || true\nbrew install --cask yeoleobun/tap/grove`,
      },
      {
        title: "One-Line Terminal Installer",
        description:
          "Fetches the latest release bundle, verifies SHA-256 integrity, clears quarantine flags, and installs Grove.app.",
        code: `curl -fsSL https://raw.githubusercontent.com/yeoleobun/Grove/main/scripts/install.sh | zsh`,
      },
      {
        title: "Manual .dmg Download",
        description:
          "Download Grove-macos-arm64.dmg from the latest GitHub Release, drag Grove.app into /Applications, and clear quarantine once.",
        code: `xattr -cr /Applications/Grove.app\nopen /Applications/Grove.app`,
      },
    ],
    features: [
      {
        title: "Unified Single-Page Repository View",
        description:
          "Displays your primary checkout (main worktree) and Branches first, followed by linked Worktrees — zero tab switching or noisy commit-graph clutter.",
      },
      {
        title: "100% Deterministic Git Tags",
        description:
          "Every status badge reflects pure Git truth against your integration target: Merged, Squash-merged, idle Nd (>=14d), Detached, Orphaned, N uncommitted, Conflict, ↑N unpushed, and origin gone.",
      },
      {
        title: "Worktree-Scoped Editor & Terminal Launchers",
        description:
          "Open any individual worktree folder directly in VS Code, Cursor, Zed, Windsurf, Antigravity, Xcode, Terminal, iTerm, Ghostty, or Warp.",
      },
      {
        title: "Safe Cleanup & Rescue Refs",
        description:
          "Re-verifies working-tree status, untracked/ignored files, locks, and commit ancestry before removal. Optional Preserve commits writes recovery refs under refs/grove/rescued/<id>.",
        codeHint: "git for-each-ref refs/grove/rescued/",
      },
      {
        title: "Zero Background Polling",
        description:
          "Consumes 0% CPU when closed or idle and refreshes repositories in ~0.2s automatically whenever you open or focus the Dashboard window.",
      },
      {
        title: "Serverless In-App Self-Update",
        description:
          "Checks GitHub Releases (releases/latest) and surfaces a 1-click Update action across the sidebar, menu bar, and Settings with SHA-256 verification and automatic relaunch.",
      },
    ],
    prerequisites: [
      "macOS 26.0+ on Apple Silicon (arm64)",
      "git installed on PATH (Xcode Command Line Tools or Homebrew)",
    ],
    buildCommands: `make test\nmake app\nopen dist/Grove.app`,
    testCommand: "make test",
    notes:
      "Scan folders and editor/terminal preferences are stored locally in ~/Library/Application Support/Grove/config.json.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
