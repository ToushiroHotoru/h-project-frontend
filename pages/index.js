// import { useColorMode } from "@chakra-ui/react";
import Head from "next/head";

export default function Index() {
  // const { toggleColorMode } = useColorMode();
  return (
    <div className="container">
      <Head>
        <title>Главная</title>
      </Head>
      {/* <h1>Index page</h1>
      <button onClick={toggleColorMode}>Toggle color mode</button> */}
    </div>
  );
}
