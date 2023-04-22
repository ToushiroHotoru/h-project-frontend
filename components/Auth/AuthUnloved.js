import { useState, useEffect, useContext } from "react";

import useStore from "../../zustand/auth.zustand";
import {
  Input,
  Box,
  Center,
  Button,
  ModalFooter,
  ModalBody,
  Divider,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";

import AuthFavoritesCSS from "../../styles/components/Auth.module.css";
import AuthTag from "./AuthTag";
import { LINK } from "../../libs/API_URL.js";

export default function AuthUnloved() {
  const { favorites, userId } = useStore();
  const controls = useStore(({ controls }) => controls);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortFlag, setSortFlag] = useState();
  const [sortedTags, setSortedTags] = useState([]);

  const getTagsFunc = async () => {
    try {
      const res = await fetch(`${LINK}/get_tags`);
      const result = await res.json();
      setTags(result.tags);
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

  const sendUnlovedTags = async () => {
    try {
      const tagsIds = tags
        .filter((tag) => selectedTags.includes(tag["name"]))
        .map((item) => item._id);

      await fetch(`${LINK}/set_exceptions_tags`, {
        method: "POST",
        body: JSON.stringify({
          id: userId,
          exceptionsTags: tagsIds,
        }),
      });
    } catch (err) {
      console.log(err.message);
    }
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
      <ModalBody p={0} mt="15px">
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
          <Divider mt="20px" width="100%" bg="#f14343" height="2px" />
          <div className={AuthFavoritesCSS.tags}>
            {toggleSort().length > 0 &&
              toggleSort().map((item) => {
                return (
                  <AuthTag
                    key={item._id}
                    data={item}
                    selectTagFunc={selectTagFunc}
                    selectedTags={selectedTags}
                    type={"unfavs"}
                    isFavorited={
                      favorites ? favorites.includes(item.name) : false
                    }
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
                      onClick={() => {
                        selectTagFunc(item);
                      }}
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
          bg={selectedTags.length !== 0 ? "#F14343" : "#A2ACAB"}
          _hover={{ bg: selectedTags.length !== 0 ? "#D03939" : "#727978" }}
          onClick={() => {
            controls.setFavorites([]); // ! delete later
            controls.setStage(5);
            sendUnlovedTags();
          }}
        >
          {selectedTags.length !== 0 ? "Подтвердить" : "Пропустить"}
        </Button>
      </ModalFooter>
    </>
  );
}
