import { useState, useEffect } from "react";

import Image from "next/image";
import {
  Box,
  Center,
  Button,
  ModalFooter,
  ModalBody,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import useStore from "../../zustand/auth.zustand";

import AuthFavoritesCSS from "../../styles/components/Auth.module.css";
import AuthAvatar from "./AuthAvatar";
import { LINK as API_URL } from "../../libs/API_URL";

export default function AuthAvatars() {
  const { userId, userName } = useStore();
  const controls = useStore(({ controls }) => controls);
  const [uploadFlag, setUploadFlag] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("/zero.png");
  const [activeAvatar, setActiveAvatar] = useState(null);
  const [avatars, setAvatars] = useState([]);

  const getAvatarsFunc = async () => {
    const response = await fetch(`${API_URL}/get_avatars`);
    const data = await response.json();
    setAvatars(data.avatars);
  };

  const sendSelectedAvatar = async () => {
    try {
      const formData = new FormData();
      const avatar = !uploadFlag ? activeAvatar : avatarPreview;
      formData.append("id", userId);
      formData.append("isUpload", uploadFlag);
      formData.append("avatar", avatar);

      await fetch(`${API_URL}/set_avatar`, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAvatarsFunc();
  }, []);

  return (
    <>
      <ModalBody p={0} mt="15px">
        <Center>
          <Tooltip
            label="Click to choose your own image"
            defaultIsOpen
            hasArrow
            placement="left"
            bg="#43F1DC"
          >
            <Box className={AuthFavoritesCSS.avatarsWrapper}>
              <Image
                src={
                  uploadFlag
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
          </Tooltip>
        </Center>
        <Center fontSize="24px" mt="15px">
          {userName ? userName : "no username"}
        </Center>
        <Divider mt="20px" />
        <Center>
          <Box className={AuthFavoritesCSS.avatars_wrap}>
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={14}
              slidesPerView="auto"
              slidesPerGroup={3}
              className="auth_avatars"
            >
              {avatars.map((item, i) => {
                return (
                  <SwiperSlide key={item._id}>
                    <AuthAvatar
                      avatarImgUrl={item.image}
                      avatarPreview={avatarPreview}
                      avatarId={item._id}
                      setAvatarPreview={(val) => {
                        setUploadFlag(false);
                        setAvatarPreview(val);
                      }}
                      selectAvatar={(val) => {
                        setActiveAvatar(val);
                      }}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
        </Center>
        <Divider />
      </ModalBody>
      <ModalFooter display="flex" justifyContent="center" p={0} mt="15px">
        <Button
          bg={avatarPreview != "/zero.png" ? "#43F1DC" : "#A2ACAB"}
          _hover={{ bg: avatarPreview != "/zero.png" ? "#3DD7C4" : "#727978" }}
          onClick={() => {
            controls.setStage(6);
            sendSelectedAvatar();
          }}
        >
          {avatarPreview != "/zero.png" ? "Подтвердить" : "Пропустить"}
        </Button>
      </ModalFooter>
    </>
  );
}
