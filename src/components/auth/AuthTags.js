import { useState, useEffect } from "react";

import {
  Tag,
  Box,
  Input,
  Center,
  Button,
  Divider,
  TagLabel,
  ModalBody,
  ModalFooter,
  TagCloseButton,
} from "@chakra-ui/react";

import AuthTag from "./AuthTag";
import axios from "@/utils/axios";
import useStore from "@/zustand/register.zustand";
import css from "@/styles/components/Auth.module.css";

export default function AuthTags() {
  const { userId, stage, favorites } = useStore();
  const controls = useStore(({ controls }) => controls);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortFlag, setSortFlag] = useState();
  const [sortedTags, setSortedTags] = useState([]);

  const getTagsFunc = async () => {
    try {
      const res = await axios.get(`get_tags`);
      const result = res.data;
      setTags(result.tags);
    } catch (err) {
      console.log(err.message);
    }
  };

  const sendTags = async () => {
    try {
      console.log(stage, "<<<");

      const tagsIds = tags
        .filter((tag) => selectedTags.includes(tag["name"]))
        .map((item) => item._id);

      await axios.post(
        `${stage == 4 ? "set_exceptions_tags" : "set_preferences_tags"}`,
        {
          // id: userId
          id: userId,
          tags: tagsIds,
        }
      );

      setSelectedTags([]); // !delete later
      controls.setStage(stage == 3 ? 4 : 5);
      console.log(stage, "<<<");
    } catch (err) {
      console.log(err);
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
    if (stage == 3) controls.setFavorites(prevSelectedTags);
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
          <div className={css.tags}>
            {toggleSort().length > 0 &&
              toggleSort().map((item, i) => {
                return (
                  <AuthTag
                    key={i + 1}
                    data={item}
                    selectTagFunc={selectTagFunc}
                    selectedTags={selectedTags}
                    type={stage == 4 ? "unfavs" : "favs"}
                    isFavorited={
                      favorites ? favorites.includes(item.name) : false
                    }
                  />
                );
              })}
          </div>
          {selectedTags.length > 0 && (
            <Box className={css.subTags}>
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
          bg={
            selectedTags.length != 0
              ? stage == 3
                ? "#47F143"
                : "#F14343"
              : "#A2ACAB"
          } // #1F0A0E
          _hover={{
            bg:
              selectedTags.length != 0
                ? stage == 3
                  ? "#D03939"
                  : "#3FD23C"
                : "#727978",
          }}
          onClick={() => sendTags()}
        >
          {selectedTags.length !== 0 ? "Подтвердить" : "Пропустить"}
        </Button>
      </ModalFooter>
    </>
  );
}
