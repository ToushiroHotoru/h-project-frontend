import Image from "next/image";

import { Box, Center, Flex } from "@chakra-ui/react";

export default function ErrorDefault({ code, message }) {
  console.log(code, message);
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      width="100%"
      height="100%"
      position="relative"
    >
      <Center flexDirection="column" fontSize="164px" fontWeight="800">
        {code}
        <Box fontSize="24px" fontWeight="400">
          {message}
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
  );
}
