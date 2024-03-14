import Image from "next/image";
import { useState } from "react";

import {
  Box,
  Modal,
  Tooltip,
  Heading,
  extendTheme,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import useRegistorStore from "@/zustand/register.zustand";
import { FaRegUserCircle } from "react-icons/fa";

import AuthTags from "./AuthTags";
import AuthAvatars from "./AuthAvatars";
import AuthRegForm from "./AuthRegForm";
import AuthComplete from "./AuthComplete";
import AuthLoginForm from "./AuthLoginForm";
import AuthRegistered from "./AuthRegistered";

export default function AuthModal() {
  const { stage, maskots, speeches } = useRegistorStore();
  const { setRegisterStage, setFavorites } = useRegistorStore(
    ({ controls }) => controls
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [toggleForm, setToggleForm] = useState(true);

  const authModalBgColor = useColorModeValue("#fff", "#1A202C");

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

  const closeModal = () => {
    onClose();
    setToggleForm(true);
    setRegisterStage(1);
    setFavorites([]);
  };

  const registrationSteps = (value) => {
    switch (value) {
      case 1:
        return <AuthRegForm setToggleForm={(val) => setToggleForm(val)} />;
      case 2:
        return <AuthRegistered />;
      case 3:
        return <AuthTags />;
      case 4:
        return <AuthTags />;
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
          setRegisterStage(3);
        }}
      />
      <Modal
        isCentered
        onClose={closeModal}
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
              py={{ base: "16px", sm: "26px", md: "50px" }}
              px={{ base: "16px", sm: "26px", md: "40px" }}
              bg={authModalBgColor}
              position="relative"
              zIndex={2}
            >
              <ModalHeader position="relative" p={0}>
                <Heading size="md">
                  {toggleForm ? "Авторизация" : "Регистрации"}
                </Heading>
                <ModalCloseButton
                  top={{ base: "-16px", sm: "-25px" }}
                  right={{ base: "-16px", sm: "-16px" }}
                />
              </ModalHeader>

              {toggleForm && (
                <AuthLoginForm
                  setToggleForm={(val) => setToggleForm(val)}
                  onClose={onClose}
                />
              )}

              {!toggleForm && registrationSteps(stage)}
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
