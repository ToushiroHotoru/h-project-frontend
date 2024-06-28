import Image from "next/image";

import { Box, Flex } from "@chakra-ui/react";

export default function ErrorDefault({ code, message }) {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      width="100%"
      height="100%"
      position="relative"
    >
      <Flex
        flexDirection="column"
        fontSize="164px"
        fontWeight="800"
        alignItems="flex-end"
      >
        {code}
        <Box fontSize="24px" fontWeight="400">
          {message}
        </Box>
      </Flex>

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        zIndex="-1"
        width="50vw"
        height="100%"
      >
        <Image
          src="/404.png"
          alt="Изображение об ошибке"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </Box>
    </Flex>
  );
}
