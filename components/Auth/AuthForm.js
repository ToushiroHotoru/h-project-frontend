import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

export default function AuthForm({
  setEmailFunc,
  setUsernameFunc,
  setPasswordFunc,
}) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          bg="#fff"
          color="#000"
          onChange={(e) => setEmailFunc(e.target.value)}
        />
      </FormControl>
      <FormControl mt="10px">
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          bg="#fff"
          color="#000"
          onChange={(e) => setUsernameFunc(e.target.value)}
        />
      </FormControl>
      <FormControl mt="10px">
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            bg="#fff"
            color="#000"
            onChange={(e) => setPasswordFunc(e.target.value)}
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
      </FormControl>
    </>
  );
}
