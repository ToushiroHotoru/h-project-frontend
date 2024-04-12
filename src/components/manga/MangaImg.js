import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Box, Center, HStack, Button, Skeleton } from "@chakra-ui/react";
import { BsDownload, BsHeart, BsFillFolderFill } from "react-icons/bs";

import css from "@/styles/components/manga/MangaHead.module.css";
import { useRouter } from "next/router";
import { setCurrentMangaLike } from "@/api/manga/setCurrentMangaLike";
import useMangaStore from "@/zustand/manga.zustand";

export default function MangaImg({ img, id, alt }) {
  const router = useRouter();
  const [isLoadedImage, setIsLoadedImage] = useState(false);

  const { setCurrentLikes } = useMangaStore(({ controls }) => controls);

  const setLike = async () => {
    const { isLiked, currentLikes } = await setCurrentMangaLike(
      router.query.id
    );
    setCurrentLikes({ isLiked, currentLikes });
  };
  return (
    <div className={css.head_img}>
      <Box borderRadius="8px" overflow="hidden">
        <Skeleton isLoaded={isLoadedImage}>
          <Image
            src={img}
            alt={alt}
            layout="responsive"
            width={350}
            height={500}
            onLoad={() => setIsLoadedImage(true)}
          />
        </Skeleton>
      </Box>
      <Link href={`/reader?id=${id}&page=1`}>
        <Button w="100%" mt="15px" colorScheme="orange">
          Читать
        </Button>
      </Link>
      <HStack minHeight="30px" mt="15px" justifyContent="space-between">
        <Box maxWidth="40px" width="100%" padding="5px">
          <Center>
            <BsDownload size="90%" cursor="pointer" />
          </Center>
        </Box>
        <Box
          maxWidth="40px"
          width="100%"
          padding="5px"
          onClick={() => {
            setLike();
          }}
        >
          <Center>
            <BsHeart size="90%" cursor="pointer" />
          </Center>
        </Box>
        <Box maxWidth="40px" width="100%" padding="5px">
          <Center>
            <BsFillFolderFill size="90%" cursor="pointer" />
          </Center>
        </Box>
      </HStack>
    </div>
  );
}
