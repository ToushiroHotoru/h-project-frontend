import { Box, Flex } from "@chakra-ui/react";
import css from "../../styles/components/manga/MangaHead.module.css";

export default function MangaDesc({ data, manga }) {
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
          <Box flex="2">{data && data.views}</Box>
        </Flex>
        <Flex>
          <Box flex="1.5" minWidth="100px">
            Likes
          </Box>
          <Box flex="2">{data && data.likes}</Box>
        </Flex>
      </Flex>
    </div>
  );
}
