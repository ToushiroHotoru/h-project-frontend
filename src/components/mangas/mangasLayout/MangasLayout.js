import Head from "next/head";
import Pagination from "../Pagination";
import MangasTop from "@/components/mangas/mangasTop/MangasTop";
import MangaItems from "@/components/mangas/mangasItems/MangaItems";

export default function MangasLayout() {
  return (
    <>
      <Head>
        <title>Каталог</title>
      </Head>
      <div className="container">
        <MangasTop />
        <MangaItems />
        <Pagination />
      </div>
    </>
  );
}
