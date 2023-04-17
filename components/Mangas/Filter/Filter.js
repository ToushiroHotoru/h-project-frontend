import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import instance from "../../../libs/instanceAutoToken";
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
import { parse, stringify } from "qs";

import TagsList from "./TagsList/TagsList";
import SortList from "./SortList/SortList";
import SelectedTagsList from "./SelectedTagsList/SelectedTagsList";
import InputForFilter from "./InputForFilter/InputForFilter";
import { setSelectedTagsTest } from "../../../redux/selectedTagsSlice";

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

export default function Filter() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTags, setShowTags] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filterValue, setFilterValue] = useState(false);
  // const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const fetchTags = async () => {
    try {
      const tags = selectedTags.map((item) => item["id"]);
      const res = await instance.get(
        "get_tags_count?" + new URLSearchParams({ tags: tags })
      );
      const result = res.data;
      console.log("TAGS", result);
      setTags(result.tags);
    } catch (err) {
      console.log(err.message);
    }
  };

  const filterTags = () => {
    switch (isFiltered) {
      case false:
        return tags;
      case true:
        return tags.filter((item) => item["name"].includes(filterValue));
    }
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
              <SortList />
              <Box mt="0.8em">
                <InputForFilter
                  showTags={showTags}
                  setIsFiltered={(val) => setIsFiltered(val)}
                  setFilterValue={(val) => setFilterValue(val)}
                  onClickHandler={() => setShowTags(!showTags)}
                />

                {showTags && (
                  <TagsList
                    tags={filterTags()}
                    addToSelectedTags={(val) => {
                      setSelectedTags((prevSelectedTags) => {
                        return [...prevSelectedTags, val];
                      });
                    }}
                  />
                )}

                <SelectedTagsList
                  selectedTags={selectedTags}
                  setSelectedTags={(val) => setSelectedTags(val)}
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
