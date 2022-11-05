import { Box, Center, HStack } from "@chakra-ui/react";
import Image from "next/image";
import {
  BsDownload,
  BsHeart,
  BsHeartFill,
  BsFillFolderFill,
} from "react-icons/bs";

import css from "../../styles/components/MangaHead.module.css";

export default function HeadImg() {
  return (
    <div className={css.head_img}>
      <Box borderRadius="8px" overflow="hidden">
        <Image
          src="/manga_cover/cover_6.jpg"
          alt="Picture of the author"
          layout="responsive"
          width={350}
          height={500}
        />
      </Box>
      <HStack minHeight="40px" mt="15px" py="1em">
        <Center>
          {/* <Icon as={BsDownload} w={9} h={9} /> */}
          <BsDownload size="20%" />
        </Center>
        <Center>
          <BsHeart size="20%" />
        </Center>
        <Center>
          <BsFillFolderFill size="20%" />
        </Center>
      </HStack>
    </div>
  );
}
