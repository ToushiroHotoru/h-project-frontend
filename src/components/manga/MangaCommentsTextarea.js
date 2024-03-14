import { useState } from "react";
import { useRouter } from "next/router";

import { Text, Textarea, Button } from "@chakra-ui/react";

import axiosBack from "@/utils/axios";
import css from "@/styles/components/manga/Comments.module.css";

export default function MangaCommentsTextarea({ comments }) {
  const router = useRouter();
  const manga = router.query.id;
  const [comment, setComment] = useState("");
  const sendComment = async () => {
    const response = await axiosBack.post("/add-comment-to-manga", {
      mangaId: manga,
      text: comment,
    });
    setComment("");
    await axiosBack.get("/manga-comments", {
      params: {
        route: manga,
      },
    });
  };
  const getComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <section className={css.comments}>
      <Text mb="8px">Комментарии</Text>
      <Textarea
        placeholder="Оставьте ваш комментарий"
        size="sm"
        resize="none"
        onChange={getComment}
      />
      <Button mt="5px" onClick={sendComment}>
        Отправить
      </Button>
    </section>
  );
}
