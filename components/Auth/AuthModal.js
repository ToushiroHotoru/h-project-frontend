import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  extendTheme,
} from "@chakra-ui/react";

import AuthForm from "./AuthForm";
import AuthFavorites from "./AuthFavorites";
import AuthUnloved from "./AuthUnloved";
import AuthEnd from "./AuthEnd";
import { useState, useEffect } from "react";

export default function AuthModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stage, setStage] = useState(1);

  const theme = extendTheme({
    components: {
      Modal: {
        baseStyle: (props) => ({
          dialog: {
            maxWidth: ["95%", "95%", "95%"],
            minWidth: "95%",
            bg: "#1A202C",
          },
        }),
      },
    },
  });

  const i_dunno_how_to_name_this = (value) => {
    console.log(value);
    switch (value) {
      case 1:
        return <AuthForm stage={stage} />;
      case 2:
        return <AuthFavorites stage={stage} />;
      case 3:
        return <AuthUnloved stage={stage} />;
      case 4:
        return <AuthEnd stage={stage} />;
      default:
        return <AuthForm stage={stage} />;
    }
  };

  return (
    <div>
      <>
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
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{i_dunno_how_to_name_this(stage)}</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                disabled={stage >= 4}
                onClick={() => {
                  setStage((prev) => {
                    return prev + 1;
                  });
                }}
              >
                Secondary Action
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
}
