import Head from "next/head";
import { useState } from "react";
import Tag from "../../components/Tags/Tag";
import TagsCss from "../../styles/components/Tags.module.css";

export default function Tags() {
  const [tags, setTags] = useState([
    {
      name: "tag1",
      desc: "this is a description this is a description this is a description this is a description",
      count: 342,
      img: "/tag1.png",
    },
    {
      name: "tag2",
      desc: "this is a description this is a description this is a description this is a description",
      count: 23,
      img: "/tag2.png",
    },
    {
      name: "tag3",
      desc: "this is a description this is a description this is a description this is a description",
      count: 987,
      img: "/tag3.png",
    },
    {
      name: "tag4",
      desc: "this is a description this is a description this is a description this is a description",
      count: 323,
      img: "/tag4.png",
    },
    {
      name: "tag5",
      desc: "this is a description this is a description this is a description this is a description",
      count: 53,
      img: "/tag1.png",
    },
    {
      name: "tag6",
      desc: "this is a description this is a description this is a description this is a description",
      count: 765,
      img: "/tag2.png",
    },
    {
      name: "tag7",
      desc: "this is a description this is a description this is a description this is a description",
      count: 456,
      img: "/tag3.png",
    },
    {
      name: "tag8",
      desc: "this is a description this is a description this is a description this is a description",
      count: 235,
      img: "/tag4.png",
    },
  ]);
  return (
    <div className="container">
      <Head>
        <title>Теги</title>
      </Head>
      <div className={TagsCss.tagsDesktop}>
        {tags.map((item, i) => {
          return <Tag data={item} key={i + 1} />;
        })}
      </div>
    </div>
  );
}
