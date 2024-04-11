import { Heading, Button } from "@chakra-ui/react";

import style from "@/styles/components/manga/Comments.module.css";
import useAuthStore from "@/zustand/auth.zustand";

export default function MangaCommentsNotAuth() {
  const { openAuthModal } = useAuthStore((state) => state.controls);

  return (
    <section className={style.comments}>
      <Heading as="h2" mb="8px" fontSize="28px">
        Комментарии
      </Heading>

      <Button mt="5px" onClick={openAuthModal}>
        Авторизуйтесь, для комментария
      </Button>
    </section>
  );
}
