import catalog from "../../styles/pages/Catalog.module.css";
import useSWR from "swr";
import MangaTile from "../../components/Mangas/MangaTile";
import MangaList from "../../components/Mangas/MangaList";
import Error from "../../components/partials/Error";
import Image from "next/image";
import Toggler from "../../components/Mangas/Toggler";
import { useState, useEffect } from "react";
import { Box, HStack, Button } from "@chakra-ui/react";
import Filter from "../../components/Mangas/Filter";
import Pagination from "../../components/Mangas/Pagination";
import { useRouter } from "next/router";

export default function Mangas() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const router = useRouter();
  const [isToggled, setIsToggled] = useState(false);
  const [sortType, setSortType] = useState("latest");

  const { data, error } = useSWR(
    `https://h-project.herokuapp.com/mangas?page=${router.query.page}&sort=${router.query.sort}`,
    // `http://localhost:8080/mangas?page=${pageIndex}&sort=${sortType}`,
    fetcher
  );

  const onLoadHander = () => {
    // router.push(`/mangas?&page=${Number(router.query.page) - 1}`, undefined, {
    //   shallow: true,
    // });
    console.log(router.query.page, router.query.sort);
  };

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

  useEffect(() => {
    if (!router.isReady) return;
    onLoadHander();
  }, [router.isReady]);

  return (
    <div className={catalog.catalog}>
      <div className="container">
        <HStack w="100%" align="center" justify="right">
          <Box>
            <Filter router={router} />
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
            router={router}
            total={data.total}
            offset={data.offset}
            step={data.step}
          />
        )}
      </div>
    </div>
  );
}
