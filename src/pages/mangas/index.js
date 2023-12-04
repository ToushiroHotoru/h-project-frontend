// системные импорты
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

// импорты сторонних модулей
import useSWR from "swr";
import axios from "@/utils/axios";
import { FiList } from "react-icons/fi";
import { BsImage } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton, Flex, Box, HStack, Center } from "@chakra-ui/react";

// импорты которые не относятся ни к системным ни к сторонним
import MangaTile from "@/components/mangas/MangaTile";
import MangaList from "@/components/mangas/MangaList";
import Filter from "@/components/mangas/filter/Filter";
import Pagination from "@/components/mangas/Pagination";
import catalog from "@/styles/pages/Catalog.module.css";
import SelectedTagsList from "@/components/mangas/filter/selectedTagsList/SelectedTagsList";

export default function Mangas() {
  const router = useRouter();
  const [isToggled, setIsToggled] = useState(false);
  const selectedTags = useSelector((state) => state.selectedTagsSlice.tags);

  const { data, error } = useSWR(
    [router.query.tags, router.query.page, router.query.sort],
    fetcher
  );

  if (error) {
    return <>error occured</>;
  }

  return (
    <>
      <Head>
        <title>Каталог</title>
      </Head>

      <div className={catalog.catalog}>
        <div className="container">
          <HStack w="100%" align="center" justify="right">
            <Box>
              <SelectedTagsList selectedTags={selectedTags} size={"lg"} />
            </Box>
            <Box>
              <Filter />
            </Box>
            <Box>
              <div className={catalog.toggler}>
                <Center
                  className={`${catalog.toggle_common} ${
                    !isToggled && catalog.toggle_active
                  }`}
                  onClick={() => setIsToggled(false)}
                >
                  <BsImage />
                </Center>
                <Center
                  className={`${catalog.toggle_detail} ${
                    isToggled && catalog.toggle_active
                  }`}
                  onClick={() => setIsToggled(true)}
                >
                  <FiList />
                </Center>
              </div>
            </Box>
          </HStack>

          <div
            className={`${catalog.wrap} ${
              isToggled ? catalog.grid_detail : catalog.grid_common
            }`}
          >
            {!data && Skeletons()}
            {data && <MangaItems data={data} isToggled={isToggled} />}
          </div>

          {data && (
            <Pagination
              total={data.total}
              offset={data.offset}
              step={data.step}
            />
          )}
        </div>
      </div>
    </>
  );
}
const fetcher = async (selectedTags, page, sort) => {
  const pageQ = page || 1;
  const sortQ = sort || "latest";
  const tagsQ = selectedTags || null;
  const { data, status } = await axios.get("/mangas", {
    params: { page: pageQ, sort: sortQ, tags: tagsQ },
  });
  console.log(data);

  if (status !== 200) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await data;
    throw error;
  }

  return data;
};

const Skeletons = () => {
  return [...Array(24)].map((_, i) => {
    return (
      <Flex flexDirection="column" key={i + 1}>
        <Skeleton height="380px" />
      </Flex>
    );
  });
};

const MangaItems = ({ data, isToggled }) => {
  return (
    <>
      {data.mangas.map((item, i) => {
        return isToggled ? (
          <MangaList data={item} key={i + 1} />
        ) : (
          <MangaTile props={item} key={i + 1} />
        );
      })}
    </>
  );
};
// export async function getServerSideProps(params) {
//   const { query } = params;
//   console.log(params);
//   const data = await fetcher([], Number(query.page), query.sort);
//   console.log(data);
//   return { props: { data } };
// }
