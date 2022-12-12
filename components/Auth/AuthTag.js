import { Box } from "@chakra-ui/react";
import Image from "next/image";
import AuthFavoritesCSS from "../../styles/components/AuthFavorites.module.css";
import { useState, useEffect } from "react";

export default function AuthTag({ data, selectTagFunc, selectedTags, type }) {
  const [isClicked, setIsClicked] = useState();

  useEffect(() => {
    setIsClicked(selectedTags.includes(data["name"]) ? true : false);
  }, [selectedTags]);

  return (
    <Box
      className={
        isClicked
          ? type === "favs"
            ? AuthFavoritesCSS.item_clicked
            : AuthFavoritesCSS.unloved_item_clicked
          : AuthFavoritesCSS.item
      }
      onClick={() => {
        selectTagFunc(data["name"]);
        setIsClicked(!isClicked);
      }}
    >
      <Image
        src={data["img"]}
        alt="Picture of the author"
        width={100}
        height={90}
        objectFit="cover"
        draggable="false"
      />
      <Box
        className={
          isClicked
            ? type === "favs"
              ? AuthFavoritesCSS.tag_name_clicked
              : AuthFavoritesCSS.unloved_tag_name_clicked
            : AuthFavoritesCSS.tag_name
        }
      >
        {data["name"]}
      </Box>
    </Box>
  );
}
