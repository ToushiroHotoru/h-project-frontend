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
  const {
    mangaPages,
    mangaTitle,
    quality,
    currentPage,
  } = useStore();
  const { setCurrentPage } = useStore((store) => store.controls);
  const router = useRouter();

  const prevMangaPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const nextMangaPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const changeMangaPage = (value) => {
    if (value <= mangaPages.length) {
      setCurrentPage(value);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  return (
    <>
      <Center
        w="100%"
        flexDirection="column"
        justifySelf="center"
        height="100%"
      >
        <Box fontSize="18px" mb="15px">
          {mangaTitle}{" "}
        </Box>
        {mangaPages && (
          <ReaderPage
            quality={quality}
            mangaPages={mangaPages}
            router={router}
          />
        )}
        <HStack mt="auto" justifyContent="center">
          <Button
            isDisabled={currentPage <= 1 ? true : false}
            onClick={prevMangaPage}
          >
            Назад
          </Button>
          <FormControl w="100px">
            <NumberInput
              value={currentPage}
              max={mangaPages.length}
              min={1}
              onChange={changeMangaPage}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Button
            isDisabled={currentPage >= mangaPages.length ? true : false}
            onClick={nextMangaPage}
          >
            Вперед
          </Button>
          <Tooltip hasArrow label="Настройки" placement="left">
            <Center
              ref={btnRef}
              className={styleCommon.gear}
              onClick={onOpen}
              cursor="pointer"
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
  );
}
