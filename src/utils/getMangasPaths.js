import axios from "@/utils/axios";

export default async function getMangasPaths() {
  const { data } = await axios.get(`/get_paths`);
  return data.data;
}
