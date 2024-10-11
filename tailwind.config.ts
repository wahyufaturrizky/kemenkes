import type { Config } from "tailwindcss";

const { colors: defaultColors } = require("tailwindcss/colors");

const colors = {
  ...defaultColors,
  transparent: "transparent",
  current: "currentColor",
  primary: "#00B1A9",
  secondary: "#D2DC00",
  "primary-1": "#004744",
  "primary-2": "#006661",
  "primary-3": "#008C86",
  "secondary-1": "#EDF199",
  "secondary-2": "#FEFAFF",
  "third-1": "#9093A2",
  "third-2": "#001211",
  "third-3": "#424242",
  success: "#86CB3C",
  "support-a1": "#B29EFC",
  "support-a2": "#4527B0",
  "support-b1": "#EE8EFF",
  "support-b2": "#9C27B0",
  "support-c1": "#FF8E9E",
  "support-c2": "#FF5252",
  "support-d1": "#FFCC8E",
  "support-d2": "#FB8C00",
  "support-e1": "#8ECCFF",
  "support-e2": "#2196F3",
};

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        "plus-jakarta-sans": ['"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: colors,
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
