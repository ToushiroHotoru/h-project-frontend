import Head from "next/head";

import { Grid } from "@chakra-ui/react";

import axios from "@/utils/axios";
import Tag from "@/components/tags/tag/Tag";

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
      <div className="container">
        <Grid
          gap="15px"
          gridTemplateColumns={{
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
            x450: "1fr 1fr",
          }}
        >
          {tags.map((item) => (
            <Tag data={item} key={item._id} />
          ))}
        </Grid>
      </div>
    </>
  );
}
