import typography from "@tailwindcss/typography";

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variableName}) / ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", "[data-theme='dark']"],
  content: ["./src/**/*.{astro,html,js,md,mdx,ts}"],
  theme: {
    extend: {
      colors: {
        canvas: withOpacity("--bg"),
        surface: withOpacity("--surface"),
        "surface-muted": withOpacity("--surface-muted"),
        ink: withOpacity("--ink"),
        "ink-muted": withOpacity("--ink-muted"),
        "ink-faint": withOpacity("--ink-faint"),
        line: withOpacity("--border"),
        accent: withOpacity("--accent"),
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "PingFang SC",
          "Hiragino Sans GB",
          "Noto Sans CJK SC",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "SF Mono",
          "ui-monospace",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            pre: {
              color: false,
              backgroundColor: false,
            },
            code: {
              color: false,
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};
