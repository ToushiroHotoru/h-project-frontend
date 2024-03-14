import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import useMeasure from "react-use-measure";
import { Flex, Box } from "@chakra-ui/react";

import style from "@/components/mangas/mangaList/MangaList.module.css";

export default function MangaList({ data }) {
  const reviewPicsArrayFunc = () => {
    return [data.cover, ...data.pages.slice(0, 2)];
  };

  return (
    <Flex overflow="hidden" className={style.list}>
      <Link href={`/mangas/${data.route}`}>
        <a>
          <Flex justify="center" align="center" className={style.image_wrap}>
            {reviewPicsArrayFunc().map((item, i) => {
              return (
                <Box key={i + 1} className={`${style.image}`}>
                  <Image
                    src={item}
                    alt="pic"
                    layout="intrinsic"
                    width={160}
                    height={200}
                  />
                </Box>
              );
            })}
          </Flex>
        </a>
      </Link>

      <Box className={style.infoWrapper}>
        <Link href={`/mangas/${data.route}`}>
          <a>
            <Box
              w="90%"
              maxH="35px"
              overflow="hidden"
              fontSize="1.3em"
              padding="0 10px"
              className={style.info}
            >
              {data.title}
            </Box>
          </a>
        </Link>
        <Box className={style.infoSubWrapper}>
          <Flex
            direction="column"
            maxH="170px"
            mt="10px"
            padding="0 10px"
            className={style.info}
          >
            {data.series && (
              <Flex mb="5px">
                <Box minW="100px">Серия</Box>
                <Box minW="150px" ml="2%" w="100%">
                  {data.series}
                </Box>
              </Flex>
            )}
            <Flex mb="5px">
              <Box minW="100px">Автор</Box>
              <Box ml="2%" w="100%">
                {data.artist}
              </Box>
            </Flex>
            <Flex mb="5px">
              <Box minW="100px">Дата</Box>
              <Box ml="2%" w="100%">
                {data.createdAt}
              </Box>
            </Flex>
            <Flex mb="5px">
              <Box minW="100px">Просмотры</Box>
              <Box ml="2%" w="100%">
                {data.views}
              </Box>
            </Flex>
            <Flex mb="5px">
              <Box minW="100px">Likes</Box>
              <Box ml="2%" w="100%">
                {data.likes}
              </Box>
            </Flex>
          </Flex>
          <Box className={`${style.tagsWrapper}`}>
            {data &&
              data.tags.map((tag, i) => {
                return (
                  <Box className={`${style.tag}`} key={i + 1}>
                    <Image
                      src={tag["image"]}
                      alt="Picture of the author"
                      width={128}
                      height={128}
                      fill="strict"
                      objectFit="cover"
                      draggable="false"
                    />
                    <Box className={`${style.tag_name}`}>{tag.name}</Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
