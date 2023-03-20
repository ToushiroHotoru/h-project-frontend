import Image from "next/image";
import { useState, useContext, useEffect } from "react";
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

import AuthFavoritesCSS from "../../styles/components/Auth.module.css";
import AuthAvatar from "./AuthAvatar";
import { AuthContext } from "./AuthContext";
import { LINK } from "../../libs/changeApiUrl";
import "swiper/css";
import "swiper/css/navigation";


export default function AuthAvatars({ setStage }) {
  const [uploadFlag, setUploadFlag] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("/zero.png");
  const { usernameContext, setUsernameContext } = useContext(AuthContext);

  const getAvatarsFunc = async () => {
    const response = await fetch(`${LINK}/get_avatars`);
    const data = await response.json();

    setAvatars(data.avatars);
  };

  const [avatars, setAvatars] = useState([]);
  // const [avatars, setAvatars] = useState([
  //   "/avatar(NY).png",
  //   "/avatar.png",
  //   "/avatars/avatar1.png",
  //   "/avatars/avatar2.png",
  //   "/avatars/avatar3.jpg",
  //   "/avatars/avatar4.jpg",
  //   "/avatars/avatar5.jpg",
  //   "/avatars/avatar6.png",
  //   "/avatars/avatar7.jpg",
  //   "/avatars/avatar8.jpg",
  //   "/avatars/avatar9.png",
  //   "/avatars/avatar10.jpg",
  //   "/avatars/avatar11.jpg",
  //   "/avatars/avatar12.jpg",
  //   "/avatars/avatar13.jpg",
  //   "/avatars/avatar14.png",
  //   "/avatars/avatar15.png",
  //   "/avatars/avatar16.jpg",
  //   "/avatars/avatar17.png",
  // ]);

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
          {usernameContext ? usernameContext : "no username"}
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
                  <SwiperSlide key={item.id}>
                    <AuthAvatar
                      avatarImgUrl={item.image}
                      avatarPreview={avatarPreview}
                      setAvatarPreview={(val) => {
                        setUploadFlag(false);
                        setAvatarPreview(val);
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
            setStage(6);
          }}
        >
          {avatarPreview != "/zero.png" ? "Подтвердить" : "Пропустить"}
        </Button>
      </ModalFooter>
    </>
  );
}
