import { Input, Flex, Box, Center } from "@chakra-ui/react";
import Image from "next/image";
import AuthFavoritesCSS from "../../styles/components/AuthFavorites.module.css";
import { useState, useEffect } from "react";

export default function AuthTag({ name, img, func, favorites }) {
  const [isClicked, setIsClicked] = useState();

  useEffect(() => {
    if (favorites.includes(name)) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }, [favorites]);

  return (
    <Box
      className={
        isClicked ? AuthFavoritesCSS.itemClicked : AuthFavoritesCSS.item
      }
      onClick={() => {
        func(name);
        setIsClicked(!isClicked);
      }}
    >
      <Image
        src={img}
        alt="Picture of the author"
        width={100}
        height={90}
        objectFit="cover"
        draggable="false"
      />
      <Box
        className={
          isClicked ? AuthFavoritesCSS.tagNameClicked : AuthFavoritesCSS.tagName
        }
      >
        {name}
      </Box>
    </Box>
  );
}
