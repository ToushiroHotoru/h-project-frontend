import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Flex,
  HStack,
  Center,
  Button,
  Tooltip,
  Divider,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { BsGearFill } from "react-icons/bs";

import ReaderPage from "../readerPage/ReaderPage";
import useStore from "@/zustand/reader.zustand";

import styleCommon from "@/components/reader/Reader.module.css";


export default function RederDef({ onOpen, btnRef }) {
  const { mangaPages, readerAltMode, mangaTitle, quality, showMap } =
    useStore();
  const router = useRouter();

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
                      <Link
                        href={`/reader?id=${router.query.id}&page=${i + 1}`}
                        key={i + 1}
                      >
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
            <Box fontSize="18px" mb="15px">
              {mangaTitle}
            </Box>
            <div className={styleCommon.content}>
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
                Назад
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
                Вперед
              </Button>
              <Tooltip hasArrow label="Настройки" placement="left">
                <Center
                  ref={btnRef}
                  className={styleCommon.gear}
                  onClick={onOpen}
                >
                  <BsGearFill className={styleCommon.gearIcon} size="1em" />
                </Center>
              </Tooltip>
            </HStack>
            <Link href={`/mangas/${router.query.id}`}>
              <Button mt="1em">Вернуться на страницу</Button>
            </Link>
          </Center>
        </>
      )}
    </>
  );
}
