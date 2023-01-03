import { Box, Flex } from "@chakra-ui/react";
import css from "../../styles/components/MangaHead.module.css";

export default function HeadDesc({ mangaDynamic, manga }) {
  console.log(mangaDynamic);
  return (
    <div className={css.head_desc}>
      <Flex direction="column">
        <Flex>
          <Box flex="1.5" minWidth="100px">
            Серия
          </Box>
          <Box flex="2">{manga.series}</Box>
        </Flex>
        <Flex>
          <Box flex="1.5" minWidth="100px">
            Автор
          </Box>
          <Box flex="2">{manga.artist}</Box>
        </Flex>
        <Flex>
          <Box flex="1.5" minWidth="100px">
            Просмотры
          </Box>
          <Box flex="2">{mangaDynamic && mangaDynamic.views}</Box>
        </Flex>
        <Flex>
          <Box flex="1.5" minWidth="100px">
            Likes
          </Box>
          <Box flex="2">{mangaDynamic && mangaDynamic.likes}</Box>
        </Flex>
      </Flex>
    </div>
  );
}
