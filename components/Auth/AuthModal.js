import { useState, useEffect } from "react";

import { FaRegUserCircle } from "react-icons/fa";
import useStore from "../../zustand/auth.zustand";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Tooltip,
  extendTheme,
  Heading,
} from "@chakra-ui/react";

import AuthRegForm from "./AuthRegForm";
import AuthLoginForm from "./AuthLoginForm";
import AuthFavorites from "./AuthFavorites";
import AuthUnloved from "./AuthUnloved";
import AuthAvatars from "./AuthAvatars";
import AuthRegistered from "./AuthRegistered";
import AuthComplete from "./AuthComplete";
import Image from "next/image";

export default function AuthModal() {
  const { stage } = useStore();
  const controls = useStore(({ controls }) => controls);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [usernameContext, setUsernameContext] = useState();
  const [favorites, setFavorites] = useState();
  const [toggleForm, setToggleForm] = useState(true);
  const [maskots, setMaskots] = useState([
    "/maskot.png",
    "/maskot4.png",
    "/maskot2.png",
    "/maskot2.png",
    "/maskot4.png",
    "/maskot4.png",
  ]);
  const speeches = [
    "Fuck u)",
    "Успешно зарегистрировался",
    "I like cookies)",
    "My fav color is orange)",
    "Welcome)",
    "Настройка завершена",
  ];

  const theme = extendTheme({
    components: {
      Modal: {
        baseStyle: (props) => ({
          dialog: {
            bg: "transparent",
            boxShadow: "none",
          },
        }),
      },
    },
  });

  const closeFunc = () => {
    onClose();
    setToggleForm(true);
  };

  const renderSwitchFunc = (value) => {
    switch (value) {
      case 1:
        return <AuthRegForm setToggleForm={(val) => setToggleForm(val)} />;
      case 2:
        return <AuthRegistered />;
      case 3:
        return <AuthFavorites />;
      case 4:
        return <AuthUnloved />;
      case 5:
        return <AuthAvatars />;
      case 6:
        return <AuthComplete onCloseFunc={() => onClose()} />;
    }
  };

  return (
    <>
      <FaRegUserCircle
        size="30px"
        cursor="pointer"
        onClick={() => {
          onOpen();
          controls.setStage(3);
        }}
      />
      <Modal
        isCentered
        onClose={closeFunc}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        theme={theme}
      >
        <ModalOverlay />

        <ModalContent maxWidth="100%" m="auto" alignItems="center">
          <Box maxWidth={600} w="100%" position="relative" p="16px">
            <Tooltip
              label={speeches[stage - 1]}
              hasArrow
              bg="#fff"
              placement="left"
              isOpen
              padding="12px 16px"
              borderRadius="0px 7px 7px 6px"
            >
              <Box
                position="absolute"
                overflow="hidden"
                height={{ base: "200px", sm: "300px" }}
                width={{ base: "200px", sm: "300px" }}
                top={{ base: "-140px", sm: "-215px" }}
                left={{ base: "auto", sm: "calc(50% + 100px)" }}
                right={{ base: 0, sm: "auto" }}
                transform={{ base: "translateX(0)", sm: "translateX(-50%)" }}
                zIndex="1"
              >
                <Image
                  src={maskots[stage - 1]}
                  alt="Picture of the author"
                  width={400}
                  height={400}
                  draggable="false"
                ></Image>
              </Box>
            </Tooltip>
            <Box
              maxWidth={600}
              w="100%"
              py={{ base: 30, sm: 50 }}
              px={{ base: "24px", sm: "40px" }}
              bg="#1A202C"
              position="relative"
              zIndex={2}
            >
              <ModalHeader position="relative" p={0}>
                <Heading size="md">
                  {toggleForm ? "Авторизация" : "Регистрации"}
                </Heading>
                <ModalCloseButton
                  top={{ base: "-18px", sm: "-25px" }}
                  right={{ base: "-15px", sm: "-16px" }}
                />
              </ModalHeader>

              {toggleForm && (
                <AuthLoginForm setToggleForm={(val) => setToggleForm(val)} />
              )}

              {!toggleForm && renderSwitchFunc(stage)}
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
