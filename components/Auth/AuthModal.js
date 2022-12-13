import AuthForm from "./AuthForm";
import AuthFavorites from "./AuthFavorites";
import AuthUnloved from "./AuthUnloved";
import AuthAvatars from "./AuthAvatars";
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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function AuthModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stage, setStage] = useState(1);
  const [usernameContext, setUsernameContext] = useState();
  const [favorites, setFavorites] = useState();
  const [maskots, setMaskots] = useState([
    "/maskot.png",
    "/maskot2.png",
    "/maskot2.png",
    "/maskot4.png",
  ]);
  const speeches = [
    "Fuck u)",
    "I like cookies)",
    "My fav color is orange)",
    "Welcome)",
  ];

  const theme = extendTheme({
    components: {
      Modal: {
        baseStyle: (props) => ({
          dialog: {
            // maxWidth: ["95%", "95%", "95%"],
            // minWidth: "45%",
            minWidth: "600px",
            bg: "#1A202C",
          },
        }),
      },
    },
  });

  const i_dunno_how_to_name_this = (value) => {
    switch (value) {
      case 1:
        return (
          <AuthForm
            stage={stage}
            setStage={(val) => {
              setStage(val);
            }}
          />
        );
      case 2:
        return (
          <AuthFavorites
            stage={stage}
            setStage={(val) => {
              setStage(val);
            }}
          />
        );
      case 3:
        return (
          <AuthUnloved
            stage={stage}
            setStage={(val) => {
              setStage(val);
            }}
          />
        );
      case 4:
        return (
          <AuthAvatars
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

  useEffect(() => {
    setStage(1);
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{ usernameContext, setUsernameContext, favorites, setFavorites }}
      >
        <Button onClick={onOpen}>Регистрация</Button>
        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset="slideInBottom"
          theme={theme}
        >
          <ModalOverlay />

          <ModalContent>
            <Tooltip
              label={speeches[stage - 1]}
              hasArrow
              bg="#fff"
              placement="left"
              isOpen
              padding="30px"
              borderRadius="40px"
            >
              <Box
                position="absolute"
                overflow="hidden"
                height="300px"
                top="-300"
                left="120"
                zIndex="-105"
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
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            {i_dunno_how_to_name_this(stage)}
          </ModalContent>
        </Modal>
      </AuthContext.Provider>
    </>
  );
}
