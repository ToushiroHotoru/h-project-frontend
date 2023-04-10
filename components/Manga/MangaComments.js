import {
  Box,
  Flex,
  Text,
  Textarea,
  Button,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { BsXLg } from "react-icons/bs";
import css from "../../styles/components/manga/Comments.module.css";

export default function MangaComments({ comments }) {
  return (
    <section className={css.comments}>
      <Text mb="8px">Comments</Text>
      <Textarea
        placeholder="Here is a sample placeholder"
        size="sm"
        resize="none"
      />
      <Button mt="5px">Отправить</Button>
      {comments.map((comment) => {
        return (
          <div className={css.comment_example} key={comment._id}>
            <Divider />
            <Box pl="1em" py="1em">
              <Flex alignItems="center">
                <Avatar name="Toushiro Hotoru" src="/avatar.png" />
                <Box ml="1em" className={css.username}>
                  {comment.user}
                </Box>
                <Box ml="1em">12.12.2022</Box>
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
