import { Box, Center, HStack, Button } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import {
  BsDownload,
  BsHeart,
  BsHeartFill,
  BsFillFolderFill,
} from "react-icons/bs";

import css from "../../styles/components/MangaHead.module.css";

export default function HeadImg({ img, id }) {
  return (
    <div className={css.head_img}>
      <Box borderRadius="8px" overflow="hidden">
        <Image
          src={img}
          alt="Picture of the author"
          layout="responsive"
          width={350}
          height={500}
        />
      </Box>
      <Link href={`/reader?id=${id}&page=1`}>
        <Button w="100%" mt="15px" colorScheme="orange">
          Читать
        </Button>
      </Link>
      <HStack minHeight="30px" mt="15px" justifyContent="space-between">
        <Box maxWidth="40px" width="100%" padding="5px">
          <Center>
            <BsDownload size="90%" cursor="pointer" />
          </Center>
        </Box>
        <Box maxWidth="40px" width="100%" padding="5px">
          <Center>
            <BsHeart size="90%" cursor="pointer" />
          </Center>
        </Box>
        <Box maxWidth="40px" width="100%" padding="5px">
          <Center>
            <BsFillFolderFill size="90%" cursor="pointer" />
          </Center>
        </Box>
      </HStack>
    </div>
  );
}
