import {
  Button,
  Box,
  Input,
  Flex,
  HStack,
  Center,
  Tooltip,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import css from "../../styles/pages/Reader.module.css";
import Image from "next/image";
import {
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
} from "@chakra-ui/react";
import {
  BsGearFill,
  BsFillPencilFill,
  BsXSquare,
  BsCheck,
} from "react-icons/bs";
import { useEffect } from "react";

function EditableControls({ onSubmit, page }) {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        icon={<BsCheck />}
        {...getSubmitButtonProps()}
        onClick={() => {
          onSubmit(page);
        }}
      />
      <IconButton icon={<BsXSquare />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        size="sm"
        variant="outline"
        colorScheme="teal"
        aria-label="Call Sage"
        fontSize="20px"
        icon={<BsFillPencilFill />}
        {...getEditButtonProps()}
      />
    </Flex>
  );
}

export default function RederDef({
  readerAltMode,
  router,
  mangaPages,
  onOpen,
  btnRef,
  mangaTitle,
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
          <div className={css.content}>
            {mangaPages && (
              <div className={css.test_click_next_parent}>
                <Image
                  src={mangaPages[router.query.page - 1]}
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
            <Editable
              defaultValue={router.query.page}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <EditablePreview mr="10px" />
              {/* <EditableInput
                onChange={(e) => {
                  if (
                    Number(router.query.page) >= 1 &&
                    mangaPages &&
                    mangaPages.length >= Number(router.query.page)
                  ) {
                    router.push(
                      `/reader?id=${router.query.id}&page=${
                        e.target.value != "" && e.target.value != 0
                          ? Number(e.target.value)
                          : 1
                      }`,
                      undefined,
                      {
                        shallow: true,
                      }
                    );
                  }
                }}
              /> */}
              <Input as={EditableInput} />
              <EditableControls
                page={router.query.page}
                onSubmit={(page) => {
                  router.push(
                    `/reader?id=${router.query.id}&page=${Number(page)}`,
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
        </Center>
      )}
    </>
  );
}
