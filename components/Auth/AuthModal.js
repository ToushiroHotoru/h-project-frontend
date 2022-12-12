import AuthForm from "./AuthForm";
import AuthFavorites from "./AuthFavorites";
import AuthUnloved from "./AuthUnloved";
import AuthEnd from "./AuthEnd";
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
import { useState, useEffect } from "react";

export default function AuthModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stage, setStage] = useState(1);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [favorites, setFavorites] = useState([]);
  const [unloved, setUnloved] = useState([]);
  const [avatar, setAvatar] = useState();

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
            setEmailFunc={(email) => {
              setEmail(email);
            }}
            setUsernameFunc={(username) => {
              setUsername(username);
            }}
            setPasswordFunc={(password) => {
              setPassword(password);
            }}
          />
        );
      case 2:
        return (
          <AuthFavorites
            func={(favs) => {
              setFavorites(favs);
            }}
          />
        );
      case 3:
        return (
          <AuthUnloved
            func={(unloves) => {
              setUnloved(unloves);
            }}
          />
        );
      case 4:
        return (
          <AuthEnd
            username={username}
            func={(image) => {
              setAvatar(image);
            }}
          />
        );
    }
  };

  const btn_color_i_guess = (value) => {
    switch (value) {
      case 1:
        return "#F143E0";
      case 2:
        return "#47F143";
      case 3:
        return "#F14343";
      case 4:
        return "#43F1DC";
      default:
        return "#F143E0";
    }
  };

  const btn_hover_i_guess = (value) => {
    switch (value) {
      case 1:
        return "#CE39BF";
      case 2:
        return "#3FD23C";
      case 3:
        return "#D03939";
      case 4:
        return "#3DD7C4";
      default:
        return "#CE39BF";
    }
  };

  const validationFunc = (email, username, password) => {
    let errors = {
      status: false,
      emailError: "",
      usernameError: "",
      passwordError: "",
    };
    // console.log(email, username, password);
    // console.log(!email, !username, !password);
    if (!email) {
      errors["emailError"] = "Поле email не должно быть пустым!";
      errors["status"] = true;
    }

    if (!username) {
      errors["usernameError"] = "Поле username не должно быть пустым!";
      errors["status"] = true;
    }

    if (!password) {
      errors["passwordError"] = "Поле password не должно быть пустым!";
      errors["status"] = true;
    }

    return errors;
  };

  return (
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
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>{i_dunno_how_to_name_this(stage)}</ModalBody>
          <ModalFooter display="flex" justifyContent="center">
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button> */}
            <Button
              mr="1em"
              disabled={stage <= 1}
              onClick={() => {
                setStage((prev) => {
                  return prev - 1;
                });
              }}
            >
              back
            </Button>
            <Button
              disabled={stage >= 4}
              bg={btn_color_i_guess(stage)}
              _hover={{ bg: btn_hover_i_guess(stage) }}
              onClick={() => {
                console.log(validationFunc(email, username, password));
                if (!validationFunc(email, username, password).status) {
                  setStage((prev) => {
                    return prev + 1;
                  });
                } else {
                  console.log("ошибка вообще то");
                }
              }}
            >
              next
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
