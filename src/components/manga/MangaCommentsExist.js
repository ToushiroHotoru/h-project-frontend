import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { Box, Flex, Button, Avatar, Divider } from "@chakra-ui/react";

import useAuthStore from "@/zustand/auth.zustand";
import MangaCommentsTextarea from "./MangaCommentsTextarea";
import css from "@/styles/components/manga/Comments.module.css";
import MangaCommentsNotAuth from "./MangaCommentsNotAuth";

export default function MangaCommentsExist({ comments }) {
  const { user, isAuth } = useAuthStore();

  return (
    <section className={css.comments}>
      {isAuth ? <MangaCommentsTextarea /> : <MangaCommentsNotAuth />}

      {comments.map((comment) => {
        return (
          <div className={css.comment_example} key={comment._id}>
            <Divider />
            <Box pl="1em" py="1em" position="relative">
              <Flex alignItems="center">
                <Avatar
                  name={comment.user.username}
                  src={comment.user.avatar}
                />
                <Link href={`/profile/${comment.user.username}`}>
                  <a>
                    <Box ml="1em" className={css.username}>
                      {comment.user.username}
                    </Box>
                  </a>
                </Link>
                <Box ml="1em">{comment.createdAt}</Box>
              </Flex>

              <Box my="2em" className={css.comment_text}>
                {comment.text}
              </Box>
              <Flex w="100%" justifyContent="flex-end">
                <Button>Ответить</Button>
              </Flex>
              {user?.id === comment.user._id ? (
                <Box
                  position="absolute"
                  top={2}
                  right={0}
                  color="red"
                  cursor="pointer"
                  _hover={{ color: "#fb3434" }}
                >
                  <MdDelete size="26px" />
                </Box>
              ) : (
                ""
              )}
            </Box>
          </div>
        );
      })}
    </section>
  );
}
