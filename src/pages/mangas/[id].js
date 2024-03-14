import { useEffect, useState } from "react";

import axios from "@/utils/axios.js";
import getMangasPaths from "@/utils/getMangasPaths.js";
import MangaScreen from "@/screens/manga/Manga.screen";

export async function getStaticProps({ params }) {
  try {
    const { id } = params;
    const staticManga = await axios.get(`/manga-static`, {
      params: { route: id },
    });

    const comments = await axios.get("/manga-comments", {
      params: {
        route: id,
      },
    });

    return {
      props: {
        id: id,
        mangaStatic: staticManga.data.data.manga,
        mangaComments: comments.data.data.comments,
      },

      revalidate: 3600,
    };
  } catch (error) {
    console.log(error)
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
  const [mangaDynamic, setMangaDynamic] = useState();

  const getDynamicMangaData = async () => {
    try {
      const mangaDynamicData = await axios.get(`/manga-dynamic`, {
        params: { route: id },
      });
      setMangaDynamic(mangaDynamicData.data.data.manga);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDynamicMangaData();
  }, []);

  return (
    <MangaScreen
      mangaComments={mangaComments}
      mangaDynamic={mangaDynamic}
      mangaStatic={mangaStatic}
    />
  );
}
