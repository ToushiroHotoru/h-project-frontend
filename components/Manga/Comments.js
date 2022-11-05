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
import css from "../../styles/components/Comments.module.css";

export default function Comments() {
  return (
    <div className={css.comments}>
      <Text mb="8px">Comments</Text>
      <Textarea
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
  );
}
