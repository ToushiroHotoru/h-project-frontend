import Layout from "../components/Layout";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "../redux/store";
import { Provider } from "react-redux";

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
