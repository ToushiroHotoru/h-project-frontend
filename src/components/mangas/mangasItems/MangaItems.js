import { Grid } from "@chakra-ui/react";

import MangasLoader from "@/components/mangas/mangasLoader/MangasLoader";
import MangaItemsView from "@/components/mangas//mangasItemsView/MangaItemsView";

import useMangasStore from "@/zustand/mangas.zustand";

export default function MangaItems() {
  const { viewType, mangas } = useMangasStore();

  return (
    <Grid
      my="20px"
      gap={{ base: "15px", md: "20px", lg: "30px" }}
      gridTemplateColumns={{
        base: [viewType === "list" ? "1fr" : "repeat(2,1fr)"],
        md: [viewType === "list" ? "1fr" : "repeat(3,1fr)"],
        lg: [viewType === "list" ? "1fr" : "repeat(4,1fr)"],
      }}
    >
      {!mangas ? <MangasLoader /> : <MangaItemsView />}
    </Grid>
  );
}