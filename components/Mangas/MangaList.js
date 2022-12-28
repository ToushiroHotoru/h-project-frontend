import manga from "../../styles/components/MangaList.module.css";
import Image from "next/image";
import { Flex, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

export default function MangaList({ data }) {
  const [isHovored, setIsHovored] = useState();
  let previewPicsArray = isHovored
    ? [data.pages[0], data.pages[1], data.pages[2]]
    : [data.cover, data.pages[0], data.pages[1]];
  return (
    <Flex
      overflow="hidden"
      className={manga.list}
      onMouseEnter={() => {
        setIsHovored(true);
      }}
      onMouseLeave={() => {
        setIsHovored(false);
      }}
    >
      <Link href={`/mangas/${data._id}`}>
        <a>
          <Flex justify="center" align="center" className={manga.image_wrap}>
            {previewPicsArray.map((item, i) => {
              return (
                <Box key={i + 1} className={`${manga.image}`}>
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

      <Flex
        w="100%"
        height="100%"
        ml="20px"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <Link href={`/mangas/${data._id}`}>
          <a>
            <Box
              w="90%"
              maxH="35px"
              overflow="hidden"
              fontSize="1.3em"
              className={manga.info}
            >
              {data.title}
            </Box>
          </a>
        </Link>
        <Flex>
          <Flex direction="column" mt="10px" className={manga.info}>
            <Flex mb="5px">
              <Box minW="100px">Серия</Box>
              <Box w="100%">{data.series}</Box>
            </Flex>
            <Flex mb="5px">
              <Box minW="100px">Автор</Box>
              <Box w="100%">{data.artist}</Box>
            </Flex>
            <Flex mb="5px">
              <Box minW="100px">Дата</Box>
              <Box w="100%">{data.createdAt}</Box>
            </Flex>
            <Flex mb="5px">
              <Box minW="100px">Просмотры</Box>
              <Box w="100%">{data.views}</Box>
            </Flex>
            <Flex mb="5px">
              <Box minW="100px">Likes</Box>
              <Box w="100%">{data.likes}</Box>
            </Flex>
          </Flex>
          <Flex position="relative" ml="45px" className={manga.info}>
            {data.tags.map((tag, i) => {
              return (
                <Box className={`${manga.tag}`} key={i + 1}>
                  <Image
                    src={tag?.img ? tag["img"] : "/tristana.png"}
                    alt="Picture of the author"
                    width={128}
                    height={128}
                    fill="strict"
                    objectFit="cover"
                    draggable="false"
                  />
                  <Box className={`${manga.tag_name}`}>{tag}</Box>
                </Box>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
