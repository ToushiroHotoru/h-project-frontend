import { Button, Box, HStack, Center } from "@chakra-ui/react";
import css from "../../styles/pages/Reader.module.css";
import Image from "next/image";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import { BsGearFill } from "react-icons/bs";

export default function RederDef({
  readerAltMode,
  router,
  mangaPages,
  onOpen,
  btnRef,
}) {
  return (
    <>
      {readerAltMode == false && (
        <Center w="100%" flexDirection="column" justifySelf="center">
          <div>{router.query.id}</div>
          <div>{router.query.page}</div>
          <div className={css.content}>
            {mangaPages && (
              <Image
                src={mangaPages[router.query.page - 1]}
                alt="Picture of the author"
                width={700}
                height={1000}
              />
            )}
          </div>
          <HStack mt="1em" justifyContent="center">
            <Button
              isDisabled={Number(router.query.page) <= 1 ? true : false}
              onClick={() => {
                router.push(
                  `/reader?id=${router.query.id}&page=${
                    Number(router.query.page) - 1
                  }`,
                  undefined,
                  {
                    shallow: true,
                  }
                );
              }}
            >
              Prev
            </Button>
            <Editable value={router.query.page}>
              <EditablePreview />
              <EditableInput
                onChange={(e) => {
                  router.push(
                    `/reader?id=${router.query.id}&page=${
                      Number(e.target.value) - 1
                    }`,
                    undefined,
                    {
                      shallow: true,
                    }
                  );
                }}
              />
            </Editable>
            <Button
              isDisabled={
                mangaPages && mangaPages.length <= Number(router.query.page)
                  ? true
                  : false
              }
              onClick={() => {
                router.push(
                  `/reader?id=${router.query.id}&page=${
                    Number(router.query.page) + 1
                  }`,
                  undefined,
                  {
                    shallow: true,
                  }
                );
              }}
            >
              Next
            </Button>
          </HStack>
          <Box mt="1em" ref={btnRef} colorScheme="teal" onClick={onOpen}>
            <BsGearFill />
          </Box>
        </Center>
      )}
    </>
  );
}
