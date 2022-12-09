import { Input, Flex, Box, Center } from "@chakra-ui/react";
import Image from "next/image";
import AuthFavoritesCSS from "../../styles/components/AuthFavorites.module.css";
import { useState, useEffect } from "react";
import Tag from "./Tag";

export default function AuthFavorites({ stage, setStage }) {
  const [favorites, setFavorites] = useState([]);

  const add_favorites = (id) => {
    const prev = [...favorites];
    if (prev.includes(id)) {
      prev.splice(prev.indexOf(id), 1);
    } else {
      prev.push(id);
    }
    setFavorites(prev);
  };

  const example = [
    { name: "test", img: "/tristana.png" },
    { name: "test2", img: "/tristana.png" },
    { name: "test3", img: "/tristana.png" },
    { name: "test4", img: "/tristana.png" },
    { name: "test5", img: "/tristana.png" },
    { name: "test6", img: "/tristana.png" },
    { name: "test7", img: "/tristana.png" },
    { name: "test8", img: "/tristana.png" },
    { name: "test9", img: "/tristana.png" },
    { name: "test10", img: "/tristana.png" },
    { name: "test", img: "/tristana.png" },
    { name: "test2", img: "/tristana.png" },
    { name: "test3", img: "/tristana.png" },
    { name: "test4", img: "/tristana.png" },
    { name: "test5", img: "/tristana.png" },
    { name: "test6", img: "/tristana.png" },
    { name: "test7", img: "/tristana.png" },
    { name: "test8", img: "/tristana.png" },
    { name: "test9", img: "/tristana.png" },
    { name: "test10", img: "/tristana.png" },
  ];

  return (
    <Center flexDirection="column">
      <Input
        type="text"
        bg="#fff"
        color="#000"
        width="445px"
        borderRadius="0"
        className={AuthFavoritesCSS.input}
      />
      <div className={AuthFavoritesCSS.tags}>
        {example.map((item, i) => {
          return (
            <Tag
              key={i + 1}
              name={item.name}
              img={item.img}
              func={add_favorites}
            />
          );
        })}
      </div>
      {favorites &&
        favorites.map((item, i) => {
          return <div key={i + 1}>{item}</div>;
        })}
    </Center>
  );
}
