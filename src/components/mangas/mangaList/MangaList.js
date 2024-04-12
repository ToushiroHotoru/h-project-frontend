import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import useMeasure from "react-use-measure";
import { Flex, Box, useColorModeValue, Grid } from "@chakra-ui/react";

import style from "@/components/mangas/mangaList/MangaList.module.css";

export default function MangaList({ data }) {
  const reviewPicsArrayFunc = () => {
    return [data.cover, ...data.pages.slice(0, 2)];
  };

  const listMangaBgColor = useColorModeValue("#313131", "#000000");

  return (
    <Grid
      overflow="hidden"
      padding={{ base: "12px", sm: "20px" }}
      className={style.list}
      bgColor={listMangaBgColor}
      maxHeight={{ sm: "250px" }}
      gridTemplateColumns={{
        base: "140px calc(100% - 152px)",
        sm: "160px 0.5fr 1fr",
      }}
      columnGap={{ base: "12px", sm: "20px", md: "30px" }}
      rowGap={{ sm: "12px" }}
    >
      <Box
        display={{ base: "block", sm: "none" }}
        width="100%"
        mb="8px"
        className={style.mobileTitle}
      >
        <Link href={`/mangas/${data.route}`}>
          <a>
            <Box
              maxH="35px"
              overflow="hidden"
              fontSize={{ base: "1rem", sm: "1.3em" }}
              className={style.info}
            >
              {data.title}
            </Box>
          </a>
        </Link>
      </Box>
      <Box
        overflow={{ base: "hidden", sm: "visible" }}
        width={{ base: "100%", sm: "auto" }}
        gridRow={{ sm: "1/4" }}
      >
        <Link href={`/mangas/${data.route}`}>
          <a>
            <Flex
              justifyContent={{ sm: "center" }}
              alignItems="center"
              className={style.image_wrap}
            >
              {reviewPicsArrayFunc().map((item, i) => {
                return (
                  <Box
                    key={i + 1}
                    width={{ base: "100%", sm: "160px" }}
                    minWidth={{ sm: "160px" }}
                    className={style.image}
                    _before={{
                      content: "''",
                      display: "block",
                      paddingTop: "130%",
                    }}
                  >
                    <Image
                      src={item}
                      alt="pic"
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
                );
              })}
            </Flex>
          </a>
        </Link>
      </Box>

      <Box
        className={style.infoWrapper}
        mt={0}
        display={{ base: "none", sm: "block" }}
        gridColumn="2/4"
      >
        <Box>
          <Link href={`/mangas/${data.route}`}>
            <a>
              <Box
                maxH="35px"
                overflow="hidden"
                fontSize={{ base: "1rem", sm: "1.3em" }}
                className={style.info}
              >
                {data.title}
              </Box>
            </a>
          </Link>
        </Box>
      </Box>
      <Flex direction="column" maxH={{ sm: "170px" }} className={style.info}>
        {data.series && (
          <Flex
            mb={{ base: "10px", sm: "5px" }}
            fontSize={{ base: "0.8rem", sm: "1rem" }}
            lineHeight="1.25"
            flexDirection={{ base: "column", x450: "initial" }}
          >
            <Box minW={{ sm: "100px" }} color="var(--pink);">
              Серия
            </Box>
            <Box
              minW={{ sm: "150px" }}
              mt={{ base: "2px", x450: 0 }}
              ml={{ x450: "8px" }}
              w="100%"
            >
              <Link
                href={{
                  pathname: "/mangas",
                  query: { series: data.series },
                }}
              >
                {data.series}
              </Link>
            </Box>
          </Flex>
        )}
        <Flex
          mb={{ base: "10px", sm: "5px" }}
          fontSize={{ base: "0.8rem", sm: "1rem" }}
          lineHeight="1.25"
          flexDirection={{ base: "column", x450: "initial" }}
        >
          <Box minW={{ sm: "100px" }} color="var(--pink);">
            Автор
          </Box>
          <Box
            minW={{ sm: "150px" }}
            mt={{ base: "2px", x450: 0 }}
            ml={{ x450: "8px" }}
            w="100%"
            fontSize={{ base: "14px", x450: "inherit" }}
          >
            <Link
              href={{ pathname: "/mangas", query: { artist: data.artist } }}
            >
              {data.artist}
            </Link>
          </Box>
        </Flex>

        {data.interpreter && (
          <Flex
            mb={{ base: "10px", sm: "5px" }}
            fontSize={{ base: "0.8rem", sm: "1rem" }}
            lineHeight="1.25"
            flexDirection={{ base: "column", x450: "initial" }}
          >
            <Box minW={{ sm: "100px" }} color="var(--pink);">
              Перевод
            </Box>
            <Box
              minW={{ sm: "150px" }}
              mt={{ base: "2px", x450: 0 }}
              ml={{ x450: "8px" }}
              w="100%"
              fontSize={{ base: "14px", x450: "inherit" }}
            >
              <Link
                href={{
                  pathname: "/mangas",
                  query: { interpreter: data.interpreter },
                }}
              >
                {data.interpreter}
              </Link>
            </Box>
          </Flex>
        )}
        <Flex
          mb={{ base: "10px", sm: "5px" }}
          fontSize={{ base: "0.8rem", sm: "1rem" }}
          lineHeight="1.25"
          flexDirection={{ base: "column", x450: "initial" }}
        >
          <Box minW={{ sm: "100px" }} color="var(--pink);">
            Дата
          </Box>
          <Box
            minW={{ sm: "150px" }}
            mt={{ base: "2px", x450: 0 }}
            ml={{ x450: "8px" }}
            w="100%"
            fontSize={{ base: "14px", x450: "inherit" }}
          >
            {data.createdAt}
          </Box>
        </Flex>
        <Flex
          mb={{ base: "10px", sm: "5px" }}
          fontSize={{ base: "0.8rem", sm: "1rem" }}
          lineHeight="1.25"
          flexDirection={{ base: "column", x450: "initial" }}
        >
          <Box minW={{ sm: "100px" }} color="var(--pink);">
            Просмотры
          </Box>
          <Box
            minW={{ sm: "150px" }}
            mt={{ base: "2px", x450: 0 }}
            ml={{ x450: "8px" }}
            w="100%"
            fontSize={{ base: "14px", x450: "inherit" }}
          >
            {data.views}
          </Box>
        </Flex>
        <Flex
          fontSize={{ base: "0.8rem", sm: "1rem" }}
          lineHeight="1.25"
          flexDirection={{ base: "column", x450: "initial" }}
        >
          <Box minW={{ sm: "100px" }} color="var(--pink);">
            Лайки
          </Box>
          <Box
            minW={{ sm: "150px" }}
            mt={{ base: "2px", x450: 0 }}
            ml={{ x450: "8px" }}
            w="100%"
            fontSize={{ base: "14px", sm: "inherit" }}
          >
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
                  alt={tag.name}
                  objectFit="cover"
                  layout="fill"
                  loading="lazy"
                  style={{ position: "absolute" }}
                />
                <Box className={`${style.tag_name}`}>{tag.name}</Box>
              </Box>
            );
          })}
      </Box>
    </Grid>
  );
}
