import css from "../../styles/components/manga/Comments.module.css";
import MangaCommentsTextarea from "./MangaCommentsTextarea";
import { Divider, Heading, Flex, Box } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
export default function MangaCommentsEmpty() {
  return (
    <section className={css.comments}>
      <MangaCommentsTextarea />
      <Divider my="10px" />
      <Flex justifyContent="center" alignItems="center">
        <Heading size="lg" as="h2" my="16px" textAlign="center">
          Стань первым кто оставить комментарий
        </Heading>
        <Box ml="10px">
          <AiFillHeart fill="var(--pink)" size="30px" />
        </Box>
      </Flex>
    </section>
  );
}
