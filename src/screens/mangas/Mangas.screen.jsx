// системные импорты
import { useEffect } from "react";
import { useRouter } from "next/router";

// импорты сторонних модулей
import useSWR from "swr";

// импорты которые не относятся ни к системным ни к сторонним
import axios from "@/utils/axios";

import MangasLayout from "@/components/mangas/mangasLayout/MangasLayout";
import MangasErrorLayout from "@/components/mangas/mangasErrorLayout/MangasErrorLayout";
import useMangasStore from "@/zustand/mangas.zustand";

export default function MangasScreen({ tags }) {
  const router = useRouter();
  const {
    setMangas,
    setTotalMangas,
    setPageOffset,
    setPageStep,
    setMangasLoading,
  } = useMangasStore(({ controls }) => controls);

  const { data, error } = useSWR(
    [router.query.page, router.query.sort, router.query.tags, setMangasLoading],
    mangasFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    setMangas(data?.data.mangas);
    setPageOffset(data?.data.offset);
    setTotalMangas(data?.data.total);
    setPageStep(data?.data.step);
  }, [data?.data]);

  if (error) {
    return <MangasErrorLayout />;
  }

  return <MangasLayout tags={tags} />;
}

const mangasFetcher = async (page, sort, tags, setMangasLoading) => {
  console.log(2);

  try {
    setMangasLoading(true);

    const pageQ = page || 1;
    const sortQ = sort || "latest";
    const tagsQ = tags || null;
    const { data, status } = await axios.get("/mangas", {
      params: { page: pageQ, sort: sortQ, tags: tagsQ },
    });

    setMangasLoading(false);

    if (status !== 200) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = await data;
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
