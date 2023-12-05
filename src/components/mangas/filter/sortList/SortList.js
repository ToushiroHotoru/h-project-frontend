import { useRouter } from "next/router";

import {
  BsFillEyeFill,
  BsFillStarFill,
  BsFillHeartFill,
  BsFillClockFill,
  BsSortAlphaDown,
} from "react-icons/bs";
import { Flex, Box, Tooltip } from "@chakra-ui/react";

import css from "@/styles/components/Filter.module.css";

const sortTypes = [
  { name: "latest", tooltip: "Дата" },
  { name: "alphabet", tooltip: "Алфавит" },
  { name: "rating", tooltip: "Рейтинг" },
  { name: "likes", tooltip: "Нравится" },
  { name: "views", tooltip: "Просмотры" },
];

const iconRender = (sortType) => {
  switch (sortType) {
    case "latest":
      return <BsFillClockFill size="50%" />;
    case "alphabet":
      return <BsSortAlphaDown size="50%" />;
    case "rating":
      return <BsFillStarFill size="50%" />;
    case "likes":
      return <BsFillHeartFill size="50%" />;
    case "views":
      return <BsFillEyeFill size="50%" />;
    default:
      return <BsFillClockFill size="50%" />;
  }
};

const setSortFunc = ({ router, sortType }) => {
  router.push({
    pathname: `/mangas`,
    query: { page: router.query.page, sort: sortType },
    options: { shallow: true },
  });
};

export default function SortList() {
  const router = useRouter();

  return (
    <>
      <Box>Сортировка</Box>
      <Flex w="100%" mt="10px">
        {sortTypes.map((item, i) => {
          return (
            <Tooltip key={i + 1} label={item["tooltip"]} hasArrow>
              <div
                className={`${css.sort_item} ${
                  router.query.sort === item["name"] && css.sort_item_active
                }`}
                onClick={() => {
                  setSortFunc({
                    sortType: item["name"],
                    router: router,
                  });
                }}
              >
                {iconRender(item["name"])}
              </div>
            </Tooltip>
          );
        })}
      </Flex>
    </>
  );
}
