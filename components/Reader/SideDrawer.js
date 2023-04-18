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
import SideDrawerCSS from "../../styles/components/SideDrawer.module.css";
import useStore from "../../zustand/reader.zustand";

export default function SideDrawer({ isOpen, onClose, btnRef }) {
  const { readerAltMode, quality, showMap } = useStore();
  const controls = useStore(({ controls }) => controls);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      className={SideDrawerCSS.drawer}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Settings</DrawerHeader>

        <DrawerBody>
          <Box>
            <Box my="5px" fontSize="18px">
              Режим чтения:
            </Box>
            <Flex w="100%">
              <Button
                borderTopRightRadius="0"
                borderBottomRightRadius="0"
                flex="1"
                colorScheme={readerAltMode ? "gray" : "blue"}
                onClick={() => controls.setReaderAltMode(false)}
              >
                Default MODE
              </Button>
              <Button
                flex="1"
                borderTopLeftRadius="0"
                borderBottomLeftRadius="0"
                colorScheme={readerAltMode ? "blue" : "gray"}
                onClick={() => controls.setReaderAltMode(true)}
              >
                Alternate MODE
              </Button>
            </Flex>
          </Box>
          <Box mt="2em">
            <Box my="5px" fontSize="18px">
              Качесто изображений:
            </Box>
            <Flex w="100%">
              <Button
                borderTopRightRadius="0"
                borderBottomRightRadius="0"
                flex="1"
                colorScheme={quality === 1 ? "blue" : "gray"}
                onClick={() => controls.setQuality(1)}
              >
                Perfomance MODE
              </Button>
              <Button
                flex="1"
                borderRadius="0"
                colorScheme={quality === 50 ? "blue" : "gray"}
                onClick={() => controls.setQuality(50)}
              >
                Balanced MODE
              </Button>
              <Button
                flex="1"
                borderTopLeftRadius="0"
                borderBottomLeftRadius="0"
                colorScheme={quality === 100 ? "blue" : "gray"}
                onClick={() => controls.setQuality(50)}
              >
                Quality MODE
              </Button>
            </Flex>
          </Box>
          <Box>
            <Box mt="2em" fontSize="18px">
              Map:
            </Box>
            <Flex w="100%">
              <Button
                borderTopRightRadius="0"
                borderBottomRightRadius="0"
                flex="1"
                colorScheme={showMap ? "gray" : "blue"}
                onClick={() => controls.setShowMap(false)}
              >
                OFF
              </Button>
              <Button
                flex="1"
                borderTopLeftRadius="0"
                borderBottomLeftRadius="0"
                colorScheme={showMap ? "blue" : "gray"}
                onClick={() => controls.setShowMap(true)}
              >
                ON
              </Button>
            </Flex>
          </Box>
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
