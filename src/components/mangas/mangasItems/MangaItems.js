import { Grid } from "@chakra-ui/react";

import MangasLoader from "@/components/mangas/mangasLoader/MangasLoader";
import MangaItemsView from "@/components/mangas//mangasItemsView/MangaItemsView";

import useMangasStore from "@/zustand/mangas.zustand";
import Custom404 from "@/pages/404";

export default function MangaItems() {
  const { viewType, mangas, isMangasLoading } = useMangasStore();

  return (
    <Grid
      gap={{ base: "15px", md: "20px" }}
      gridTemplateColumns={
        !isMangasLoading && mangas && !mangas.length
          ? {
              base: "1fr",
            }
          : {
              base: [viewType === "list" ? "1fr" : "repeat(2,1fr)"],
              md: [viewType === "list" ? "1fr" : "repeat(3,1fr)"],
              lg: [viewType === "list" ? "1fr" : "repeat(4,1fr)"],
            }
      }
    >
      {isMangasLoading ? (
        <MangasLoader />
      ) : !isMangasLoading && mangas && !mangas.length ? (
        <Custom404 />
      ) : (
        <MangaItemsView />
      )}
    </Grid>
  );
}
