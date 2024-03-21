import "swiper/css";
import "swiper/css/navigation";
import { ChakraProvider } from "@chakra-ui/react";

import "@/styles/globals.css";

import theme from "@/components/theme";
import Layout from "@/components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
