import Head from "next/head";
import MangasTop from "@/components/mangas/mangasTop/mangasTop";
import ErrorDefault from "@/components/errors/errorDefault/errorDefault";

export default function MangasErrorLayout() {
  return (
    <div className="container">
      <Head>
        <title>Каталог</title>
      </Head>
      <MangasTop />
      <ErrorDefault code="500" message="error" />
    </div>
  );
}
