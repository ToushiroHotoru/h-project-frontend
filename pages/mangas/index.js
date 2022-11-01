import catalog from "../../styles/pages/Catalog.module.css";
import useSWR from "swr";
import MangaTile from "../../components/Mangas/MangaTile";
import MangaList from "../../components/Mangas/MangaList";
import Error from "../../components/partials/Error";
import Image from "next/image";
import Toggler from "../../components/Mangas/Toggler";
import { useState } from "react";
import { Box, HStack, Button } from "@chakra-ui/react";
import Filter from "../../components/Mangas/Filter";
import Pagination from "../../components/Mangas/Pagination";

export default function Mangas() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const [isToggled, setIsToggled] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [sortType, setSortType] = useState("latest");

  const { data, error } = useSWR(
    // `https://h-project.herokuapp.com/mangas?page=${pageIndex}`,
    `http://localhost:8080/mangas?page=${pageIndex}&sort=${sortType}`,
    fetcher
  );

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
            <Filter
              sortType={sortType}
              setSortType={(val) => {
                setSortType(val);
              }}
            />
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

        {data && (
          <Pagination
            pageIndex={pageIndex}
            total={data.total}
            offset={data.offset}
            step={data.step}
            setPageIndex={(callback) => {
              setPageIndex(callback);
            }}
          />
        )}
      </div>
    </div>
  );
}
