import axios from "@/utils/axios";
import MangasScreen from "@/screens/mangas/Mangas.screen";

export default function Mangas({ tags }) {
  return <MangasScreen tags={tags} />;
}

export async function getStaticProps() {
  try {
    const tags = await axios.get(`/tags`);

    return {
      props: { tags: tags.data.data.tags },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error);
  }
}
