const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        "9/16": "56.25%",
      },
      lineHeight: {
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
      },
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.teal,
        gray: colors.neutral,
        pink: "#F6C1DA",
        hpink: "#AE5EF9",
        lpink: "#F0EDFF",
        blue: "#85DFF0",
        turquoise: "#9CC6C3",
        cyan: "#D3E7FE",
        purple: "#6837AF"
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: `${theme("colors.primary.600")} !important`,
              },
              code: { color: theme("colors.primary.400") },
            },
            h1: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.900"),
            },
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.900"),
            },
            h3: {
              fontWeight: "600",
              color: theme("colors.gray.900"),
            },
            "h4,h5,h6": {
              color: theme("colors.gray.900"),
            },
            hr: { borderColor: theme("colors.gray.200") },
            "ol li::marker": {
              fontWeight: "600",
              color: theme("colors.gray.500"),
            },
            "ul li::marker": {
              backgroundColor: theme("colors.gray.500"),
            },
            strong: { color: theme("colors.gray.600") },
            blockquote: {
              color: theme("colors.gray.900"),
              borderLeftColor: theme("colors.gray.200"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: `${theme("colors.primary.400")} !important`,
              },
              code: { color: theme("colors.primary.400") },
            },
            h1: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.100"),
            },
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.100"),
            },
            h3: {
              fontWeight: "600",
              color: theme("colors.gray.100"),
            },
            "h4,h5,h6": {
              color: theme("colors.gray.100"),
            },
            hr: { borderColor: theme("colors.gray.700") },
            "ol li::marker": {
              fontWeight: "600",
              color: theme("colors.gray.400"),
            },
            "ul li::marker": {
              backgroundColor: theme("colors.gray.400"),
            },
            strong: { color: theme("colors.gray.100") },
            thead: {
              th: {
                color: theme("colors.gray.100"),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
            blockquote: {
              color: theme("colors.gray.100"),
              borderLeftColor: theme("colors.gray.700"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
