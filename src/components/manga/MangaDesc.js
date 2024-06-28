import { Box, Flex } from "@chakra-ui/react";

import style from "@/styles/components/manga/MangaHead.module.css";

export default function MangaDesc({ manga }) {
  return (
    <div className={style.head_desc}>
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
          <Box flex="2">{manga.views}</Box>
        </Flex>
        <Flex>
          <Box flex="1.5" minWidth="100px">
            Likes
          </Box>
          <Box flex="2">{manga.likes}</Box>
        </Flex>
      </Flex>
    </div>
  );
}
