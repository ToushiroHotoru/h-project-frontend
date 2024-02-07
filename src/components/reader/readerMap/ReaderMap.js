import Image from "next/image";

import { MdClose } from "react-icons/md";
import { Flex, Divider, Box } from "@chakra-ui/react";
import useStore from "@/zustand/reader.zustand";

export default function ReaderMap() {
  const { mangaPages, showMap, currentPage, mangaTitle } = useStore();
  const { setShowMap, setCurrentPage } = useStore(({ controls }) => controls);

  const closeReaderMap = () => {
    setShowMap(false);
  };

  if (!showMap) return;

  return (
    <Flex
      py="20px"
      flexDirection="column"
      alignItems="center"
      position="fixed"
      height="100%"
      zIndex="10"
      top="0"
      left="0"
      width={{ base: "120px", md: "300px" }}
      backgroundColor="#000"
    >
      <Box mt="-18px" ml="auto" onClick={closeReaderMap}>
        <MdClose size="1.8rem" />
      </Box>
      <Box overflowY="auto">
        {mangaPages &&
          mangaPages.map((item, i) => {
            return (
              <Box
                key={i + 1}
                fontSize="14px"
                px="5px"
                onClick={() => setCurrentPage(i + 1)}
              >
                <Flex
                  flexDirection="column"
                  alignItems="center"
                  border={
                    currentPage === i + 1
                      ? "2px solid green"
                      : "2px solid transparent"
                  }
                  m="-2px"
                >
                  <Image
                    src={item.image}
                    quality="1"
                    alt={`${mangaTitle} - страница ${i + 1}`}
                    width={160}
                    height={220}
                  />
                </Flex>
                <Box textAlign="center">{i + 1}</Box>
                {i + 1 < mangaPages.length ? (
                  <Divider my="10px" width="100%" bg="#fff" />
                ) : (
                  ""
                )}
              </Box>
            );
          })}
      </Box>
    </Flex>
  );
}
