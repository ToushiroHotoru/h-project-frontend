import Head from "next/head";
import { useEffect, useState } from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

import axios from "@/utils/axios.js";
import getMangasPaths from "@/utils/getMangasPaths.js";
import css from "@/styles/pages/Manga.module.css";
import MangaImg from "@/components/manga/MangaImg.js";
import MangaTags from "@/components/manga/MangaTags.js";
import MangaDesc from "@/components/manga/MangaDesc.js";
import MangaPages from "@/components/manga/MangaPages.js";
import MangaComments from "@/components/manga/MangaComments.js";

export async function getStaticProps({ params }) {
  const { id } = params;
  const staticManga = await axios.get(`/manga-static`, { params: { id: id } });
  const comments = await axios.get("/get_comments", {
    params: {
      mangaId: id,
    },
  });

  console.log(comments)

  return {
    props: {
      manga: staticManga.data.data.manga,
      id: id,
      comments: comments.data.data.comments,
    },

    revalidate: 3600,
  };
}

export async function getStaticPaths(context) {
  const { mangas } = await getMangasPaths();
  const paths = mangas.map((post) => ({
    params: { id: post._id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default function Manga({ manga, id, comments }) {
  const [mangaDynamic, setMangaDynamic] = useState();

  const getDynamicMangaData = async () => {
    try {
      const mangaDynamicData = await axios.get(`/manga-dynamic`, {
        params: { id: id },
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
    <>
      <Head>
        <title>{manga.title}</title>
      </Head>
      <div className={css.wrap}>
        <div className="container">
          <Flex justifyContent="space-between">
            <Heading as="h1" size="md" className={css.title}>
              Manga - {manga.title}
            </Heading>
            <Box mt="auto">{manga.createdAt}</Box>
          </Flex>

          <section className={css.head}>
            <MangaImg img={manga.cover} id={mangaDynamic?._id} />
            <MangaDesc data={mangaDynamic && mangaDynamic} manga={manga} />
            <MangaTags tags={mangaDynamic && mangaDynamic["tags"]} />
          </section>

          <MangaPages pages={mangaDynamic} manga={manga} />
          <MangaComments comments={comments} />
        </div>
      </div>
    </>
  );
}
