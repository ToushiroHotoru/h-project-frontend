import { FiList } from "react-icons/fi";
import { BsImage } from "react-icons/bs";
import { Flex, HStack, Center, useColorModeValue } from "@chakra-ui/react";

import Filter from "@/components/mangas/filter/Filter";
import SelectedTagsList from "@/components/mangas/filter/selectedTagsList/SelectedTagsList";

import mangasStore from "@/zustand/mangas.zustand";

export default function MangasTop() {
  const togglerBgColor = useColorModeValue("gray.200", "black");
  const togglerColorModeBgColor = useColorModeValue("gray.400", "#171717");

  const { viewType } = mangasStore();
  const { setViewType } = mangasStore(({ controls }) => controls);

  return (
    <HStack w="100%" align="center" justify="right">
      {/* <SelectedTagsList selectedTags={selectedTags} size={"lg"} /> */}
      <Filter />
      <Flex width="auto" justifyContent="center">
        <Center
          py="9px"
          width="40px"
          borderRadius="10px 0 0 10px"
          cursor="pointer"
          bgColor={[
            togglerBgColor,
            viewType === "grid" ? togglerColorModeBgColor : "",
          ]}
          onClick={() => setViewType("grid")}
        >
          <BsImage />
        </Center>
        <Center
          py="9px"
          width="40px"
          borderRadius="0 10px 10px 0"
          cursor="pointer"
          bgColor={[
            togglerBgColor,
            viewType === "list" ? togglerColorModeBgColor : "",
          ]}
          onClick={() => setViewType("list")}
        >
          <FiList />
        </Center>
      </Flex>
    </HStack>
  );
}
