import AuthFavoritesCSS from "../../styles/components/AuthFavorites.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AuthAvatar({
  avatarImgUrl, // путь изображения для этого
  avatarPreview, // превью изображения на главной
  setAvatarPreview,
}) {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // подсветка мини изобаржения снизу в зависимости от превью аватара
    setIsClicked(avatarImgUrl !== avatarPreview ? false : true);
  }, [avatarPreview, avatarImgUrl]);
  return (
    <div
      className={
        isClicked
          ? AuthFavoritesCSS.avatar_image_clicked
          : AuthFavoritesCSS.avatar_image
      }
      mx="1em"
      onClick={() => {
        // включение отключение рамки аватарки
        setIsClicked(true);
        // установка превью аватарки
        setAvatarPreview(avatarImgUrl);
      }}
    >
      <Image
        src={avatarImgUrl}
        width={70}
        height={70}
        alt="Picture of the author"
        draggable="false"
      />
    </div>
  );
}
