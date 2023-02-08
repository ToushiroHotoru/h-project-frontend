import { Flex, Box, Tooltip } from "@chakra-ui/react";
import css from "../../../../styles/components/Filter.module.css";
import {
  BsFillClockFill,
  BsSortAlphaDown,
  BsFillStarFill,
  BsFillHeartFill,
  BsFillEyeFill,
} from "react-icons/bs";

export default function SortList({ router }) {
  const setSortFunc = (sortType) => {
    router.push(
      `/mangas?page=${router.query.page}&sort=${sortType}`,
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <>
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
    </>
  );
}
