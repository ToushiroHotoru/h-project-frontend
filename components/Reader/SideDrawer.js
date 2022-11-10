import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Flex,
  Box,
} from "@chakra-ui/react";

export default function SideDrawer({
  isOpen,
  onClose,
  btnRef,
  readerAltMode,
  setReaderAltMode,
}) {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Settings</DrawerHeader>

        <DrawerBody>
          <Box my="5px" fontSize="18px">
            Режим чтения:
          </Box>
          <Flex w="100%">
            <Button
              borderTopRightRadius="0"
              borderBottomRightRadius="0"
              flex="1"
              colorScheme={readerAltMode ? "gray" : "blue"}
              onClick={() => {
                setReaderAltMode();
              }}
            >
              Default MODE
            </Button>
            <Button
              flex="1"
              borderTopLeftRadius="0"
              borderBottomLeftRadius="0"
              colorScheme={readerAltMode ? "blue" : "gray"}
              onClick={() => {
                setReaderAltMode();
              }}
            >
              Alternate MODE
            </Button>
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button colorScheme="blue" w="100%" onClick={onClose}>
            Закрыть
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
