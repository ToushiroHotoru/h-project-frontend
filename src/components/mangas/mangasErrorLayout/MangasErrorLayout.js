import Head from "next/head";
import MangasTop from "@/components/mangas/mangasTop/MangasTop";
import ErrorDefault from "@/components/errors/errorDefault/errorDefault";
import { Box } from "@chakra-ui/react";

export default function MangasErrorLayout({ code, message }) {
  return (
    <>
      <Head>
        <title>Каталог</title>
      </Head>
      <div className="container">
        <Box height="full" position="relative">
          <ErrorDefault code={code} message={message} />
        </Box>
      </div>
    </>
  );
}
