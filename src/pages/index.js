import Head from "next/head";

import axios from "@/utils/axios";
import {
  getLastPublishedMangas,
  getMostLikedMangasOnLastWeek,
  getMostViewedMangasOnLastWeek,
} from "@/api/mangas/getHomePageMangas";
import HomePageMangasSection from "../components/home/HomePageMangasSection/HomePageMangasSection";

export async function getStaticProps() {
  const lastPublishedMangas = await getLastPublishedMangas();
  const mostViewedMangasOnLastWeek = await getMostViewedMangasOnLastWeek();
  const mostLikedMangasOnLastWeek = await getMostLikedMangasOnLastWeek();

  return {
    props: {
      lastPublishedMangas: lastPublishedMangas,
      mostViewedMangasOnLastWeek: mostViewedMangasOnLastWeek,
      mostLikedMangasOnLastWeek: mostLikedMangasOnLastWeek,
    },
    revalidate: 60 * 30,
  };
}

export default function Index({
  lastPublishedMangas,
  mostViewedMangasOnLastWeek,
  mostLikedMangasOnLastWeek,
}) {
  return (
    <div className="container">
      <Head>
        <title>Главная</title>
      </Head>

      <HomePageMangasSection
        title="Новая манга"
        mangas={lastPublishedMangas}
        headingType="h1"
      />
      <HomePageMangasSection
        title="Просматриваемые на этой неделе"
        mangas={mostViewedMangasOnLastWeek}
        headingType="h2"
      />
      <HomePageMangasSection
        title="Залайкенные на этой неделе"
        mangas={mostLikedMangasOnLastWeek}
        headingType="h2"
      />
    </div>
  );
}
