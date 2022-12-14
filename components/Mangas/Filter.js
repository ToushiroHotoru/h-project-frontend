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
  extendTheme,
} from "@chakra-ui/react";
import {
  BsFillClockFill,
  BsSortAlphaDown,
  BsFillStarFill,
  BsFillHeartFill,
  BsFillEyeFill,
} from "react-icons/bs";
import css from "../../styles/components/Filter.module.css";

export default function Filter({ router }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const theme = extendTheme({
    components: {
      Modal: {
        baseStyle: (props) => ({
          dialog: {
            bg: "#1A202C",
            boxShadow: "none",
          },
        }),
      },
    },
  });

  return (
    <>
      <Button onClick={onOpen}>Расширенный поиск</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xs" theme={theme}>
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
                      router.query.sort === "latest" && css.sort_item_active
                    }`}
                    onClick={() => {
                      router.push(
                        `/mangas?page=${router.query.page}&sort=latest`,
                        undefined,
                        {
                          shallow: true,
                        }
                      );
                    }}
                  >
                    <BsFillClockFill size="50%" />
                  </div>
                </Tooltip>

                <Tooltip label="Алфавит" hasArrow>
                  <div
                    className={`${css.sort_item} ${
                      router.query.sort === "alphabet" && css.sort_item_active
                    }`}
                    onClick={() => {
                      router.push(
                        `/mangas?page=${router.query.page}&sort=alphabet`,
                        undefined,
                        {
                          shallow: true,
                        }
                      );
                    }}
                  >
                    <BsSortAlphaDown size="50%" />
                  </div>
                </Tooltip>

                <Tooltip label="Рейтинг" hasArrow>
                  <div
                    className={`${css.sort_item} ${
                      router.query.sort === "rating" && css.sort_item_active
                    }`}
                    onClick={() => {
                      router.push(
                        `/mangas?page=${router.query.page}&sort=rating`,
                        undefined,
                        {
                          shallow: true,
                        }
                      );
                    }}
                  >
                    <BsFillStarFill size="50%" />
                  </div>
                </Tooltip>

                <Tooltip label="Нравится" hasArrow>
                  <div
                    className={`${css.sort_item} ${
                      router.query.sort === "likes" && css.sort_item_active
                    }`}
                    onClick={() => {
                      router.push(
                        `/mangas?page=${router.query.page}&sort=likes`,
                        undefined,
                        {
                          shallow: true,
                        }
                      );
                    }}
                  >
                    <BsFillHeartFill size="50%" />
                  </div>
                </Tooltip>

                <Tooltip label="Просмотры" hasArrow>
                  <Box
                    className={`${css.sort_item} ${
                      router.query.sort === "views" && css.sort_item_active
                    }`}
                    onClick={() => {
                      router.push(
                        `/mangas?page=${router.query.page}&sort=views`,
                        undefined,
                        {
                          shallow: true,
                        }
                      );
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
