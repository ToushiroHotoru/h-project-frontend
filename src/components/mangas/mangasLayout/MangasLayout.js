import Head from "next/head";
import { Grid, Box } from "@chakra-ui/react";

import Pagination from "../Pagination";
import MangasTop from "@/components/mangas/mangasTop/MangasTop";
import MangaItems from "@/components/mangas/mangasItems/MangaItems";
import MangasAside from "./../mangasAside/MangasAside";

export default function MangasLayout({ tags }) {
  return (
    <>
      <Head>
        <title>Каталог</title>
      </Head>
      <div className="container">
        <Box>
          <MangasTop />
          <Grid
            gridTemplateColumns={{ base: "1fr", xl: "1fr 200px" }}
            gap="16px"
            my="20px"
          >
            <div>
              <MangaItems  />
              <Pagination />
            </div>
            <MangasAside tags={tags} />
          </Grid>
        </Box>
      </div>
    </>
  );
}
