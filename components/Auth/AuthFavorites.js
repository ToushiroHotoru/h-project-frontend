import { useState, useEffect } from "react";

import useStore from "../../zustand/auth.zustand";
import {
  Input,
  Box,
  Center,
  Button,
  ModalFooter,
  ModalBody,
  Tag,
  Divider,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { LINK } from "../../libs/API_URL.js";
import instance from "../../libs/instance";

import AuthFavoritesCSS from "../../styles/components/Auth.module.css";
import AuthTag from "./AuthTag";

export default function AuthFavorites() {
  const { userId } = useStore();
  const controls = useStore(({ controls }) => controls);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortFlag, setSortFlag] = useState();
  const [sortedTags, setSortedTags] = useState([]);

  const getTagsFunc = async () => {
    try {
      const res = await instance.get(`get_tags`);
      const result = res.data;
      setTags(result.tags);
    } catch (err) {
      console.log(err.message);
    }
  };

  const sendFavoriteTags = async () => {
    try {
      const tagsIds = tags
        .filter((tag) => selectedTags.includes(tag["name"]))
        .map((item) => item._id);

      await fetch(`${LINK}/set_preferences_tags`, {
        method: "POST",
        body: JSON.stringify({
          id: userId,
          preferencesTags: tagsIds,
        }),
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const selectTagFunc = (id) => {
    const prevSelectedTags = [...selectedTags];

    if (prevSelectedTags.includes(id)) {
      prevSelectedTags.splice(prevSelectedTags.indexOf(id), 1);
    } else {
      prevSelectedTags.push(id);
    }
    setSelectedTags(prevSelectedTags);
    controls.setFavorites(prevSelectedTags);
  };

  // сортировка тегов по запросу
  const sortByQuery = (query) => {
    const prevTags = [...tags];
    const filteredTags = prevTags.filter((item) => {
      return item["name"].includes(query);
    });

    filteredTags.forEach((item) => {
      prevTags.splice(prevTags.indexOf(item), 1);
    });

    const newTags = [...filteredTags, ...prevTags];

    setSortedTags(newTags);
  };

  const toggleSort = () => {
    if (sortFlag) {
      return sortedTags;
    } else {
      return tags;
    }
  };

  useEffect(() => {
    getTagsFunc();
  }, []);

  return (
    <>
      <ModalBody p="0" mt="15px">
        <Center flexDirection="column">
          <Input
            type="text"
            width="100%"
            color="#000"
            bg="#fff"
            borderRadius="0"
            placeholder="Название тега"
            _placeholder={{ color: "#8b8b8b" }}
            onChange={(e) => {
              setSortFlag(e.target.value.length !== 0 ? true : false);
              sortByQuery(e.target.value);
            }}
          />
          <Divider mt="20px" width="100%" bg="#47f143" height="2px" />
          <div className={AuthFavoritesCSS.tags}>
            {toggleSort().length > 0 &&
              toggleSort().map((item, i) => {
                return (
                  <AuthTag
                    key={i + 1}
                    data={item}
                    selectTagFunc={selectTagFunc}
                    selectedTags={selectedTags}
                    type={"favs"}
                  />
                );
              })}
          </div>
          {selectedTags.length > 0 && (
            <Box className={AuthFavoritesCSS.subTags}>
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
                    <TagLabel>{item}</TagLabel>
                    <TagCloseButton
                      ml="auto"
                      onClick={() => selectTagFunc(item)}
                    />
                  </Tag>
                );
              })}
            </Box>
          )}
        </Center>
      </ModalBody>
      <ModalFooter display="flex" justifyContent="center" p={0} mt="15px">
        <Button
          // disabled={stage >= 4}
          bg={selectedTags.length != 0 ? "#47F143" : "#A2ACAB"} // #1F0A0E
          _hover={{ bg: selectedTags.length != 0 ? "#3FD23C" : "#727978" }}
          onClick={() => {
            controls.setStage(4);
            sendFavoriteTags();
          }}
        >
          {selectedTags.length !== 0 ? "Подтвердить" : "Пропустить"}
        </Button>
      </ModalFooter>
    </>
  );
}
