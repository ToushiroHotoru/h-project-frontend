import "swiper/css";
import "swiper/css/navigation";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

import "@/styles/globals.css";
import { store } from "@/redux/store";
import Layout from "@/components/layout/Layout";
import theme from "@/components/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
