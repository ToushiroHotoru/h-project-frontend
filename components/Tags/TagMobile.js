import { Box, Flex, Center } from "@chakra-ui/react";
import Image from "next/image";
import TagsCss from "../../styles/components/Tags.module.css";

export default function TagMobile({ data }) {
  return (
    <Box
      position="relative"
      width="640px"
      height="360px"
      display="flex"
      my="10px"
      borderRadius="8px"
    >
      <Box
        display="flex"
        flexDirection="column"
        width="50%"
        position="relative"
        zIndex="5"
        p="15px"
      >
        <Box fontSize="24px">{data.name}</Box>
        <Box flex="1" mt="5px">
          {data.desc}
        </Box>
        <Box display="flex" alignItems="center">
          <Image
            src="/manga.png"
            alt="Picture of the author"
            width={24}
            height={26}
            draggable={false}
          />
          {data.count}
        </Box>
      </Box>
      <Box
        width="50%"
        overflow="hidden"
        borderTopRightRadius="8px"
        borderBottomRightRadius="8px"
        position="relative"
        zIndex="-8"
      >
        <Image
          src={data.img}
          alt="Picture of the author"
          layout="responsive"
          height={2}
          width={1}
          draggable={false}
        />
      </Box>
      <Box
        position="absolute"
        width="100%"
        height="100%"
        background="linear-gradient(90deg, rgba(0,0,0,1) 51%, rgba(255,255,255,0) 88%)"
        borderRadius="8px"
      ></Box>
    </Box>
  );
}
