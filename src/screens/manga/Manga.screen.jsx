import Head from "next/head";

import { Box, Flex, Heading } from "@chakra-ui/react";

import css from "@/styles/pages/Manga.module.css";
import MangaImg from "@/components/manga/MangaImg.js";
import MangaTags from "@/components/manga/MangaTags.js";
import MangaDesc from "@/components/manga/MangaDesc.js";
import MangaPages from "@/components/manga/MangaPages.js";
import MangaComments from "@/components/manga/MangaComments.js";

export default function MangaScreen({
  mangaDynamic,
  mangaStatic,
  mangaComments,
}) {
  return (
    <>
      <Head>
        <title>{mangaStatic.title}</title>
      </Head>
      <div className={css.wrap}>
        <div className="container">
          <Flex justifyContent="space-between">
            <Heading as="h1" size="md" className={css.title}>
              Manga - {mangaStatic.title}
            </Heading>
            <Box mt="auto">{mangaStatic.createdAt}</Box>
          </Flex>

          <section className={css.head}>
            <MangaImg
              img={mangaStatic.cover}
              id={mangaStatic.route}
              alt={mangaStatic.title}
            />
            <MangaDesc
              data={mangaDynamic && mangaDynamic}
              manga={mangaStatic}
            />
            <MangaTags tags={mangaDynamic && mangaDynamic["tags"]} />
          </section>

          <MangaPages pages={mangaDynamic} manga={mangaStatic} />
          <MangaComments comments={mangaComments} />
        </div>
      </div>
    </>
  );
}
