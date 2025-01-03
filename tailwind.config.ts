import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import phosphorIcons from "phosphor-icons-tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    //* ----- WHITESPACE SYSTEM -----
    spacing: {
      0: "0",
      1: "0.1rem",
      2: "0.2rem",
      4: "0.4rem",
      8: "0.8rem",
      12: "1.2rem",
      16: "1.6rem",
      24: "2.4rem",
      32: "3.2rem",
      48: "4.8rem",
      64: "6.4rem",
      80: "8rem",
      96: "9.6rem",
      128: "12.8rem",
    },

    //* ----- BORDER RADIUS SYSTEM -----
    borderRadius: {
      0: "0",
      1: "0.1rem",
      2: "0.2rem",
      4: "0.4rem",
      8: "0.8rem",
      12: "1.2rem",
      16: "1.6rem",
      24: "2.4rem",
      32: "3.2rem",
      48: "4.8rem",
      64: "6.4rem",
      80: "8rem",
      96: "9.6rem",
      128: "12.8rem",
      full: "9999px",
    },

    //* ----- TYPOGRAPHY SYSTEM -----
    fontSize: {
      10: "1rem",
      12: "1.2rem",
      14: "1.4rem",
      16: "1.6rem",
      18: "1.8rem",
      20: "2rem",
      24: "2.4rem",
      30: "3rem",
      36: "3.6rem",
      44: "4.4rem",
      52: "5.2rem",
      62: "6.2rem",
      74: "7.4rem",
      86: "8.6rem",
      98: "9.8rem",
    },
    lineHeight: {
      DEFAULT: "1",
      sm: "1.25",
      md: "1.375",
      lg: "1.5",
      xl: "1.625",
      "2xl": "2",
    },
    extend: {
      colors: {
        "deep-space-1": "#011627",
        "deep-space-2": "#010f1b",
        "light-blue": "rgb(184, 243, 255)",
        violet: "rgb(168, 130, 221)",
        turquioise: "rgb(100, 220, 255)",
        "crayon-red": "rgb(232, 49, 81)",
        "crayon-red-hover": "#d12c49",
        "crayon-red-active": "#ba2741",
        vanilla: "rgb(248, 244, 166)",
        mindaro: "rgb(219, 254, 135)",
      },
      rotate: {
        360: "360deg",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      addUtilities({
        // * ----- SCROLLBAR -----
        ".scrollbar::-webkit-scrollbar": {
          width: theme("spacing.4"),
          height: theme("spacing.4"),
        },
        ".scrollbar::-webkit-scrollbar-track": {
          backgroundColor: theme("colors.white"),
        },
        ".scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: theme("colors.gray.300"),
          borderRadius: theme("borderRadius.full"),
        }, // * ----- NO SCROLLBAR -----
        ".no-scrollbar::-webkit-scrollbar": {
          width: theme("spacing.0"),
          height: theme("spacing.0"),
        },
        ".no-scrollbar": {
          // IE and Edge.
          "-ms-overflow-style": "none", // Firefox.
          "scrollbar-width": "none",
        },
      });
    }),
    phosphorIcons(),
    nextui(),
  ],
} satisfies Config;
