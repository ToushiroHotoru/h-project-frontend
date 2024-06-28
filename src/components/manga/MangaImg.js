import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

import { Box, Center, HStack, Button, Skeleton } from "@chakra-ui/react";
import { BsDownload, BsHeart, BsFillFolderFill } from "react-icons/bs";

import style from "@/styles/components/manga/MangaHead.module.css";
import { setCurrentMangaLike } from "@/api/manga/setCurrentMangaLike";
import useAuthStore from "./../../zustand/auth.zustand";

export default function MangaImg({ img, id, alt }) {
  const router = useRouter();
  const [isLoadedImage, setIsLoadedImage] = useState(false);

  const { isAuth } = useAuthStore();

  const setLike = async () => {
    await setCurrentMangaLike(router.query.id);
  };
  return (
    <div className={style.head_img}>
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
        <a>
          <Button w="100%" mt="15px" colorScheme="orange">
            Читать
          </Button>
        </a>
      </Link>
      <HStack minHeight="30px" mt="15px" justifyContent="space-between">
        <Box maxWidth="40px" width="100%" padding="5px" title="Скачать">
          <Center>
            <BsDownload size="90%" cursor="pointer" />
          </Center>
        </Box>
        {isAuth ? (
          <>
            <Box
              maxWidth="40px"
              width="100%"
              padding="5px"
              onClick={() => {
                setLike();
              }}
              title="Поставить лайк"
            >
              <Center>
                <BsHeart size="90%" cursor="pointer" />
              </Center>
            </Box>
            <Box maxWidth="40px" width="100%" padding="5px" title="В избранные">
              <Center>
                <BsFillFolderFill size="90%" cursor="pointer" />
              </Center>
            </Box>
          </>
        ) : (
          ""
        )}
      </HStack>
    </div>
  );
}
