import css from "../../styles/pages/Reader.module.css";
import { Box, Center, Tooltip, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { BsGearFill, BsArrowUpCircle } from "react-icons/bs";
import { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

export default function ReaderAlt({
  readerAltMode,
  mangaPages,
  btnRef,
  onOpen,
  mangaTitle,
  quality,
  showMap,
}) {
  const [styles, animate] = useSpring(() => ({ right: -200 }));
  const add_scroll = () => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1200) {
        animate({ right: 0, delay: 200 });
      } else {
        animate({ right: -200 });
      }
    });
  };

  useEffect(() => {
    add_scroll();
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {readerAltMode && (
        <>
          {showMap && (
            <Flex
              flexDirection="column"
              alignItems="center"
              position="fixed"
              height="100%"
              left="0"
              width="300px"
              overflowY="auto"
            >
              {mangaPages &&
                mangaPages.map((item, i) => {
                  return (
                    <a href={`#${item}`}>
                      <Flex
                        key={i + 1}
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Image
                          src={item}
                          quality="1"
                          alt="Picture of the author"
                          width={160}
                          height={220}
                        />
                        {i + 1}
                      </Flex>
                    </a>
                  );
                })}
            </Flex>
          )}

          <Center flexDirection="column">
            <Tooltip hasArrow label="Настройки" placement="left">
              <Box ref={btnRef} className={css.gear} onClick={onOpen}>
                <BsGearFill size="2em" />
              </Box>
            </Tooltip>
            <Box fontSize="18px" mb="15px">
              {mangaTitle}
            </Box>

            <Tooltip hasArrow label="Наверх" placement="left">
              <animated.div
                style={{
                  position: "fixed",
                  top: "220px",
                  backgroundColor: "#000",
                  padding: "15px",
                  borderTopLeftRadius: "8px",
                  borderBottomLeftRadius: "8px",
                  ...styles,
                }}
                onClick={goToTop}
              >
                <BsArrowUpCircle size="2em" />
              </animated.div>
            </Tooltip>

            <div className={css.content_alt_mode}>
              {mangaPages &&
                mangaPages.map((item, i) => {
                  return (
                    <Box key={i + 1} id={item}>
                      <Image
                        src={item}
                        quality={quality}
                        alt="Picture of the author"
                        width={700}
                        height={1000}
                      />
                    </Box>
                  );
                })}
            </div>
          </Center>
        </>
      )}
    </>
  );
}
