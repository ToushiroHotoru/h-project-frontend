import css from "../../styles/pages/Reader.module.css";
import { Box, Center } from "@chakra-ui/react";
import Image from "next/image";
import { BsGearFill } from "react-icons/bs";

export default function ReaderAlt({
  id,
  readerAltMode,
  mangaPages,
  btnRef,
  onOpen,
}) {
  return (
    <>
      {readerAltMode && (
        <Center flexDirection="column">
          <div>{id}</div>
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
    </>
  );
}
