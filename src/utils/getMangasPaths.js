import axios from "@/utils/axios";

export default async function getMangasPaths() {
  const { data } = await axios.get(`/manga-canonical-paths`);
  return data.data;
}
