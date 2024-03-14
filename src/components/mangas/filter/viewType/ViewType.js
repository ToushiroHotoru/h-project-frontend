import { FiList } from "react-icons/fi";
import { BsImage } from "react-icons/bs";
import { Flex, Center, useColorModeValue } from "@chakra-ui/react";

import useMangasStore from "@/zustand/mangas.zustand";

export default function ViewType() {
  const togglerBgColor = useColorModeValue("gray.200", "black");
  const togglerColorModeBgColor = useColorModeValue("gray.400", "#171717");

  const { viewType } = useMangasStore();
  const { setViewType } = useMangasStore(({ controls }) => controls);

  return (
    <Flex width="auto" justifyContent="center" ml="auto">
      <Center
        py="9px"
        height={9}
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
        height={9}
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
  );
}
