import AuthForm from "./AuthForm";
import AuthFavorites from "./AuthFavorites";
import AuthUnloved from "./AuthUnloved";
import AuthEnd from "./AuthEnd";
import { AuthContext } from "./AuthContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  Button,
  extendTheme,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function AuthModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stage, setStage] = useState(1);
  const [usernameContext, setUsernameContext] = useState();
  const [favorites, setFavorites] = useState();

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
            setUsernameFunc={(username) => {
              setUsername(username);
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
          <AuthEnd
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
        <Button onClick={onOpen}>Open Modal</Button>
        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset="slideInBottom"
          theme={theme}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            {i_dunno_how_to_name_this(stage)}
          </ModalContent>
        </Modal>
      </AuthContext.Provider>
    </>
  );
}
