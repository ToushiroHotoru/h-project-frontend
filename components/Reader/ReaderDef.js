import { Button, Box, HStack, Center, Tooltip, Flex } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import css from "../../styles/pages/Reader.module.css";
import Image from "next/image";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import ReaderPage from "./ReaderPage";
import { BsGearFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function RederDef({
  id,
  readerAltMode,
  router,
  mangaPages,
  onOpen,
  btnRef,
  mangaTitle,
  quality,
  showMap,
}) {
  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  return (
    <>
      {readerAltMode == false && (
        <>
          {showMap && (
            <Flex
              py="20px"
              flexDirection="column"
              alignItems="center"
              position="fixed"
              height="100%"
              zIndex="10"
              top="0"
              left="0"
              width="300px"
              overflowY="auto"
              backgroundColor="#000"
            >
              {mangaPages &&
                mangaPages.map((item, i) => {
                  return (
                    <>
                      <Link href={`/reader?id=${id}&page=${i + 1}`} key={i + 1}>
                        <Flex flexDirection="column" alignItems="center">
                          <Box
                            border={
                              Number(router.query.page) === i + 1
                                ? "3px solid #47f143"
                                : "none"
                            }
                            height="225"
                          >
                            <Image
                              src={item}
                              quality="1"
                              alt="Picture of the author"
                              width={160}
                              height={220}
                            />
                          </Box>
                          {i + 1}
                        </Flex>
                      </Link>
                      <Divider my="20px" width="160px" bg="#fff" height="2px" />
                    </>
                  );
                })}
            </Flex>
          )}

          <Center w="100%" flexDirection="column" justifySelf="center">
            <Tooltip hasArrow label="Настройки" placement="left">
              <Box ref={btnRef} className={css.gear} onClick={onOpen}>
                <BsGearFill size="2em" />
              </Box>
            </Tooltip>
            <Box fontSize="18px" mb="15px">
              {mangaTitle}
            </Box>
            <div className={css.content}>
              {mangaPages && (
                <ReaderPage
                  quality={quality}
                  mangaPages={mangaPages}
                  router={router}
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
              <FormControl w="100px">
                <NumberInput
                  value={router.isReady && Number(router.query.page)}
                  max={mangaPages?.length}
                  min={1}
                  onChange={(value) => {
                    if (value <= mangaPages?.length) {
                      router.push(
                        `/reader?id=${router.query.id}&page=${Number(value)}`,
                        undefined,
                        {
                          shallow: true,
                        }
                      );
                    }
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
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
            <Link href={`/mangas/${id}`}>
              <Button mt="1em">Вернуться на страницу</Button>
            </Link>
          </Center>
        </>
      )}
    </>
  );
}
