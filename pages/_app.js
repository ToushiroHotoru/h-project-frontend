import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { store } from "../redux/store";

function MyApp({ Component, pageProps }) {

  return (
    <ChakraProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
