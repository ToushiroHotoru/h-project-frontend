import {
  Box,
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import useStore from "@/zustand/reader.zustand";

import styleCommon from "@/components/reader/sideDrawer/SideDrawer.module.css";

export default function SideDrawer({ isOpen, onClose, btnRef }) {
  const { readerAltMode, quality, showMap } = useStore();
  const controls = useStore(({ controls }) => controls);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      className={styleCommon.drawer}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Настройки</DrawerHeader>

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
                Переход
              </Button>
              <Button
                flex="1"
                borderTopLeftRadius="0"
                borderBottomLeftRadius="0"
                colorScheme={readerAltMode ? "blue" : "gray"}
                onClick={() => controls.setReaderAltMode(true)}
              >
                Прокрутка
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
                Производительный
              </Button>
              <Button
                flex="1"
                borderRadius="0"
                colorScheme={quality === 50 ? "blue" : "gray"}
                onClick={() => controls.setQuality(50)}
              >
                Сбалансированный
              </Button>
              <Button
                flex="1"
                borderTopLeftRadius="0"
                borderBottomLeftRadius="0"
                colorScheme={quality === 100 ? "blue" : "gray"}
                onClick={() => controls.setQuality(100)}
              >
                Качество
              </Button>
            </Flex>
          </Box>
          <Box>
            <Box mt="2em" fontSize="18px">
              Карта страниц:
            </Box>
            <Flex w="100%">
              <Button
                borderTopRightRadius="0"
                borderBottomRightRadius="0"
                flex="1"
                colorScheme={showMap ? "gray" : "blue"}
                onClick={() => controls.setShowMap(false)}
              >
                Выкл.
              </Button>
              <Button
                flex="1"
                borderTopLeftRadius="0"
                borderBottomLeftRadius="0"
                colorScheme={showMap ? "blue" : "gray"}
                onClick={() => controls.setShowMap(true)}
              >
                Вкл.
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
