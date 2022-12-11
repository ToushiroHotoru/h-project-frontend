import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

export default function AuthForm({ stage, setStage }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <div>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" bg="#fff" color="#000" />
          {/* <FormErrorMessage>We'll never share your email.</FormErrorMessage> */}
        </FormControl>
        <FormControl mt="10px">
          <FormLabel>Username</FormLabel>
          <Input type="text" bg="#fff" color="#000" />
          {/* <FormErrorMessage>We'll never share your email.</FormErrorMessage> */}
        </FormControl>
        <FormControl mt="10px">
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input type={show ? "text" : "password"} bg="#fff" color="#000" />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                // color="#000"
                _hover={{ borderColor: "#1A202C" }}
                bg="#1A202C"
                onClick={handleClick}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {/* <FormErrorMessage>We'll never share your email.</FormErrorMessage> */}
        </FormControl>
      </div>
    </>
  );
}
