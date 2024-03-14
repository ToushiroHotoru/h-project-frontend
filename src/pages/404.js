import Image from "next/image";

import { Box, Center, Flex } from "@chakra-ui/react";

export default function Custom404() {
  return (
    <div className="container">
      <Flex
        flexDirection="column"
        justifyContent="center"
        width="100%"
        height="100%"
        minHeight="80vh"
        position="relative"
      >
        <Center
          flexDirection="column"
          fontSize="164px"
          fontWeight="800"
          alignItems="flex-end"
        >
          404
          <Box fontSize="24px" fontWeight="400">
            Такой страницы не сущенствует
          </Box>
        </Center>
        <Box position="absolute" bottom="0" zIndex="-5">
          <Image
            src="/404.png"
            alt="Picture of the author"
            width={800}
            height={800}
          />
        </Box>
      </Flex>
    </div>
  );
}
