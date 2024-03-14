import { Flex } from "@chakra-ui/react";

import SortList from "./../filter/sortList/SortList";
import ViewType from "./../filter/viewType/ViewType";
import MenuButton from "./../filter/menuButton/MenuButton";

export default function MangasTop() {
  return (
    <Flex width="100%" alignItems="flex-end">
      <SortList />
      <ViewType />
      <MenuButton />
    </Flex>
  );
}
