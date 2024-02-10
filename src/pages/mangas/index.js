// системные импорты
import { useRouter } from "next/router";

// импорты сторонних модулей
import useSWR from "swr";
import axios from "@/utils/axios";

// импорты которые не относятся ни к системным ни к сторонним
import MangasLayout from "@/components/mangas/mangasLayout/MangasLayout";
import MangasErrorLayout from "@/components/mangas/mangasErrorLayout/MangasErrorLayout";

import useMangasStore from "@/zustand/mangas.zustand";
import { useEffect } from "react";

export default function Mangas() {
  const router = useRouter();
  const { setMangas, setTotalMangas, setPageOffset, setPageStep } =
    useMangasStore(({ controls }) => controls);

  const { data, error } = useSWR(
    [router.query.page, router.query.sort, router.query.tags],
    mangasFetcher
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

  return <MangasLayout />;
}
const mangasFetcher = async (page, sort, tags) => {
  const pageQ = page || 1;
  const sortQ = sort || "latest";
  const tagsQ = tags || null;
  const { data, status } = await axios.get("/mangas", {
    params: { page: pageQ, sort: sortQ, tags: tagsQ },
  });
  if (status !== 200) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await data;
    throw error;
  }

  return data;
};
