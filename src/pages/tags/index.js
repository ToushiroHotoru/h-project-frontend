import Head from "next/head";

import { getAllTags } from "@/api/tags/getAllTags";
import TagsScreen from "./../../screens/tags/Tags.screen";

export async function getStaticProps() {
  const tags = await getAllTags();
  if (!tags) {
    return {
      notFound: true,
    };
  }

  return {
    props: { tags: tags },
    revalidate: 10,
  };
}

export default function Tags({ tags }) {
  return (
    <>
      <Head>
        <title>Теги</title>
      </Head>
      <TagsScreen tags={tags} />
    </>
  );
}
