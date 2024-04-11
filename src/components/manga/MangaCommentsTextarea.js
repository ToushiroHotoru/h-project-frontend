import { useState } from "react";
import { useRouter } from "next/router";

import { Text, Textarea, Button, Heading } from "@chakra-ui/react";

import axios from "@/utils/axios";
import css from "@/styles/components/manga/Comments.module.css";

export default function MangaCommentsTextarea({ comments }) {
  const router = useRouter();
  const manga = router.query.id;
  const [comment, setComment] = useState("");
  const sendComment = async () => {
    const response = await axios.post("/comments/add-comment-to-manga", {
      mangaId: manga,
      text: comment,
    });
    setComment("");
    await axios.get("/comments/manga-comments", {
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
      <Heading as="h2" mb="8px" fontSize="28px">
        Комментарии
      </Heading>
      <Textarea
        placeholder="Оставьте ваш комментарий"
        size="sm"
        resize="none"
        onChange={getComment}
        value={comment}
      />
      <Button mt="5px" onClick={sendComment}>
        Отправить
      </Button>
    </section>
  );
}
