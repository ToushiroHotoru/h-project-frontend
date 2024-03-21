import Head from "next/head";

import axios from "@/utils/axios";
import HomePageMangasSection from "../components/home/HomePageMangasSection/HomePageMangasSection";

export async function getStaticProps() {
  const lastPublishedMangas = await axios.get("/last-published-mangas");
  const mostViewedMangasOnLastWeek = await axios.get(
    "/last-most-viewed-mangas"
  );
  const mostLikedMangasOnLastWeek = await axios.get("/last-most-liked-mangas");
  return {
    props: {
      lastPublishedMangas: lastPublishedMangas.data.data.mangas,
      mostViewedMangasOnLastWeek: mostViewedMangasOnLastWeek.data.data.mangas,
      mostLikedMangasOnLastWeek: mostLikedMangasOnLastWeek.data.data.mangas,
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
