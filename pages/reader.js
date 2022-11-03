import { useState, useEffect, useRef } from "react";
import css from "../styles/pages/Reader.module.css";
import { useRouter } from "next/router";
import { Button, Box, Flex, HStack, Center } from "@chakra-ui/react";
import Image from "next/image";
import {
  Editable,
  EditableInput,
  EditablePreview,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import { BsGearFill } from "react-icons/bs";

export default function Reader() {
  const [mangaPages, setMangaPages] = useState();
  const [readerAltMode, setReaderAltMode] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const onLoadHander = async () => {
    try {
      console.log(router.query.id);
      const res = await fetch("https://h-project.herokuapp.com/manga-dynamic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: router.query.id }),
      });

      const data = await res.json();
      setMangaPages(data?.pages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    onLoadHander();
  }, [router.isReady]);

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

      {readerAltMode == true && (
        <Center flexDirection="column">
          <div>{router.query.id}</div>
          <div className={css.content_alt_mode}>
            {mangaPages &&
              mangaPages.map((item, i) => {
                return (
                  <Box key={i + 1}>
                    <Image
                      src={item}
                      alt="Picture of the author"
                      width={700}
                      height={1000}
                    />
                    ;
                  </Box>
                );
              })}
          </div>
          <Box mt="1em" ref={btnRef} colorScheme="teal" onClick={onOpen}>
            <BsGearFill />
          </Box>
        </Center>
      )}

      <>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Settings</DrawerHeader>

            <DrawerBody>
              <>Здесь будут настрокий Reader</>
              <Button
                onClick={() => {
                  setReaderAltMode(!readerAltMode);
                }}
              >
                Turn on alt mode
              </Button>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
}
