import { AiFillHeart } from "react-icons/ai";
import { Divider, Heading, Flex, Box } from "@chakra-ui/react";

import useAuthStore from "@/zustand/auth.zustand";
import MangaCommentsNotAuth from "./MangaCommentsNotAuth";
import MangaCommentsTextarea from "./MangaCommentsTextarea";
import style from "@/styles/components/manga/Comments.module.css";

export default function MangaCommentsEmpty() {
  const { user, isAuth } = useAuthStore();

  return (
    <section className={style.comments}>
      {isAuth ? (
        <>
          <MangaCommentsTextarea />
          <Divider my="10px" />
          <Flex justifyContent="center" alignItems="center" my="16px">
            <Heading size="md" as="h2" textAlign="center">
              Стань первым кто оставить комментарий
            </Heading>
            <Box ml="10px">
              <AiFillHeart fill="var(--pink)" size="30px" />
            </Box>
          </Flex>
        </>
      ) : (
        <MangaCommentsNotAuth />
      )}
    </section>
  );
}
