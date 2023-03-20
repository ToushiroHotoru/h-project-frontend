import { Center, Button, ModalFooter, ModalBody } from "@chakra-ui/react";
import { LINK } from "../../libs/changeApiUrl.js";

export default function AuthFavorites({ stage, setStage }) {
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
            setStage(3);
          }}
        >
          Продолжить
        </Button>
      </ModalFooter>
    </>
  );
}
