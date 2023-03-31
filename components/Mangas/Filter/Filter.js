import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
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
  Box,
  extendTheme,
} from "@chakra-ui/react";

import TagsList from "./TagsList/TagsList";
import SortList from "./SortList/SortList";
import SelectedTagsList from "./SelectedTagsList/SelectedTagsList";
import InputForFilter from "./InputForFilter/InputForFilter";
import { setSelectedTagsTest } from "../../../redux/selectedTagsSlice";
import { LINK } from "../../../libs/API_URL.js";

export default function Filter({ router }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTags, setShowTags] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  // const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

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

  const fetchTags = async () => {
    try {
      let url = new URL(`${LINK}/get_tags_count?`);
      url.search = new URLSearchParams({
        tags: selectedTags.map((item) => item["id"]),
      });

      const res = await fetch(encodeURI(url));
      const result = await res.json();
      setTags(result.tags);
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeTagFromSelected = (id) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.filter((item) => item["id"] != id)
    );
  };

  const inputGroupOnClickHandler = () => {
    setShowTags(!showTags);
    setFilteredTags(() => {
      return [...tags];
    });
  };

  const inputOnChange = (e) => {
    setIsFiltered(e.target.value ? true : false);
    setFilteredTags(() => {
      return e.target.value
        ? tags.filter((item) => {
            return item["name"].includes(e.target.value);
          })
        : tags;
    });
  };

  useEffect(() => {
    fetchTags();
    dispatch(setSelectedTagsTest(selectedTags));
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
              <SortList router={router} />
              <Box mt="0.8em">
                <InputForFilter
                  showTags={showTags}
                  inputOnChange={inputOnChange}
                  inputGroupOnClickHandler={inputGroupOnClickHandler}
                />

                {showTags && (
                  <TagsList
                    tags={isFiltered ? filteredTags : tags}
                    selectedTags={selectedTags}
                    setSelectedTags={(val) => {
                      setSelectedTags((prevSelectedTags) => {
                        return [...prevSelectedTags, val];
                      });
                    }}
                  />
                )}

                <SelectedTagsList
                  selectedTags={selectedTags}
                  removeTagFromSelected={(val) => removeTagFromSelected(val)}
                />
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
