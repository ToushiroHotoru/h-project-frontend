import { useEffect, useState } from "react";

import { getMangaDynamic } from "@/api/manga/getMangaDynamic";

export const useMangaDynamic = (id) => {
  const [mangaDynamic, setMangaDynamic] = useState([]);
  const [isMangaLoading, setIsMangaLoading] = useState(false);
  const getDynamicMangaData = async () => {
    try {
      setIsMangaLoading(true);
      const mangaDynamicData = await getMangaDynamic(id);
      setMangaDynamic(mangaDynamicData);
      setIsMangaLoading(false);
    } catch (err) {
      console.log(err);
      setIsMangaLoading(false);
    }
  };

  useEffect(() => {
    getDynamicMangaData();
  }, []);

  return { mangaDynamic, isMangaLoading };
};
