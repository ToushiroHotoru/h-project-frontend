import { Button, Box, HStack, Center, Tooltip } from "@chakra-ui/react";
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
import { BsGearFill } from "react-icons/bs";
import { useEffect } from "react";
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
}) {
  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  return (
    <>
      {readerAltMode == false && (
        <Center w="100%" flexDirection="column" justifySelf="center">
          <Tooltip hasArrow label="Настройки" placement="left">
            <Box
              ref={btnRef}
              // colorScheme="teal"
              className={css.gear}
              onClick={onOpen}
            >
              <BsGearFill size="2em" />
            </Box>
          </Tooltip>
          <Box fontSize="18px" mb="15px">
            {mangaTitle}
          </Box>
          <div className={css.content}>
            {mangaPages && (
              <div className={css.test_click_next_parent}>
                <Image
                  placeholder="blur"
                  blurDataURL="/manga_cover/placeholder.png"
                  quality={quality}
                  src={
                    router.query.page == 0
                      ? mangaPages[0]
                      : mangaPages[router.query.page - 1]
                  }
                  alt="Picture of the author"
                  width={700}
                  height={1000}
                />
                <div
                  className={css.test_click_prev}
                  onClick={() => {
                    if (Number(router.query.page) <= 1 ? false : true) {
                      router.push(
                        `/reader?id=${router.query.id}&page=${
                          Number(router.query.page) - 1
                        }`,
                        undefined,
                        {
                          shallow: true,
                        }
                      );
                    }
                  }}
                ></div>
                <div
                  className={css.test_click_next}
                  onClick={() => {
                    if (
                      mangaPages &&
                      mangaPages.length <= Number(router.query.page)
                        ? false
                        : true
                    ) {
                      router.push(
                        `/reader?id=${router.query.id}&page=${
                          Number(router.query.page) + 1
                        }`,
                        undefined,
                        {
                          shallow: true,
                        }
                      );
                    }
                  }}
                ></div>
              </div>
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
      )}
    </>
  );
}
