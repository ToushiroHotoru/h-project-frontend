import MangaTile from "@/components/mangas/mangaTile/MangaTile";
import MangaList from "@/components/mangas/mangaList/MangaList";

import useMangasStore from "@/zustand/mangas.zustand";

export default function MangaItemsView({ mangas }) {
  const { viewType } = useMangasStore();
  return (
    <>
      {mangas &&
        mangas.map((item, i) => {
          return viewType === "list" ? (
            <MangaList data={item} key={i + 1} />
          ) : (
            <MangaTile props={item} key={i + 1} />
          );
        })}
    </>
  );
}
