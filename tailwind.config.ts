import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#346D4D',
        darkgray:'#333D37',
        darkgrey:'#202722',
        lightgray:'#8E9F96',
        secondary:'#FFE7DE',
        dark:'#101213',
        lightgrey:'#8E9F96',
        lightergrey:'rgba(26, 26, 26, 0.5)',
        lightergray:'#1A1A1A',
        suface:'#8E9F96',
        "surface-600":'#6B7F73',
        "dark-400":'#1E1E1E',
        "surface-800":'#333D37',
        "surface-200":"#ECEEED",
        "new":"#F54000"


      },
      boxShadow: {
        'custom-light': '1.02px 1.02px 40.89px 0px rgba(0, 0, 0, 0.05)',
        'custom-dark': '-1.02px -1.02px 40.89px 0px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
export default config;
