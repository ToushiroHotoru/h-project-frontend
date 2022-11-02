import { getPaths } from "../../libs/get_post.js";
import css from "../../styles/pages/Manga.module.css";
import { Divider } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Box,
  Center,
  HStack,
  Flex,
  Text,
  Textarea,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";

import {
  BsDownload,
  BsHeart,
  BsHeartFill,
  BsFillFolderFill,
  BsXLg,
} from "react-icons/bs";

export async function getStaticProps({ params }) {
  const { id } = params;
  // http://localhost:8080/
  // https://h-project.herokuapp.com/
  const res = await fetch("http://localhost:8080/manga-static", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  const data = await res.json();
  return {
    props: { manga: data, id: id }, // will be passed to the page component as props
  };
}

export async function getStaticPaths(context) {
  console.log(context);
  const data = await getPaths();
  const paths = data.map((post) => ({
    params: { id: post._id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default function Manga({ manga, id }) {
  const [mangaDynamic, setMangaDynamic] = useState();

  const onLoadHander = async () => {
    try {
      console.log(id);
      const res = await fetch("http://localhost:8080/manga-dynamic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      const data = await res.json();
      console.log(data);
      setMangaDynamic(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onLoadHander();
  }, []);
  // console.log(manga);
  return (
    <div className="container">
      <div className={css.title}>Manga {manga.title}</div>
      <Divider />
      <div className={css.head}>
        <div className={css.head_img}>
          <Box borderRadius="8px" overflow="hidden">
            <Image
              src="/manga_cover/cover_6.jpg"
              alt="Picture of the author"
              layout="responsive"
              width={350}
              height={500}
            />
          </Box>
          <HStack minHeight="40px" mt="15px" py="1em">
            <Center>
              {/* <Icon as={BsDownload} w={9} h={9} /> */}
              <BsDownload size="20%" />
            </Center>
            <Center>
              <BsHeart size="20%" />
            </Center>
            <Center>
              <BsFillFolderFill size="20%" />
            </Center>
          </HStack>
        </div>
        <Center flex="0.1">
          <Divider orientation="vertical" />
        </Center>
        <div className={css.head_desc}>
          <Flex direction="column" h="200px">
            <Flex>
              <Box flex="0.5">Серия</Box>
              <Box flex="2">{mangaDynamic && mangaDynamic.series}</Box>
            </Flex>
            <Flex>
              <Box flex="0.5">Автор</Box>
              <Box flex="2">{manga.artist}</Box>
            </Flex>
          </Flex>
        </div>
        <Center flex="0.1">
          <Divider orientation="vertical" />
        </Center>
        <div className={css.head_tags}>
          <HStack alignItems="flex-start">
            {mangaDynamic &&
              mangaDynamic.tags.map((item, i) => {
                return (
                  <Box
                    borderRadius="5px"
                    border="1px solid #fff"
                    maxHeight="100px"
                    minWidth="80px"
                    overflow="hidden"
                    key={i + 1}
                  >
                    <Box>
                      <Image
                        src="/tristana.png"
                        alt="Picture of the author"
                        layout="responsive"
                        objectFit="cover"
                        width={250}
                        height={200}
                      />
                    </Box>
                    <Center>{item}</Center>
                  </Box>
                );
              })}
          </HStack>
        </div>
      </div>
      <Box mt="15px">
        <Divider />
      </Box>
      <div className={css.content}>
        {mangaDynamic?.pages
          ? mangaDynamic.pages.map((item, i) => {
              return (
                <Box key={i + 1} minHeight="120px" className={css.page}>
                  <Image
                    src={item}
                    alt="Picture of the author"
                    layout="responsive"
                    objectFit="cover"
                    width={250}
                    height={400}
                  />
                </Box>
              );
            })
          : "это экземпляр, который не содерижит страниц"}
      </div>
      <Divider />
      <div className={css.comments}>
        <Text mb="8px">Comments</Text>
        <Textarea
          //   value={value}
          //   onChange={handleInputChange}
          placeholder="Here is a sample placeholder"
          size="sm"
          resize="none"
        />
        <Button mt="5px">Отправить</Button>

        <div className={css.comment_example}>
          <Divider />
          <Box pl="1em" py="1em">
            <Flex alignItems="center">
              <Avatar name="Toushiro Hotoru" src="/avatar.png" />
              <Box ml="1em" className={css.username}>
                ToushiroHotoru
              </Box>
              <Box ml="1em">12.12.2022</Box>
            </Flex>

            <Box my="2em" className={css.comment_text}>
              Вообще-то, я не педофил, просто, я феменист, который любит детей.
            </Box>
            <Flex w="100%" justifyContent="flex-end">
              <Button>Ответить</Button>
            </Flex>
          </Box>
        </div>
        <div className={css.comment_answer_example}>
          <Divider />
          <Box pl="1em" py="1em">
            <Flex alignItems="center">
              <Avatar name="Toushiro Hotoru" src="/avatar2.png" />
              <Box ml="1em" className={css.username}>
                MoralGurl69
              </Box>
              <Box ml="1em">12.12.2022</Box>
              <Box ml="1em">
                to:
                <a href="#" className={css.link}>
                  ToushiroHotoru
                </a>
              </Box>
              <Flex w="100%" justifyContent="flex-end" mr="1em">
                <BsXLg />
              </Flex>
            </Flex>

            <Box my="2em" className={css.comment_text}>
              Ага, расскажешь... -_-
            </Box>
          </Box>
          <Divider />
        </div>
      </div>
    </div>
  );
}
