import Head from "next/head";

import axios from "@/utils/axios";
import TagsScreen from "./../../screens/tags/Tags.screen";

export async function getStaticProps() {
  const tags = await axios.get(`/tags`);
  if (!tags.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { tags: tags.data.data.tags },
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
