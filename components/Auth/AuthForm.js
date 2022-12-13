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
} from "@chakra-ui/react";
import { AuthContext } from "./AuthContext";
import { useState, useContext } from "react";

export default function AuthForm({ stage, setStage }) {
  const [show, setShow] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { usernameContext, setUsernameContext } = useContext(AuthContext);
  const handleClick = () => setShow(!show);

  const validationFunc = (email, username, password) => {
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
      errors["emailError"] = "Поле email не должно быть пустым!";
      console.log(!mailRegex.test(email));
      if (!email) {
        errors["emailError"] = "Поле email заполнено не правильно!";
        errors["status"] = true;
      }
      errors["status"] = true;
    }

    if (!usernameRegex.test(username)) {
      errors["usernameError"] = "Поле username заполнено неверно!";
      console.log(!usernameRegex.test(username));
      if (!username) {
        errors["usernameError"] = "Поле username не должно быть пустым!";
        errors["status"] = true;
      }
      errors["status"] = true;
    }

    if (!passwordRegex.test(password)) {
      errors["passwordError"] =
        "Поле password должен быть на английском, минимум 8 символов и 1 цифра!";
      console.log(!passwordRegex.test(password));
      if (!password) {
        errors["passwordError"] = "Поле password не должно быть пустым!";
        errors["status"] = true;
      }
      errors["status"] = true;
    }

    return errors;
  };

  return (
    <>
      <ModalBody>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            bg="#fff"
            color="#000"
            placeholder="example@gmail.com"
            _placeholder={{ color: "#000" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {showErrors && (
            <Box color="#F14343">
              {validationFunc(email, username, password).emailError}
            </Box>
          )}
        </FormControl>
        <FormControl mt="10px">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            bg="#fff"
            color="#000"
            placeholder="Username"
            _placeholder={{ color: "#000" }}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameContext(e.target.value);
            }}
          />
          {showErrors && (
            <Box color="#F14343">
              {validationFunc(email, username, password).usernameError}
            </Box>
          )}
        </FormControl>
        <FormControl mt="10px">
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              bg="#fff"
              color="#000"
              placeholder="Password"
              _placeholder={{ color: "#000" }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                _hover={{ borderColor: "#1A202C" }}
                bg="#1A202C"
                onClick={handleClick}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {showErrors && (
            <Box color="#F14343">
              {validationFunc(email, username, password).passwordError}
            </Box>
          )}
        </FormControl>
      </ModalBody>
      <ModalFooter display="flex" justifyContent="center">
        <Button
          disabled={stage >= 4}
          bg="#F143E0"
          _hover={{ bg: "#CE39BF" }}
          onClick={() => {
            if (!validationFunc(email, username, password).status) {
              setStage(2);
            } else {
              setShowErrors(true);
              console.log("ошибка вообще то");
            }
          }}
        >
          next
        </Button>
      </ModalFooter>
    </>
  );
}
