import Head from "next/head";
import moment from "moment";
import "moment/locale/ru";
import { useEffect, useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { getPaths } from "../../libs/get_post.js";

import MangaComments from "../../components/Manga/MangaComments.js";
import MangaPages from "../../components/Manga/MangaPages.js";
import MangaTags from "../../components/Manga/MangaTags.js";
import MangaDesc from "../../components/Manga/MangaDesc.js";
import MangaImg from "../../components/Manga/MangaImg.js";

import css from "../../styles/pages/Manga.module.css";
import { LINK } from "../../libs/changeApiUrl.js";

export async function getStaticProps({ params }) {
  const { id } = params;
  const res = await fetch(`${LINK}/manga-static`, {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return {
    props: { manga: data, id: id }, // will be passed to the page component as props
  };
}

export async function getStaticPaths(context) {
  const data = await getPaths();
  const paths = data.map((post) => ({
    params: { id: post._id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default function Manga({ manga, id }) {
  moment.locale("ru");
  const [mangaDynamic, setMangaDynamic] = useState();

  const onLoadHander = async () => {
    try {
      const res = await fetch(`${LINK}/manga-dynamic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      const data = await res.json();
      console.log(data["tags"]);
      setMangaDynamic(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onLoadHander();
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
            <Box mt="auto">
              {moment(manga.updatedAt).format("DD MMMM YYYY")}
            </Box>
          </Flex>

          <section className={css.head}>
            <MangaImg img={manga.cover} id={mangaDynamic?._id} />
            <MangaDesc data={mangaDynamic && mangaDynamic} manga={manga} />
            <MangaTags tags={mangaDynamic && mangaDynamic["tags"]} />
          </section>
          <MangaPages
            pages={mangaDynamic && mangaDynamic.pages}
            manga={manga}
          />
          <MangaComments />
        </div>
      </div>
    </>
  );
}
