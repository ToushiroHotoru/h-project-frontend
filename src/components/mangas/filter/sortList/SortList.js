import { useRouter } from "next/router";

import {
  BsFillEyeFill,
  BsFillHeartFill,
  BsFillClockFill,
  BsSortAlphaDown,
} from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { Flex, Box, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useMangasStore from "@/zustand/mangas.zustand";
import useComponentVisible from "@/hooks/useComponentVisible";
const sortTypes = [
  { type: "latest", title: "Дата" },
  { type: "alphabet", title: "Алфавит" },
  { type: "likes", title: "Нравится" },
  { type: "views", title: "Просмотры" },
];

export default function SortList() {
  const router = useRouter();
  const { sortType } = useMangasStore();
  const { setSortType } = useMangasStore(({ controls }) => controls);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const dropDownBgColor = useColorModeValue("#fff", "#000");
  const dropDownItemBgHover = useColorModeValue("#eee", "#1c1c1c");

  useEffect(() => {
    if (router.query.sort) {
      const currentSort = sortTypes.filter(
        (sort) => sort.type === router.query.sort
      )[0];
      setSortType(currentSort);
    }
  }, [router.query.sort]);

  const setCurrentSortType = (sort) => {
    setSortType(sort);
    setIsComponentVisible(false);
    const tags = router.query.tags ? { tags: router.query.tags } : {};
    const page = router.query.page ? { page: router.query.page } : {};
    router.push({
      pathname: `/mangas`,
      query: {
        sort: sort.type,
        ...page,
        ...tags,
      },
      options: { shallow: true },
    });
  };
  return (
    <Box width="200px" ref={ref} mr="6px">
      <Box fontSize="14px">Сортировка</Box>
      <Box position="relative" zIndex={3}>
        <Box
          height={9}
          width="100%"
          border="1px solid grey"
          padding="4px 16px"
          borderRadius="10px"
          cursor="pointer"
          onClick={() => setIsComponentVisible(!isComponentVisible)}
        >
          {sortType.title}
          <Box
            position="absolute"
            top="50%"
            right="10px"
            transform={
              isComponentVisible
                ? "translateY(-50%) rotate(180deg)"
                : "translateY(-50%)"
            }
          >
            <IoIosArrowDown size="16px" />
          </Box>
        </Box>
        {isComponentVisible ? (
          <Box
            position="absolute"
            top="100%"
            mt="4px"
            width="100%"
            border="1px solid grey"
            py="4px"
            borderRadius="10px"
            backgroundColor={dropDownBgColor}
            overflow="hidden"
          >
            {sortTypes.map((item) => (
              <Flex
                alignItems="center"
                color={sortType.type === item.type ? "var(--pink)" : ""}
                key={item.type}
                padding="6px 16px"
                cursor="pointer"
                gap="10px"
                fontSize="1rem"
                lineHeight="1.1rem"
                onClick={() => setCurrentSortType(item)}
                transitionDuration=".3s"
                transitionProperty="background"
                _hover={{ backgroundColor: dropDownItemBgHover }}
              >
                {iconRender(item.type)} {item.title}
              </Flex>
            ))}
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

const iconRender = (sortType) => {
  switch (sortType) {
    case "latest":
      return <BsFillClockFill size="20px" />;
    case "alphabet":
      return <BsSortAlphaDown size="20px" />;
    case "likes":
      return <BsFillHeartFill size="20px" />;
    case "views":
      return <BsFillEyeFill size="20px" />;
    default:
      return <BsFillClockFill size="20px" />;
  }
};

const setSortFunc = ({ router, sortType }) => {
  router.push({
    pathname: `/mangas`,
    query: { page: router.query.page || 1, sort: sortType },
    options: { shallow: true },
  });
};
