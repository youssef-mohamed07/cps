import localFont from "next/font/local";

export const alexandria = localFont({
  src: "../fonts/Alexandria-Variable.ttf",
  variable: "--font-alexandria",
  weight: "100 900",
  display: "swap",
});

export const rootFontClassName = alexandria.variable;
