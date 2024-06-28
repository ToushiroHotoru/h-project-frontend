import axios from "@/utils/axios";
import MangasScreen from "@/screens/mangas/Mangas.screen";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function Mangas({ tags }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MangasScreen tags={tags} />
    </QueryClientProvider>
  );
}

export async function getStaticProps() {
  try {
    const tags = await axios.get(`/tags/all`);

    return {
      props: { tags: tags.data.data.tags },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error);
  }
}
