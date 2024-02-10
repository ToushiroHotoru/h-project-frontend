import Image from "next/image";
import { useEffect } from "react";

import { useSpring, animated } from "@react-spring/web";
import { Flex, Box, Center, Tooltip, Heading } from "@chakra-ui/react";
import { BsGearFill, BsArrowUpCircle } from "react-icons/bs";

import useStore from "@/zustand/reader.zustand";
import style from "@/components/reader/readerScroll/ReaderScroll.module.css";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export default function ReaderAlt({ btnRef, onOpen }) {
  const [styles, animate] = useSpring(() => ({ right: -200 }));
  const { mangaPages, mangaTitle, quality, currentPage } = useStore();

  const addScroll = () => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1200) {
        animate({ right: 0, delay: 200 });
      } else {
        animate({ right: -200 });
      }
    });
  };

  useEffect(() => {
    addScroll();
    return () => addScroll();
  }, []);

  const scrollToPage = () => {
    const page = document.querySelector(`#page-${currentPage}`);
    const offsetTop = page.offsetTop;
    window.scrollTo({ top: offsetTop });
  };

  useEffect(() => {
    scrollToPage();

    return () => scrollToPage;
  }, [currentPage]);

  return (
    <>
      <Center flexDirection="column">
        <Flex
          justifyContent={{ base: "space-between", md: "center" }}
          width="100%"
          alignItems="center"
        >
          <Heading as="h1" fontSize="18px" fontWeight="normal">
            {mangaTitle}
          </Heading>
          <Box
            position={{ base: "relative", md: "fixed" }}
            top={{ base: "0", md: "200px" }}
            right={{ base: "auto", md: "0" }}
            zIndex={2}
          >
            <Tooltip hasArrow label="Настройки" placement="left">
              <Box
                ref={btnRef}
                className={`${style.reader_aside_button} ${style.settings_button}`}
                onClick={onOpen}
              >
                <BsGearFill className={style.reader_aside_button_icon} />
              </Box>
            </Tooltip>

            <Tooltip hasArrow label="Наверх" placement="left">
              <animated.div
                className={`${style.reader_aside_button} ${style.top_button}`}
                style={{
                  ...styles,
                }}
                onClick={scrollToTop}
              >
                <BsArrowUpCircle className={style.reader_aside_button_icon} />
              </animated.div>
            </Tooltip>
          </Box>
        </Flex>

        <Box className={style.content_alt_mode} mt="16px">
          {mangaPages &&
            mangaPages.map((item, i) => {
              return (
                <Box key={i + 1} id={`page-${i + 1}`} position="relative">
                  <Image
                    src={item.image}
                    quality={quality}
                    alt={`${mangaTitle} + стр.${i + 1}`}
                    width={item.size.width}
                    height={item.size.height}
                    objectFit="contain"
                  />
                </Box>
              );
            })}
        </Box>
      </Center>
    </>
  );
}
