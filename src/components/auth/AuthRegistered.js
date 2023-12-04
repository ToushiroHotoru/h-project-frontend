import { Center, Button, ModalFooter, ModalBody } from "@chakra-ui/react";

import useStore from "@/zustand/auth.zustand";

export default function AuthRegistered() {
  const controls = useStore(({ controls }) => controls);
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
            controls.setStage(3);
          }}
        >
          Продолжить
        </Button>
      </ModalFooter>
    </>
  );
}
