import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import {
  Tag,
  Box,
  Flex,
  Center,
  Button,
  TagLabel,
  Skeleton,
  TagCloseButton,
} from "@chakra-ui/react";

import css from "@/styles/components/MangaTile.module.css";

export default function MangaTile({ props }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isLoaded, setIsloaded] = useState(false);

  const tags = ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"];

  const Cover = () => {
    return (
      <Box
        zIndex="10"
        bg="rgba(0, 0, 0, 0.8)"
        color="#fff"
        position="absolute"
        width="100%"
        height="100%"
      >
        <Center fontSize="22px" py="20px">
          Here will be title of manga
        </Center>
        <Box pb="20px" display="flex">
          <Box fontSize="16px" pl="30px" width="20%%">
            <Box>Автор:</Box>
            <Box>Дата:</Box>
          </Box>
          <Box fontSize="16px" width="80%">
            <Box ml="10px">ToushiroHotoru</Box>
            <Box ml="10px">24-08-2014</Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Center fontSize="18px">Теги</Center>
          <Box
            display="flex"
            flexWrap="wrap"
            mt="10px"
            px="20px"
            justifyContent="center"
          >
            {tags.map((item, i) => {
              return (
                <Tag
                  size="md"
                  key={i + 1}
                  borderRadius="full"
                  variant="solid"
                  backgroundColor="#fff"
                  color="#000"
                  opacity="1"
                >
                  <TagLabel>{item}</TagLabel>
                  <TagCloseButton />
                </Tag>
              );
            })}
          </Box>
        </Box>
        <Center
          position="absolute"
          bottom="0"
          backgroundColor="#000"
          color="#fff"
          width="100%"
          height="70px"
        >
          <Link href={`/`}>
            <Button colorScheme="cyan">Запланировать</Button>
          </Link>
        </Center>
      </Box>
    );
  };

  return (
    <Link href={`/mangas/${props._id}`}>
      <a>
        <Skeleton
          posititon="relative"
          isLoaded={isLoaded}
          className={css.manga_tile}
          // onMouseOver={() => {
          //   setIsMouseOver(true);
          //   console.log("mouse is over here");
          // }}
          // onMouseOut={() => {
          //   setIsMouseOver(false);
          // }}
        >
          {/* {isMouseOver && <Cover />} */}
          <Image
            onLoadingComplete={() => {
              setIsloaded(true);
            }}
            src={props.cover}
            layout="responsive"
            alt="pic"
            width={500}
            height={700}
          />

          <Flex
            position="absolute"
            left="0"
            bottom="0"
            zIndex="2"
            width="100%"
            px={{ base: "4px", sm: "8px" }}
            pb={{ base: "4px", sm: "6px" }}
            height={{ base: "50%", sm: "30%" }}
            bgGradient="linear(to-t, rgba(0,0,0,0.8), rgba(0,0,0,0))"
          >
            <Box
              mt="auto"
              maxHeight={{ base: "34px", sm: "48px" }}
              fontSize={{ base: "14px", sm: "18px" }}
              lineHeight="125%"
              overflowY="hidden"
              className={css.m_tile_title}
            >
              {props.title}
            </Box>
          </Flex>
        </Skeleton>
      </a>
    </Link>
  );
}
