import { useRouter } from "next/router";
import MangaCommentsEmpty from "./MangaCommentsEmpty";
import MangaCommentsExist from "./MangaCommentsExist";
import { useState, useEffect } from "react";
import axiosBack from "../../libs/axiosBack.js";
export default function MangaComments() {
  const router = useRouter();
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const response = await axiosBack.get("/get_comments", {
      params: {
        mangaId: router.query.id,
      },
    });

    setComments(response.data.comments);
  };

  useEffect(() => {
    getComments();
  }, []);
  
  if (comments.length) {
    return <MangaCommentsExist comments={comments} />;
  }
  return <MangaCommentsEmpty />;
}
