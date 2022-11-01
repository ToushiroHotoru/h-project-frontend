import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Box,
  Tooltip,
  Center,
} from "@chakra-ui/react";
import {
  BsFillClockFill,
  BsSortAlphaDown,
  BsFillStarFill,
  BsFillHeartFill,
  BsFillEyeFill,
} from "react-icons/bs";
import css from "../../styles/components/Filter.module.css";

export default function Filter({ sortType, setSortType }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Расширенный поиск</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Расширенный поиск</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center">
            <Box w="100%">
              <Box>Сортировка</Box>
              <Flex w="100%" mt="10px">
                <Tooltip label="Дата" hasArrow>
                  <div
                    className={`${css.sort_item} ${
                      sortType === "latest" && css.sort_item_active
                    }`}
                    onClick={() => {
                      setSortType("latest");
                    }}
                  >
                    <BsFillClockFill size="50%" />
                  </div>
                </Tooltip>

                <Tooltip label="Алфавит" hasArrow>
                  <div
                    className={`${css.sort_item} ${
                      sortType === "alphabet" && css.sort_item_active
                    }`}
                    onClick={() => {
                      setSortType("alphabet");
                    }}
                  >
                    <BsSortAlphaDown size="50%" />
                  </div>
                </Tooltip>

                <Tooltip label="Рейтинг" hasArrow>
                  <div
                    className={`${css.sort_item} ${
                      sortType === "rating" && css.sort_item_active
                    }`}
                    onClick={() => {
                      setSortType("rating");
                    }}
                  >
                    <BsFillStarFill size="50%" />
                  </div>
                </Tooltip>

                <Tooltip label="Нравится" hasArrow>
                  <div
                    className={`${css.sort_item} ${
                      sortType === "like" && css.sort_item_active
                    }`}
                    onClick={() => {
                      setSortType("like");
                    }}
                  >
                    <BsFillHeartFill size="50%" />
                  </div>
                </Tooltip>

                <Tooltip label="Просмотры" hasArrow>
                  <Box
                    className={`${css.sort_item} ${
                      sortType === "view" && css.sort_item_active
                    }`}
                    onClick={() => {
                      setSortType("view");
                    }}
                  >
                    <BsFillEyeFill size="50%" />
                  </Box>
                </Tooltip>
              </Flex>
            </Box>
          </ModalBody>

          <ModalFooter d="flex" justifyContent="center">
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Сохранить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
