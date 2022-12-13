import AuthTag from "./AuthTag";
import { AuthContext } from "./AuthContext";
import AuthFavoritesCSS from "../../styles/components/AuthFavorites.module.css";
import {
  Input,
  Box,
  Center,
  Button,
  ModalFooter,
  ModalBody,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";

export default function AuthFavorites({ stage, setStage }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortFlag, setSortFlag] = useState();
  const [sortedTags, setSortedTags] = useState([]);
  const { favorites, setFavorites } = useContext(AuthContext);
  const [tags, setTags] = useState([
    { name: "Alan", img: "/tristana.png" },
    { name: "Alice", img: "/tristana.png" },
    { name: "Brom", img: "/tristana.png" },
    { name: "Bettie", img: "/tristana.png" },
    { name: "Clown", img: "/tristana.png" },
    { name: "Clara", img: "/tristana.png" },
    { name: "Dio", img: "/tristana.png" },
    { name: "Dalia", img: "/tristana.png" },
    { name: "Eren", img: "/tristana.png" },
    { name: "Eva", img: "/tristana.png" },
    { name: "Frank", img: "/tristana.png" },
    { name: "Fiora", img: "/tristana.png" },
    { name: "Hovard", img: "/tristana.png" },
    { name: "Hina", img: "/tristana.png" },
    { name: "Irven", img: "/tristana.png" },
    { name: "Ino", img: "/tristana.png" },
    { name: "Jostar", img: "/tristana.png" },
    { name: "Joulin", img: "/tristana.png" },
    { name: "Kenny", img: "/tristana.png" },
    { name: "Kiana", img: "/tristana.png" },
  ]);

  const selectTagFunc = (id) => {
    const prevSelectedTags = [...selectedTags];
    if (prevSelectedTags.includes(id)) {
      prevSelectedTags.splice(prevSelectedTags.indexOf(id), 1);
    } else {
      prevSelectedTags.push(id);
    }
    setSelectedTags(prevSelectedTags);
    setFavorites(prevSelectedTags);
  };

  // сортировка тегов по запросу
  const sortByQuery = (query) => {
    const prevTags = [...tags];
    const filteredTags = prevTags.filter((item) => {
      return item["name"].includes(query);
    });

    filteredTags.forEach((item) => {
      prevTags.splice(1, prevTags.indexOf(item));
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

  return (
    <>
      <ModalBody>
        <Center flexDirection="column">
          <Input
            type="text"
            width="445px"
            color="#000"
            bg="#fff"
            borderRadius="0"
            placeholder="Tag name..."
            _placeholder={{ color: "#000" }}
            onChange={(e) => {
              setSortFlag(e.target.value.length !== 0 ? true : false);
              sortByQuery(e.target.value);
            }}
          />
          <div className={AuthFavoritesCSS.tags}>
            {toggleSort().map((item, i) => {
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
          {selectedTags.length != 0 && (
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
      <ModalFooter display="flex" justifyContent="center">
        {/* <Button
          mr="1em"
          disabled={stage <= 1}
          onClick={() => {
            setStage(stage - 1);
          }}
        >
          back
        </Button> */}
        <Button
          disabled={stage >= 4}
          bg={selectedTags.length != 0 ? "#47F143" : "#A2ACAB"} // #1F0A0E
          _hover={{ bg: selectedTags.length != 0 ? "#3FD23C" : "#727978" }}
          onClick={() => {
            setStage(3);
          }}
        >
          {selectedTags.length != 0 ? "Подтвердить" : "Пропустить"}
        </Button>
      </ModalFooter>
    </>
  );
}
