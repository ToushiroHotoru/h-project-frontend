import catalog from "../../styles/pages/Catalog.module.css";
import useSWR from "swr";
import MangaTile from "../../components/Mangas/MangaTile";
import MangaList from "../../components/Mangas/MangaList";
import Error from "../../components/partials/Error";
import Image from "next/image";
import Toggler from "../../components/Mangas/Toggler";
import { useState } from "react";
import { Flex, Box, HStack, Button, Tooltip } from "@chakra-ui/react";
import Filter from "../../components/Mangas/Filter";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";

export default function Mangas() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const [isToggled, setIsToggled] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const pagination = () => {
    if (data) {
      console.log(data.offset, data.total);
      let start_page_offset = data.offset - data.step * 2;
      let end_page_offset = data.offset + data.step * 3;
      let page_offset = start_page_offset;
      let page_offsets = new Array();

      if (data.offset >= data.total || data.offset + data.step >= data.total) {
        end_page_offset = data.offset + data.step;
      } else if (data.offset + data.step * 2 >= data.total) {
        end_page_offset = data.offset + data.step * 2;
      }
      while (page_offset < end_page_offset) {
        if (page_offset >= 0) {
          page_offsets.push(page_offset);
        }
        page_offset += data.step;
      }

      page_offsets = page_offsets.map((item) => {
        if (item != 0) {
          item = Math.ceil(item / data.step);
        }
        return item;
      });
      return page_offsets;
    }
  };

  const { data, error } = useSWR(
    `https://h-project.herokuapp.com/mangas?page=${pageIndex}`,
    // `http://localhost:8080/mangas?page=${pageIndex}`,
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
            disabled={pageIndex === 0 ? true : false}
            onClick={() => {
              setPageIndex(pageIndex - 1);
            }}
          >
            <MdOutlineArrowBackIosNew />
          </Button>
          {data &&
            pagination().map((item, i) => {
              return (
                <Button
                  key={i + 1}
                  mx="2"
                  colorScheme={pageIndex === item ? "blue" : "pink"}
                  onClick={() => {
                    setPageIndex(item);
                  }}
                >
                  {item + 1}
                </Button>
              );
            })}
          <Tooltip label={true}>
            <Button
              mx="2"
              colorScheme="pink"
              disabled={
                pageIndex >= Math.ceil(data && data.total / data.step) - 1
                  ? true
                  : false
              }
              onClick={() => {
                setPageIndex(pageIndex + 1);
              }}
            >
              <MdOutlineArrowForwardIos />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
