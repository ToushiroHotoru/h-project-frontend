import { Flex, useColorModeValue } from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import useMangasStore from "@/zustand/mangas.zustand";

export default function MenuButton() {
  const togglerBgColor = useColorModeValue("gray.200", "black");
  const { setShowMenu } = useMangasStore(({ controls }) => controls);
  return (
    <Flex
      py="9px"
      height={9}
      width="40px"
      borderRadius="10px"
      cursor="pointer"
      ml="6px"
      justifyContent="center"
      bgColor={togglerBgColor}
      display={{ base: "flex", xl: "none" }}
      onClick={()=>setShowMenu(true)}
    >
      <IoMenu size="18px" />
    </Flex>
  );
}
