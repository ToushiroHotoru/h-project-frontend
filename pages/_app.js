import Layout from "../components/Layout";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider initialColorMode={theme.config.initialColorMode}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
