import AuthAvatar from "./AuthAvatar";
import AuthFavoritesCSS from "../../styles/components/AuthFavorites.module.css";
import Image from "next/image";
import { Box, Center, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function AuthEnd({ username }) {
  const [uploadFlag, setUploadFlag] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarsOffset, setAvatarsOffset] = useState(1);
  const [currentAvatars, setCurrentAvatars] = useState([]);
  const step = 5;

  const [avatars, setAvatars] = useState([
    "/avatar(NY).png",
    "/avatar.png",
    "/avatar1.png",
    "/avatar2.png",
    "/avatar3.jpg",
    "/avatar4.jpg",
    "/avatar5.jpg",
    "/avatar6.png",
    "/avatar7.jpg",
    "/avatar8.jpg",
    "/avatar9.png",
    "/avatar10.jpg",
  ]);

  const onClickPrevBtnHandler = () => {
    if (avatarsOffset != 1) {
      setAvatarsOffset((prevOffset) => prevOffset - 1);
    }
  };

  const onClickNextBtnHandler = () => {
    setAvatarsOffset((prevOffset) => prevOffset + 1);
  };

  useEffect(() => {
    // из массива всех аватарок создается массив, который содержит 5 аватарок для отображения
    setCurrentAvatars([
      ...avatars.slice((avatarsOffset - 1) * step, avatarsOffset * step),
    ]);
  }, [avatarsOffset]);

  return (
    <>
      <Center>
        <Box className={AuthFavoritesCSS.avatarsWrapper}>
          <Image
            src={
              avatarPreview.length == 0
                ? "/zero.png"
                : uploadFlag
                ? URL.createObjectURL(avatarPreview)
                : avatarPreview
            }
            alt="Picture of the author"
            width={100}
            height={100}
            objectFit="cover"
            draggable="false"
          />
          <input
            className={AuthFavoritesCSS.image_upload}
            type="file"
            name="myImage"
            onChange={(e) => {
              setUploadFlag(true);
              setAvatarPreview(e.target.files[0]);
            }}
          />
        </Box>
      </Center>
      <Center fontSize="24px" mt="15px">
        {username ? username : "no username"}
      </Center>
      <Center>
        <Button onClick={onClickPrevBtnHandler}>Prev</Button>
        <Box className={AuthFavoritesCSS.avatars}>
          {currentAvatars.map((item, i) => {
            return (
              <AuthAvatar
                avatarImgUrl={item}
                key={i + 1}
                avatarPreview={avatarPreview}
                setAvatarPreview={(val) => {
                  setUploadFlag(false);
                  setAvatarPreview(val);
                }}
              />
            );
          })}
        </Box>
        <Button onClick={onClickNextBtnHandler}>Next</Button>
      </Center>
    </>
  );
}
