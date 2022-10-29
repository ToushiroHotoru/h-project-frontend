import catalog from "../../styles/pages/Catalog.module.css";
import useSWR from "swr";
import MangaTile from "../../components/Mangas/MangaTile";
import MangaList from "../../components/Mangas/MangaList";
import Error from "../../components/partials/Error";
import Image from "next/image";
import Toggler from "../../components/Mangas/Toggler";
import { useState } from "react";
import { Flex, Box, HStack } from "@chakra-ui/react";
import Filter from "../../components/Mangas/Filter";

export default function Mangas() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const [isToggled, setIsToggled] = useState(false);

  const { data, error } = useSWR(
    "https://h-project.herokuapp.com/mangas",
    // "http://localhost:8080/mangas",
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
            data.map((item, i) => {
              return isToggled ? (
                <MangaList data={item} key={i + 1} />
              ) : (
                <MangaTile props={item} key={i + 1} />
              );
            })}
        </div>
      </div>
    </div>
  );
}
