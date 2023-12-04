import { useState, useEffect } from "react";

import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import css from "@/styles/components/Auth.module.css";

export default function AuthTag({
  type,
  data,
  isFavorited,
  selectedTags,
  selectTagFunc,
}) {
  const [isClicked, setIsClicked] = useState();
  const [isLoaded, setIsloaded] = useState(false);

  // выборка класса для элемента тега
  const classNameChosserForItem = () => {
    switch (true) {
      case isClicked == true && type === "favs":
        return css.item_clicked;
      case isClicked == true && type !== "favs":
        return css.unloved_item_clicked;
      case isClicked == false && isFavorited == true:
        return css.item_is_favorited;
      case isClicked == false && isFavorited == false:
        return css.item;
    }
  };
  // выборка класса для имени тега
  const classNameChosserForTagName = () => {
    switch (true) {
      case isClicked == true && type === "favs":
        return css.tag_name_clicked;
      case isClicked == true && type !== "favs":
        return css.unloved_tag_name_clicked;
      case isClicked == false:
        return css.tag_name;
    }
  };

  useEffect(() => {
    setIsClicked(selectedTags.includes(data["name"]) ? true : false);
  }, [selectedTags]);

  return (
    <Skeleton
      isLoaded={isLoaded}
      className={`${css.item} ${classNameChosserForItem()}`}
      onClick={() => {
        if (!isFavorited) {
          selectTagFunc(data["name"]);
          setIsClicked(!isClicked);
        }
      }}
    >
      <Image
        src={data["image"]}
        onLoadingComplete={() => {
          setIsloaded(true);
        }}
        alt="Picture of the author"
        width={128}
        height={128}
        fill="strict"
        objectFit="cover"
        draggable="false"
      />
      <Box className={`${css.tag_name} ${classNameChosserForTagName()}`}>
        {data["name"]}
      </Box>
    </Skeleton>
  );
}
