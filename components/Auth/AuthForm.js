import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

export default function AuthForm({ stage, setStage }) {
  return (
    <>
      <div>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" bg="#fff" color="#000" />
          {/* <FormErrorMessage>We'll never share your email.</FormErrorMessage> */}
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type="text" bg="#fff" color="#000" />
          {/* <FormErrorMessage>We'll never share your email.</FormErrorMessage> */}
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" bg="#fff" color="#000" />
          {/* <FormErrorMessage>We'll never share your email.</FormErrorMessage> */}
        </FormControl>
      </div>
    </>
  );
}
