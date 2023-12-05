import MangaCommentsEmpty from "./MangaCommentsEmpty";
import MangaCommentsExist from "./MangaCommentsExist";

export default function MangaComments({ comments }) {
  if (comments.length) {
    return <MangaCommentsExist comments={comments} />;
  }
  return <MangaCommentsEmpty />;
}
