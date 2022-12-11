import { Input, Flex, Box, Center, HStack } from "@chakra-ui/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import AuthFavoritesCSS from "../../styles/components/AuthFavorites.module.css";

export default function AuthEnd({ stage, setStage }) {
  const [avatars, setAvatars] = useState([
    "/avatar(NY).png",
    "/avatar.png",
    "/avatar1.png",
    "/avatar2.png",
    "/avatar3.jpg",
    "/avatar4.jpg",
    "/avatar5.jpg",
  ]);
  return (
    <>
      <Center>
        <Image
          src="/zero.png"
          alt="Picture of the author"
          width={100}
          height={100}
          objectFit="cover"
          draggable="false"
        />
      </Center>
      <Center>
        <Box className={AuthFavoritesCSS.avatars}>
          {avatars.map((item, i) => {
            return (
              <Box
                borderRadius="40px"
                height="55px"
                minWidth="55px"
                width="55px"
                minHeight="55px"
                overflow="hidden"
                key={i + 1}
                mx="1em"
              >
                <Image
                  src={item}
                  width={70}
                  height={70}
                  alt="Picture of the author"
                  draggable="false"
                />
              </Box>
            );
          })}
        </Box>
      </Center>
    </>
  );
}
