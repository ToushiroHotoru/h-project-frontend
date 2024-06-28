import { useRouter } from "next/router";
import { Grid } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllMangasByFilter } from "@/api/mangas/getMangasByFilter";
import MangasLoader from "@/components/mangas/mangasLoader/MangasLoader";
import MangaItemsView from "@/components/mangas//mangasItemsView/MangaItemsView";

import useMangasStore from "@/zustand/mangas.zustand";
import ErrorDefault from "@/components/errors/errorDefault/errorDefault";
import { useEffect } from "react";

export default function MangaItems() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { viewType } = useMangasStore();
  const pageQuery = router.query.page || 1;
  const sortQuery = router.query.sort || "latest";
  const tagsQuery = router.query.tags || "";
  const { setTotalMangas, setPageOffset, setPageStep } = useMangasStore(
    ({ controls }) => controls
  );
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["mangas", pageQuery, sortQuery, tagsQuery],
    queryFn: () => getAllMangasByFilter(pageQuery, sortQuery, tagsQuery),
  });

  const MangaItemsLayout = mangaItemsLayout({
    mangas: data?.data.mangas,
    isPending,
    isError,
    error,
  });

  useEffect(() => {
    setPageOffset(data?.data.offset);
    setTotalMangas(data?.data.total);
    setPageStep(data?.data.step);
  }, [data?.data]);

  return (
    <Grid
      gap={{ base: "15px", md: "20px" }}
      gridTemplateColumns={{
        base: [
          viewType === "list" ? "1fr" : "repeat(2,1fr)",
          isError ? "1fr" : "repeat(2,1fr)",
        ],
        md: [
          viewType === "list" ? "1fr" : "repeat(3,1fr)",
          isError ? "1fr" : "repeat(3,1fr)",
        ],
        lg: [
          viewType === "list" ? "1fr" : "repeat(4,1fr)",
          isError ? "1fr" : "repeat(4,1fr)",
        ],
      }}
    >
      {MangaItemsLayout}
    </Grid>
  );
}

function mangaItemsLayout({ mangas, isPending, isError, error }) {
  if (isPending) {
    return <MangasLoader />;
  }

  if (isError) {
    return <ErrorDefault code={error.code} message={error.message} />;
  }

  if (mangas && mangas.length) {
    return <MangaItemsView mangas={mangas} />;
  } else {
    return <ErrorDefault code={404} message="Ничего не найдено" />;
  }
}
