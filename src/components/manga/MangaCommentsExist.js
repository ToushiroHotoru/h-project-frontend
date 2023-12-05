import { BsXLg } from "react-icons/bs";
import { Box, Flex, Button, Avatar, Divider } from "@chakra-ui/react";

import MangaCommentsTextarea from "./MangaCommentsTextarea";
import css from "@/styles/components/manga/Comments.module.css";

export default function MangaCommentsExist({ comments }) {
  return (
    <section className={css.comments}>
      <MangaCommentsTextarea />
      {comments.map((comment) => {
        return (
          <div className={css.comment_example} key={comment._id}>
            <Divider />
            <Box pl="1em" py="1em">
              <Flex alignItems="center">
                <Avatar
                  name={comment.user.username}
                  src={comment.user.avatar}
                />
                <Box ml="1em" className={css.username}>
                  {comment.user.username}
                </Box>
                <Box ml="1em">{comment.createdAt}</Box>
              </Flex>

              <Box my="2em" className={css.comment_text}>
                {comment.text}
              </Box>
              <Flex w="100%" justifyContent="flex-end">
                <Button>Ответить</Button>
              </Flex>
            </Box>
          </div>
        );
      })}

      <div className={css.comment_answer_example}>
        <Divider />
        <Box pl="1em" py="1em">
          <Flex alignItems="center" flexWrap="wrap">
            <Avatar name="Toushiro Hotoru" src="/avatars/avatar2.png" />
            <Flex>
              <Box ml="1em" className={css.username}>
                MoralGurl69
              </Box>
              <Box ml="1em">12.12.2022</Box>
            </Flex>
            <Box ml="1em">
              to:
              <a href="#" className={css.link}>
                ToushiroHotoru
              </a>
            </Box>
            <Box w="auto" justifyContent="flex-end" mr="1em" ml="auto">
              <BsXLg />
            </Box>
          </Flex>

          <Box my="2em" className={css.comment_text}>
            Комментарий -_-
          </Box>
        </Box>
        <Divider />
      </div>
    </section>
  );
}
