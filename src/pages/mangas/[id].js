import { useEffect, useState } from "react";

import MangaScreen from "@/screens/manga/Manga.screen";
import { getMangaStatic } from "@/api/manga/getMangaStatic";
import { getMangasPaths } from "@/api/mangas/getMangasPaths";
import { getMangaComments } from "@/api/comments/getMangaComments";
import { useMangaDynamic } from "@/hooks/manga/useMangaDynamic";

export async function getStaticProps({ params }) {
  try {
    const { id } = params;
    const staticManga = await getMangaStatic(id);

    const comments = await getMangaComments(id);

    return {
      props: {
        id: id,
        mangaStatic: staticManga,
        mangaComments: comments,
      },

      revalidate: 3600,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticPaths(context) {
  const { mangas } = await getMangasPaths();
  const paths = mangas.map((post) => ({
    params: { id: post.route },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default function Manga({ id, mangaStatic, mangaComments }) {
  const { mangaDynamic, isMangaLoading } = useMangaDynamic(id);

  return (
    <MangaScreen
      mangaComments={mangaComments}
      mangaDynamic={mangaDynamic}
      mangaStatic={mangaStatic}
    />
  );
}
