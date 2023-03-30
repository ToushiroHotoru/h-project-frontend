import { useState, useContext } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  ModalFooter,
  ModalBody,
  Button,
  InputGroup,
  InputRightElement,
  Flex,
} from "@chakra-ui/react";

import { AuthContext } from "./AuthContext";
import css from "../../styles/components/Auth.module.css";
import { useRouter } from "next/router";

export default function AuthLoginForm({ setToggleForm }) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { usernameContext, setUsernameContext } = useContext(AuthContext);
  const handleClick = () => setShow(!show);
  const loginHandler = async () => {
    const request = await fetch(`/api/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const response = await request.json();

    if (response.success) {
      router.push(`/profile/${response.user.userName}`, undefined, {
        scroll: true,
      });
    }
  };

  const validationFunc = (email, password) => {
    let errors = {
      status: false,
      emailError: "",
      passwordError: "",
    };

    const mailRegex = new RegExp(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    );

    const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

    if (!mailRegex.test(email)) {
      errors["emailError"] = "Поле email не не заполнено!";

      if (!email) {
        errors["emailError"] = "Не корректный email";
        errors["status"] = true;
      }
      errors["status"] = true;
    }

    // if (!passwordRegex.test(password)) {
    //   errors["passwordError"] = "Латиница, не менее 8 символов, 1 цифра";

    //   if (!password) {
    //     errors["passwordError"] = "Поле password не заполнено!";
    //     errors["status"] = true;
    //   }
    //   errors["status"] = true;
    // }

    return errors;
  };

  return (
    <>
      <ModalBody
        py={{ base: "16px", sm: "24px" }}
        px={0}
        maxWidth={400}
        width="100%"
        display="flex"
        flexDirection="column"
        mx="auto"
      >
        <FormControl>
          <FormLabel mb="4px">Email*</FormLabel>
          <Input
            bg="#fff"
            type="email"
            color="#000"
            height="auto"
            borderRadius={2}
            p="10px 36px 10px 12px"
            placeholder="example@gmail.com"
            _placeholder={{ color: "#8b8b8b;" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {showErrors && (
            <Box color="#ef3d3d" fontSize="14px" fontWeight={500}>
              {validationFunc(email, password).emailError}
            </Box>
          )}
        </FormControl>
        <FormControl mt="10px">
          <FormLabel mb="4px">Пароль*</FormLabel>
          <InputGroup size="md">
            <Input
              bg="#fff"
              color="#000"
              height="auto"
              borderRadius={2}
              placeholder="Password"
              p="10px 36px 10px 12px"
              type={show ? "text" : "password"}
              _placeholder={{ color: "#8b8b8b;" }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <InputRightElement width="36px" right="4px" height="100%">
              <Box
                width="24px"
                height="24px"
                onClick={handleClick}
                cursor="pointer"
                bgPosition="center"
                bgRepeat="no-repeat"
                bgSize="contain"
                className={
                  show ? css.input_password_hidden : css.input_password_shown
                }
              ></Box>
            </InputRightElement>
          </InputGroup>
          {showErrors && (
            <Box color="#ef3d3d" fontSize="14px" fontWeight={500}>
              {validationFunc(email, password).passwordError}
            </Box>
          )}
        </FormControl>
      </ModalBody>
      <ModalFooter
        display="flex"
        justifyContent="center"
        flexDirection="column"
        p={0}
        pt={24}
      >
        <Flex width="100%" justifyContent="center">
          <Button
            bg="#F143E0"
            _hover={{ bg: "#CE39BF" }}
            onClick={() => {
              if (!validationFunc(email, password).status) {
                loginHandler();
              } else {
                setShowErrors(true);
              }
            }}
          >
            Войти
          </Button>
        </Flex>
        <Flex width="100%" marginTop="16px" justifyContent="center">
          <Button
            bg="#F143E0"
            _hover={{ bg: "#CE39BF" }}
            onClick={() => {
              setToggleForm(false);
            }}
          >
            Регистрация
          </Button>
        </Flex>
      </ModalFooter>
    </>
  );
}
