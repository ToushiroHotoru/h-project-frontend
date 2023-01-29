import {
  Tag,
  TagLabel,
  TagCloseButton,
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
import { LINK } from "../../libs/changeApiUrl.js";
import { useState, useEffect } from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BsFillTriangleFill } from "react-icons/bs";
import { FiRotateCcw } from "react-icons/fi";

export default function Filter({ router }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTags, setShowTags] = useState(false);

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

  // const tagsArrayToUrl = async () => {
  //   let tagsArray = "";

  //   if (selectedTags.length != 0) {
  //     tagsArray += `?tags=${selectedTags[0]["id"]}`;
  //     if (selectedTags.length > 1) {
  //       for (let i = 1; i < selectedTags.length; i++) {
  //         tagsArray += `&tags=${selectedTags[i]["id"]}`;
  //       }
  //     }
  //   }
  //   return tagsArray;
  // };

  const getTagsFunc = async () => {
    try {
      let tagsToSend = selectedTags.map((item) => item["id"]);

      let url =
        tagsToSend.length != 0
          ? `${LINK}/get_tags_count?` +
            new URLSearchParams({
              tags: tagsToSend,
            })
          : `${LINK}/get_tags_count`;
      const res = await fetch(url);
      const result = await res.json();
      setTags(result.tags);
    } catch (err) {
      console.log(err.message);
    }
  };

  const setSortFunc = (sortType) => {
    router.push(
      `/mangas?page=${router.query.page}&sort=${sortType}`,
      undefined,
      {
        shallow: true,
      }
    );
  };

  const selectTagFunc = (id) => {
    const prevSelectedTags = [...selectedTags];
    for (let i = 0; i < prevSelectedTags.length; i++) {
      if (prevSelectedTags[i] == id) {
        prevSelectedTags.push(id);
      } else {
        prevSelectedTags.splice(prevSelectedTags.indexOf(id), 1);
      }
    }

    setSelectedTags(prevSelectedTags);
  };

  useEffect(() => {
    getTagsFunc();
  }, [selectedTags]);

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
                      setSortFunc("latest");
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
                      setSortFunc("alphabet");
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
                      setSortFunc("rating");
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
                      setSortFunc("likes");
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
                      setSortFunc("views");
                    }}
                  >
                    <BsFillEyeFill size="50%" />
                  </Box>
                </Tooltip>
              </Flex>
              <Box mt="0.8em">
                <InputGroup
                  onClick={() => {
                    setShowTags(!showTags);
                    setFilteredTags(() => {
                      return [...tags];
                    });
                  }}
                >
                  <Input
                    placeholder="Список тегов"
                    cursor="pointer"
                    _placeholder={{ opacity: 0.5, color: "#fff" }}
                    onChange={(e) => {
                      if (e.target.value.length != 0) {
                        setShowTags(true);
                        setFilteredTags(() => {
                          return tags.filter((item) => {
                            return item["name"].includes(e.target.value);
                          });
                        });
                      } else {
                        setFilteredTags(() => {
                          return [...tags];
                        });
                      }
                    }}
                  />
                  <InputRightElement
                    children={
                      <BsFillTriangleFill
                        style={showTags && { transform: "rotate(180deg)" }}
                      />
                    }
                  />
                </InputGroup>
                {showTags && (
                  <Box
                    backgroundColor="#000"
                    maxHeight="200px"
                    overflowY="auto"
                  >
                    {filteredTags.map((item, i) => {
                      return (
                        <Box
                          key={i + 1}
                          lineHeight="35px"
                          borderBottom="1px solid gray"
                          padding="0 10px"
                          cursor="pointer"
                          onClick={() => {
                            let prevSelectedTags = [...selectedTags];
                            prevSelectedTags.push(item);
                            setSelectedTags(prevSelectedTags);
                          }}
                        >
                          {` ${item["name"]}  (${item["count"]})`}
                        </Box>
                      );
                    })}
                  </Box>
                )}
                <Box mt="0.8em">
                  {selectedTags.map((item, i) => {
                    return (
                      <Tag
                        size="md"
                        minWidth="100px"
                        width="auto"
                        key={i + 1}
                        variant="solid"
                        mx="3px"
                        colorScheme="black"
                      >
                        <TagLabel>{item["name"]}</TagLabel>
                        <TagCloseButton
                          ml="auto"
                          onClick={() => {
                            selectTagFunc(item["_id"]);
                          }}
                        />
                      </Tag>
                    );
                  })}
                </Box>
              </Box>
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
