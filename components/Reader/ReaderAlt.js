import css from "../../styles/pages/Reader.module.css";
import { Box, Center, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import { BsGearFill } from "react-icons/bs";

export default function ReaderAlt({
  readerAltMode,
  mangaPages,
  btnRef,
  onOpen,
  mangaTitle,
  quality,
}) {
  return (
    <>
      {readerAltMode && (
        <Center flexDirection="column">
          <Tooltip hasArrow label="Настройки" placement="left">
            <Box
              ref={btnRef}
              colorScheme="teal"
              className={css.gear}
              onClick={onOpen}
            >
              <BsGearFill size="2em" />
            </Box>
          </Tooltip>
          <Box fontSize="18px" mb="15px">
            {mangaTitle}
          </Box>

          <div className={css.content_alt_mode}>
            {mangaPages &&
              mangaPages.map((item, i) => {
                return (
                  <Box key={i + 1}>
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
      )}
    </>
  );
}
