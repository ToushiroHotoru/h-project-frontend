import AuthForm from "./AuthForm";
import AuthFavorites from "./AuthFavorites";
import AuthUnloved from "./AuthUnloved";
import AuthAvatars from "./AuthAvatars";
import AuthRegistered from "./AuthRegistered";
import AuthComplete from "./AuthComplete";
import { AuthContext } from "./AuthContext";
import Image from "next/image";
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
import { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";

export default function AuthModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stage, setStage] = useState(1);
  const [userId, setUserId] = useState(null);
  const [usernameContext, setUsernameContext] = useState();
  const [favorites, setFavorites] = useState();
  const [maskots, setMaskots] = useState([
    "/maskot.png",
    "/maskot4.png",
    "/maskot2.png",
    "/maskot2.png",
    "/maskot4.png",
  ]);
  const speeches = [
    "Fuck u)",
    "Успешно зарегистрировался",
    "I like cookies)",
    "My fav color is orange)",
    "Welcome)",
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

  const renderSwitchFunc = (value) => {
    switch (value) {
      case 1:
        return (
          <AuthForm
            stage={stage}
            setStage={(val) => {
              setStage(val);
            }}
            setUserId={(val) => {
              setUserId(val);
            }}
          />
        );
      case 2:
        return (
          <AuthRegistered
            stage={stage}
            setStage={(val) => {
              setStage(val);
            }}
          />
        );
      case 3:
        return (
          <AuthFavorites
            stage={stage}
            setStage={(val) => {
              setStage(val);
            }}
          />
        );
      case 4:
        return (
          <AuthUnloved
            stage={stage}
            setStage={(val) => {
              setStage(val);
            }}
            userId={userId}
          />
        );
      case 5:
        return (
          <AuthAvatars
            stage={stage}
            setStage={(val) => {
              setStage(val);
            }}
            userId={userId}
          />
        );
      case 6:
        return (
          <AuthComplete
            stage={stage}
            setStage={(val) => {
              setStage(val);
            }}
            onCloseFunc={() => {
              onClose();
            }}
          />
        );
    }
  };

  return (
    <>
      <AuthContext.Provider
        value={{ usernameContext, setUsernameContext, favorites, setFavorites }}
      >
        {/* <Button
          width="24px"
          height="24px"
          borderRadius="50%"
          padding="0"
          minWidth="24px"
        ></Button> */}
        <FaRegUserCircle
          size="30px"
          cursor="pointer"
          onClick={() => {
            setStage(1);
            onOpen();
          }}
        />
        <Modal
          isCentered
          onClose={onClose}
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
                  <Heading size="md"> Этап регистрации</Heading>
                  <ModalCloseButton
                    top={{ base: "-18px", sm: "-25px" }}
                    right={{ base: "-15px", sm: "-16px" }}
                  />
                </ModalHeader>
                {renderSwitchFunc(stage)}
              </Box>
            </Box>
          </ModalContent>
        </Modal>
      </AuthContext.Provider>
    </>
  );
}
