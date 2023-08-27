import { Text, Textarea, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import css from "../../styles/components/manga/Comments.module.css";
import axiosBack from "../../utils/axiosBack";
import { useState } from "react";
import { useRouter } from "next/router";
export default function MangaCommentsTextarea({ comments }) {
  const router = useRouter();
  const user = useSelector((store) => store.authReducer.user.id);
  const manga = router.query.id;
  const [comment, setComment] = useState("");
  const sendComment = async () => {
    const response = await axiosBack.post("/add_comment", {
      userId: user,
      mangaId: manga,
      text: comment,
    });
    setComment("");
    await axiosBack.get("/get_comments", {
      params: {
        mangaId: manga,
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
