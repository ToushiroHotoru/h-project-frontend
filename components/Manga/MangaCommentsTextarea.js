import { Text, Textarea, Button } from "@chakra-ui/react";
import css from "../../styles/components/manga/Comments.module.css";

export default function MangaCommentsTextarea({ comments }) {
  return (
    <section className={css.comments}>
      <Text mb="8px">Комментарии</Text>
      <Textarea
        placeholder="Оставьте ваш комментарий"
        size="sm"
        resize="none"
      />
      <Button mt="5px">Отправить</Button>
    </section>
  );
}
