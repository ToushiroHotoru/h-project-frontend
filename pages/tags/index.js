import Head from "next/head";
import { useState, useEffect } from "react";
import Tag from "../../components/Tags/Tag";
import TagsCss from "../../styles/components/Tags.module.css";
import { LINK } from "../../libs/changeApiUrl.js";

export default function Tags() {
  const [tags, setTags] = useState([]);

  const getTagsFunc = async () => {
    try {
      const res = await fetch(`${LINK}/get_tags`);
      const result = await res.json();
      setTags(result.tags);
     
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTagsFunc();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Теги</title>
      </Head>
      <div className={TagsCss.tagsDesktop}>
        {tags &&
          tags.map((item, i) => {
            return <Tag data={item} key={i + 1} />;
          })}
      </div>
    </div>
  );
}
