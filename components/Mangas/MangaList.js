import manga from "../../styles/components/MangaList.module.css";
import Image from "next/image";
import { Flex, Box, Tag, HStack, Heading, Spacer } from "@chakra-ui/react";

export default function MangaList({ data }) {
  return (
    <Flex className={manga.list} align="center">
      <Flex h="250px" justify="center" align="center" px="20px">
        <Box>
          <Image
            src="https://i.pinimg.com/originals/75/2d/21/752d2198f907d328b1403f91b2a7ded0.jpg"
            alt="pic"
            width={200}
            height={200}
          />
        </Box>
        <Box>
          <Image
            src="https://i.pinimg.com/originals/75/2d/21/752d2198f907d328b1403f91b2a7ded0.jpg"
            alt="pic"
            width={200}
            height={200}
          />
        </Box>
      </Flex>

      <Flex direction="column" h="200px">
        <Flex>
          <Box fontSize="18px" w="100px">
            Название
          </Box>
          <Box fontSize="18px" w="100px">
            {data.title}
          </Box>
        </Flex>
        <Flex>
          <Box w="80px">Серия</Box>
          <Box w="80px">{data.series}</Box>
        </Flex>
        <Flex>
          <Box w="80px">Автор</Box>
          <Box w="80px">{data.artist}</Box>
        </Flex>

        <Flex>
          <Box minW="80px" verticalAlign="center">
            Теги:
          </Box>
          <HStack w="100%">
            {data.tags.map((tag, i) => {
              return (
                <Tag key={i + 1} variant="solid" colorScheme="dark ">
                  {tag}
                </Tag>
              );
            })}
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
}
