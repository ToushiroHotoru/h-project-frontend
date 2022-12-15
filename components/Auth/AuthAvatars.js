import AuthAvatar from "./AuthAvatar";
import { AuthContext } from "./AuthContext";
import AuthFavoritesCSS from "../../styles/components/AuthFavorites.module.css";
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
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

export default function AuthAvatars({ setStage, onCloseFunc }) {
  const [uploadFlag, setUploadFlag] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("/zero.png");
  const [avatarsOffset, setAvatarsOffset] = useState(1);
  const [currentAvatars, setCurrentAvatars] = useState([]);
  const { usernameContext, setUsernameContext } = useContext(AuthContext);
  const step = isMobile ? 5 : 15;

  const [avatars, setAvatars] = useState([
    "/avatar(NY).png",
    "/avatar.png",
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
    "/avatars/avatar3.jpg",
    "/avatars/avatar4.jpg",
    "/avatars/avatar5.jpg",
    "/avatars/avatar6.png",
    "/avatars/avatar7.jpg",
    "/avatars/avatar8.jpg",
    "/avatars/avatar9.png",
    "/avatars/avatar10.jpg",
    "/avatars/avatar11.jpg",
    "/avatars/avatar12.jpg",
    "/avatars/avatar13.jpg",
    "/avatars/avatar14.png",
    "/avatars/avatar15.png",
    "/avatars/avatar16.jpg",
    "/avatars/avatar17.png",
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
      <ModalBody>
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
          {/* {avatarsOffset != 1 && ( */}
          <Box
            onClick={() => {
              if (avatarsOffset != 1) {
                onClickPrevBtnHandler();
              }
            }}
            disabled={avatarsOffset == 1}
            mr="18px"
          >
            <BsChevronLeft />
          </Box>
          {/* )} */}

          <Box
            className={
              isMobile
                ? AuthFavoritesCSS.avatars_mobile
                : AuthFavoritesCSS.avatars_desktop
            }
          >
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
          {/* {avatars.length / step >= avatarsOffset && ( */}
          <Box
            onClick={() => {
              if (avatars.length / step >= avatarsOffset) {
                onClickNextBtnHandler();
              }
            }}
            ml="18px"
          >
            <BsChevronRight />
          </Box>
          {/* )} */}
        </Center>
        <Divider />
      </ModalBody>
      <ModalFooter display="flex" justifyContent="center">
        {/* <Button
          mr="1em"
          disabled={stage <= 1}
          onClick={() => {
            setStage(stage - 1);
          }}
        >
          back
        </Button> */}
        <Button
          bg={avatarPreview != "/zero.png" ? "#43F1DC" : "#A2ACAB"}
          _hover={{ bg: avatarPreview != "/zero.png" ? "#3DD7C4" : "#727978" }}
          onClick={() => {
            onCloseFunc();
            setStage(1);
          }}
        >
          {avatarPreview != "/zero.png" ? "Подтвердить" : "Пропустить"}
        </Button>
      </ModalFooter>
    </>
  );
}
