import Head from "next/head";
import Tag from "../../components/Tags/Tag";
import TagsCss from "../../styles/components/Tags.module.css";
import { LINK as API_URL } from "../../libs/API_URL.js";

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/get_tags`);
  const tags = await res.json();

  if (!tags) {
    return {
      notFound: true,
    };
  }

  return {
    props: { tags: tags.tags },
    revalidate: 10,
  };
}

export default function Tags({ tags }) {
  return (
    <div className="container">
      <Head>
        <title>Теги</title>
      </Head>
      <div className={TagsCss.tagsDesktop}>
        {tags.map((item) => (
          <Tag data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}
