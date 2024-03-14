import { Box, useColorModeValue } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";

import useMangasStore from "@/zustand/mangas.zustand";
import MangasTags from "@/components/mangas/mangasTags/MangasTags.jsx";

export default function MangasAside({ tags }) {
  const { showMenu } = useMangasStore((state) => state);
  const { setShowMenu } = useMangasStore((state) => state.controls);
  const mangasAsideBackground = useColorModeValue("#fff", "gray.800");
  const mangasAsideCloseButtonBackground = useColorModeValue(
    "gray.200",
    "gray.900"
  );

  return (
    <Box
      position={{ base: "fixed", xl: "static" }}
      top={0}
      right={0}
      width={{ base: "100%", sm: "300px" }}
      height="100%"
      padding={{ base: "20px 15px", xl: 0 }}
      backgroundColor={{ base: mangasAsideBackground, xl: "transparent" }}
      zIndex={999}
      transitionDuration=".3s"
      transitionProperty="transform"
      transitionTimingFunction="ease"
      transform={{
        base: showMenu ? "translateX(0)" : "translateX(100%)",
        xl: "translateX(0)",
      }}
    >
      <Box
        display={{ base: "flex", xl: "none" }}
        position="absolute"
        top="0"
        right="0"
        width="36px"
        height="36px"
        backgroundColor={mangasAsideCloseButtonBackground}
        alignItems="center"
        borderBottomLeftRadius="5px"
        justifyContent="center"
        cursor="pointer"
        zIndex={2}
        onClick={() => setShowMenu(false)}
      >
        <IoMdClose size="20px" />
      </Box>
      <Box position="sticky" top="0">
        <MangasTags tags={tags} />
      </Box>
    </Box>
  );
}
