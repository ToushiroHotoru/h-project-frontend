import css from "../../styles/components/MangaTile.module.css";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

export default function MangaTile({ props }) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const onLoadHandler = () => {
    // событие после загрузки изображения
  };

  // const cutLongTitle = (title) => {
  //   if (title.length > 88) {
  //     console.log(title.slice(0, 85));
  //     return title.slice(0, 100);
  //   }
  //   return title;
  // };

  return (
    <Link href={`/mangas/${props._id}`}>
      <a
        className={css.manga_tile}
        onMouseOver={() => {
          setIsMouseOver(true);
          console.log("mouse is over ");
        }}
      >
        <Image
          onLoad={onLoadHandler}
          src={props.cover}
          layout="responsive"
          alt="pic"
          width={500}
          height={700}
        />

        <Box mt="4" maxHeight="50px" overflowY="hidden" height="50px">
          <div className={css.manga_tile_title}>{props.title}</div>
        </Box>
      </a>
    </Link>
  );
}
