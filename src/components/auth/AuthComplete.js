import { Center, Button, ModalFooter, ModalBody } from "@chakra-ui/react";

import useStore from "@/zustand/register.zustand";

export default function AuthComplete({ onCloseFunc }) {
  const { stage } = useStore();
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
          Настройка профиля закончена. Чтобы зайти в профиль нажми на кнопку
        </Center>
      </ModalBody>
      <ModalFooter display="flex" justifyContent="center" p={0} mt="15px">
        <Button
          onClick={() => {
            onCloseFunc();
            controls.setStage(1);
          }}
          disabled={stage > 6}
        >
          Войти в мир грёз
        </Button>
      </ModalFooter>
    </>
  );
}
