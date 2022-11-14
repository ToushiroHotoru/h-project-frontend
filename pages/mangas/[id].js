import { getPaths } from "../../libs/get_post.js";
import css from "../../styles/pages/Manga.module.css";
import { useEffect, useState } from "react";
import { Box, Center, Divider, Flex, Heading } from "@chakra-ui/react";
import Comments from "../../components/Manga/Comments.js";
import Pages from "../../components/Manga/Pages.js";
import HeadTags from "../../components/Manga/HeadTags.js";
import HeadDesc from "../../components/Manga/HeadDesc.js";
import HeadImg from "../../components/Manga/HeadImg.js";
import Head from "next/head";
import moment from "moment";
import "moment/locale/ru";

export async function getStaticProps({ params }) {
  const { id } = params;
  // http://localhost:8080/
  // https://h-project.herokuapp.com/
  const res = await fetch("https://h-project.herokuapp.com/manga-static", {
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
      const res = await fetch("https://h-project.herokuapp.com/manga-dynamic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      const data = await res.json();
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
            <HeadImg img={mangaDynamic?.cover} id={mangaDynamic?._id} />
            <HeadDesc mangaDynamic={mangaDynamic} manga={manga} />
            <HeadTags tags={mangaDynamic && mangaDynamic.tags} />
          </section>
          <Pages pages={mangaDynamic && mangaDynamic.pages} manga={manga} />
          <Comments />
        </div>
      </div>
    </>
  );
}
