import { Input, Flex, Box, Center } from "@chakra-ui/react";
import AuthFavoritesCSS from "../../styles/components/AuthFavorites.module.css";
import { useState, useEffect } from "react";
import AuthTag from "./AuthTag";
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from "@chakra-ui/react";

export default function AuthFavorites({ stage, setStage }) {
  const [favorites, setFavorites] = useState([]);
  const [filterToggler, setFilterToggler] = useState();

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
  const [filteredTags, setFilteredTags] = useState([]);

  const add_favorites = (id) => {
    const prev_favorites = [...favorites];
    if (prev_favorites.includes(id)) {
      prev_favorites.splice(prev_favorites.indexOf(id), 1);
    } else {
      prev_favorites.push(id);
    }
    setFavorites(prev_favorites);
  };

  const filter_by_query = (query) => {
    console.log(query);
    const prev_tags = [...tags];
    const filtered_tags = prev_tags.filter((item) => {
      return item["name"].includes(query);
    });

    filtered_tags.forEach((item) => {
      prev_tags.splice(1, prev_tags.indexOf(item));
    });

    const new_tags = [...filtered_tags, ...prev_tags];

    console.log(new_tags);
    setFilteredTags(new_tags);
  };

  const toggle_filter = () => {
    if (filterToggler) {
      return filteredTags;
    } else {
      return tags;
    }
  };

  return (
    <Center flexDirection="column">
      <Input
        type="text"
        bg="#fff"
        color="#000"
        width="445px"
        borderRadius="0"
        placeholder="Tag name..."
        _placeholder={{ color: "#000" }}
        className={AuthFavoritesCSS.input}
        onChange={(e) => {
          if (e.target.value.length !== 0) {
            setFilterToggler(true);
          } else {
            setFilterToggler(false);
          }
          filter_by_query(e.target.value);
        }}
      />
      <div className={AuthFavoritesCSS.tags}>
        {toggle_filter().map((item, i) => {
          return (
            <AuthTag
              key={i + 1}
              name={item.name}
              img={item.img}
              func={add_favorites}
              favorites={favorites}
              isFavorites={true}
            />
          );
        })}
      </div>
      {favorites.length != 0 && (
        <Box
          display="flex"
          maxWidth="445px"
          height="60px"
          alignItems="center"
          overflowX="scroll"
          mt="10px"
        >
          {favorites.map((item, i) => {
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
                    add_favorites(item);
                  }}
                />
              </Tag>
            );
          })}
        </Box>
      )}
    </Center>
  );
}
