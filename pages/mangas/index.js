import catalog from "../../styles/pages/Catalog.module.css";
import useSWR from "swr";
import MangaTile from "../../components/Mangas/MangaTile";
import MangaList from "../../components/Mangas/MangaList";
import Error from "../../components/partials/Error";
import Image from "next/image";
import Toggler from "../../components/Mangas/Toggler";
import { useState } from "react";
import { Flex, Box, HStack, Button } from "@chakra-ui/react";
import Filter from "../../components/Mangas/Filter";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";

export default function Mangas() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const [isToggled, setIsToggled] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const { data, error } = useSWR(
    // `https://h-project.herokuapp.com/mangas?page=${pageIndex}`,
    `http://localhost:8080/mangas?page=${pageIndex}`,
    fetcher
  );

  // if (data) {
  //   console.log(Array(Math.ceil(data.total / 8)));
  //   console.log(Array(Math.ceil(data.total / 8)).length);
  //   [...Array(Math.ceil(data.total / 8))].forEach((_, i) => {
  //     console.log(i);
  //   });
  // }

  if (error)
    return (
      <Error>
        <Image
          src="/manga_cover/cover_error.png"
          layout="intrinsic"
          alt="error"
          width={723}
          height={693}
        />
      </Error>
    );

  return (
    <div className={catalog.catalog}>
      <div className="container">
        <HStack w="100%" align="center" justify="right">
          <Box>
            <Filter />
          </Box>
          <Box>
            <Toggler
              isToggled={isToggled}
              setIsToggled={(val) => {
                setIsToggled(val);
              }}
            />
          </Box>
        </HStack>

        <div
          className={`${catalog.wrap} ${
            isToggled ? catalog.grid_detail : catalog.grid_common
          }`}
        >
          {data &&
            data.mangas.map((item, i) => {
              return isToggled ? (
                <MangaList data={item} key={i + 1} />
              ) : (
                <MangaTile props={item} key={i + 1} />
              );
            })}
        </div>
        <div>
          <Button
            mx="2"
            colorScheme="pink"
            onClick={() => {
              setPageIndex(pageIndex - 1);
            }}
          >
            <MdOutlineArrowBackIosNew />
          </Button>
          {data &&
            [...Array(Math.ceil(data.total / 8))].map((_, i) => {
              return (
                <Button
                  key={i + 1}
                  mx="2"
                  colorScheme="pink"
                  onClick={() => {
                    setPageIndex(i);
                  }}
                >
                  {i + 1}
                </Button>
              );
            })}
          <Button
            mx="2"
            colorScheme="pink"
            onClick={() => {
              setPageIndex(pageIndex + 1);
            }}
          >
            <MdOutlineArrowForwardIos />
          </Button>
        </div>
      </div>
    </div>
  );
}
