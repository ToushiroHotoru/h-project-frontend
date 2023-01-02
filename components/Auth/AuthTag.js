import { Box } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import Image from "next/image";
import AuthFavoritesCSS from "../../styles/components/AuthFavorites.module.css";
import { useState, useEffect } from "react";

export default function AuthTag({
  data,
  selectTagFunc,
  selectedTags,
  type,
  isFavorited,
}) {
  const [isClicked, setIsClicked] = useState();
  const [isLoaded, setIsloaded] = useState(false);

  useEffect(() => {
    console.log(data["image"]);
    setTimeout(() => {
      setIsloaded(true);
    }, 3000);
    setIsClicked(selectedTags.includes(data["name"]) ? true : false);
  }, [selectedTags]);

  return (
    <Skeleton
      isLoaded={isLoaded}
      className={`${AuthFavoritesCSS.item} ${
        isClicked
          ? type === "favs"
            ? AuthFavoritesCSS.item_clicked
            : AuthFavoritesCSS.unloved_item_clicked
          : isFavorited
          ? AuthFavoritesCSS.item_is_favorited
          : AuthFavoritesCSS.item
      }`}
      onClick={() => {
        if (!isFavorited) {
          selectTagFunc(data["name"]);
          setIsClicked(!isClicked);
        }
      }}
    >
      <Image
        src={data["image"]}
        alt="Picture of the author"
        width={128}
        height={128}
        fill="strict"
        objectFit="cover"
        draggable="false"
      />
      <Box
        className={`${AuthFavoritesCSS.tag_name} ${
          isClicked
            ? type === "favs"
              ? AuthFavoritesCSS.tag_name_clicked
              : AuthFavoritesCSS.unloved_tag_name_clicked
            : AuthFavoritesCSS.tag_name
        }`}
      >
        {data["name"]}
      </Box>
    </Skeleton>
  );
}
