import { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Input,
  Button,
  ModalBody,
  FormLabel,
  InputGroup,
  ModalFooter,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";

import axios from "@/utils/axios";
import useRegistorStore from "@/zustand/register.zustand";
import css from "@/styles/components/Auth.module.css";

const validationFunc = ({ email, username, password }) => {
  let errors = {
    status: false,
    emailError: "",
    usernameError: "",
    passwordError: "",
  };

  const mailRegex = new RegExp(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  );
  const usernameRegex = new RegExp(
    /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){1,18}[a-zA-Z0-9]$/
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

  if (!usernameRegex.test(username)) {
    errors["usernameError"] = "Латиница, не менее 3х символов.";

    if (!username) {
      errors["usernameError"] = "Поле username не заполнено!";
      errors["status"] = true;
    }
    errors["status"] = true;
  }

  if (!passwordRegex.test(password)) {
    errors["passwordError"] = "Латиница, не менее 8 символов, 1 цифра";

    if (!password) {
      errors["passwordError"] = "Поле password не заполнено!";
      errors["status"] = true;
    }
    errors["status"] = true;
  }

  return errors;
};

export default function AuthRegForm({ setToggleForm }) {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const { stage } = useRegistorStore();
  const { setRegisterStage, setUserId } = useRegistorStore(
    ({ controls }) => controls
  );

  const fetchRegsiter = async () => {
    try {
      setShowErrors(false);
      if (validationFunc(userData).status) {
        setShowErrors(true);
        return;
      }

      const response = await axios.post(`/user/registration`, userData);

      const { data, status, message } = response.data;

      if (status === "success") {
        setRegisterStage(2);
        setUserId(data.id);
        setErrorMessage("");
      }

      if (status === "error") {
        setErrorMessage(message);
        setShowErrors(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <ModalBody
        py={{ base: "16px", sm: "24px" }}
        px={0}
        width="100%"
        display="flex"
        flexDirection="column"
        mx="auto"
      >
        <FormControl>
          <FormLabel mb="4px">Email</FormLabel>
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
              setShowErrors(false);
              setUserData({ ...userData, email: e.target.value });
            }}
          />
          {showErrors && (
            <Box color="#ef3d3d" fontSize="14px" fontWeight={500}>
              {validationFunc(userData).emailError}
            </Box>
          )}
        </FormControl>
        <FormControl mt="10px">
          <FormLabel mb="4px">Имя</FormLabel>
          <Input
            bg="#fff"
            type="text"
            color="#000"
            height="auto"
            borderRadius={2}
            placeholder="Username"
            p="10px 36px 10px 12px"
            _placeholder={{ color: "#8b8b8b;" }}
            onChange={(e) => {
              setShowErrors(false);
              setUserData({ ...userData, username: e.target.value });
            }}
          />
          {showErrors && (
            <Box color="#ef3d3d" fontSize="14px" fontWeight={500}>
              {validationFunc(userData).usernameError}
            </Box>
          )}
        </FormControl>
        <FormControl mt="10px">
          <FormLabel mb="4px">Пароль</FormLabel>
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
                setShowErrors(false);
                setUserData({ ...userData, password: e.target.value });
              }}
            />

            <InputRightElement width="36px" right="4px" height="100%">
              <Box
                width="24px"
                height="24px"
                onClick={() => setShow(!show)}
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
              {validationFunc(userData).passwordError}
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
        <Flex width="100%" justifyContent="space-between">
          <Button
            disabled={stage >= 4}
            bg="#F143E0"
            _hover={{ bg: "#CE39BF" }}
            onClick={() => fetchRegsiter()}
          >
            Далее
          </Button>

          <Button
            bg="#F143E0"
            _hover={{ bg: "#CE39BF" }}
            onClick={() => setToggleForm(true)}
          >
            Войти
          </Button>
        </Flex>
        {showErrors && errorMessage.length ? (
          <Box mt="12px" color="red" textAlign="center">
            {errorMessage}
          </Box>
        ) : (
          ""
        )}
      </ModalFooter>
    </>
  );
}
