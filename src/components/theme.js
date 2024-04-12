import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const breakpoints = {
  base: "0px",
  x450: "28rem",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  x1170: "1170px",
  xl: "1280px",
  x1440: "1440px",
  "2xl": "1536px",
};

const theme = extendTheme({ config, breakpoints: breakpoints });

export default theme;
