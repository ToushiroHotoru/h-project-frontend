import { Center, Button, ModalFooter, ModalBody } from "@chakra-ui/react";

import useStore from "@/zustand/register.zustand";

export default function AuthRegistered() {
  const { setRegisterStage } = useStore(({ controls }) => controls);
  return (
    <>
      <ModalBody p="0" mt="15px">
        <Center
          flexDirection="column"
          textTransform="uppercase"
          fontSize="32px"
          textAlign="center"
        >
          Желаешь продолжить настраивать профиль? Милости прошу
        </Center>
      </ModalBody>
      <ModalFooter display="flex" justifyContent="center" p={0} mt="15px">
        <Button
          // disabled={stage >= 5}
          onClick={() => {
            setRegisterStage(3);
          }}
        >
          Продолжить
        </Button>
      </ModalFooter>
    </>
  );
}
