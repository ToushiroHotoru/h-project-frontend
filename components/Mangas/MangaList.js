import manga from "../../styles/components/MangaList.module.css";
import Image from "next/image";
import { Flex, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import useMeasure from "react-use-measure";

export default function MangaList({ data }) {
  const [isHovored, setIsHovored] = useState();
  const [ref, { width }] = useMeasure();
  console.log(data);

  const reviewPicsArrayFunc = () => {
    if (width > 600) {
      return [data.cover, data.pages[0], data.pages[1]];
    } else {
      return [data.cover, data.pages[0]];
    }

    return isHovored
      ? data.pages.slice(0, 3)
      : [data.cover, data.pages.slice(0, 2)];
  };

  return (
    <Flex
      ref={ref}
      overflow="hidden"
      className={manga.list}
      onMouseEnter={() => {
        if (width > 600) {
          setIsHovored(true);
        }
      }}
      onMouseLeave={() => setIsHovored(false)}
    >
      <Link href={`/mangas/${data._id}`}>
        <a>
          <Flex justify="center" align="center" className={manga.image_wrap}>
            {reviewPicsArrayFunc().map((item, i) => {
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

      <Box className={manga.infoWrapper}>
        <Link href={`/mangas/${data._id}`}>
          <a>
            <Box
              w="90%"
              maxH="35px"
              overflow="hidden"
              fontSize="1.3em"
              padding="0 10px"
              className={manga.info}
            >
              {data.title}
            </Box>
          </a>
        </Link>
        <Box className={manga.infoSubWrapper}>
          <Flex
            direction="column"
            maxH="170px"
            mt="10px"
            padding="0 10px"
            className={manga.info}
          >
            <Flex mb="5px">
              <Box minW="100px">Серия</Box>
              <Box minW="150px" ml="2%" w="100%">
                {data.series}
              </Box>
            </Flex>
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
          <Box className={`${manga.tagsWrapper}`}>
            {data &&
              data.tags.map((tag, i) => {
                return (
                  <Box className={`${manga.tag}`} key={i + 1}>
                    <Image
                      src={tag["image"]}
                      alt="Picture of the author"
                      width={128}
                      height={128}
                      fill="strict"
                      objectFit="cover"
                      draggable="false"
                    />
                    <Box className={`${manga.tag_name}`}>{tag.name}</Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
