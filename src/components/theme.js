// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const breakpoints = {
  base: "0px",
  x450: "450px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  x1170: "1170px",
  xl: "1280px",
  x1440: "1440px",
  "2xl": "1536px",
};

// 3. extend the theme
const theme = extendTheme({ config, breakpoints: breakpoints });

export default theme;
