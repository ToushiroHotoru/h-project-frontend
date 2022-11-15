import { Button, Flex } from "@chakra-ui/react";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import { useEffect } from "react";

export default function Pagination({ router, total, offset, step }) {
  const create_pagination = () => {
    let start_page_offset = offset - step * 2;
    let end_page_offset = offset + step * 3;
    let page_offset = start_page_offset;
    let page_offsets = new Array();

    if (offset >= total || offset + step >= total) {
      end_page_offset = offset + step;
    } else if (offset + step * 2 >= total) {
      end_page_offset = offset + step * 2;
    }
    while (page_offset < end_page_offset) {
      if (page_offset >= 0) {
        page_offsets.push(page_offset);
      }
      page_offset += step;
    }

    page_offsets = page_offsets.map((item) => {
      if (item != 0) {
        item = Math.ceil(item / step);
      }
      return item;
    });
    return page_offsets;
  };

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  return (
    <Flex justifyContent="center">
      <Button
        mx="2"
        colorScheme="pink"
        disabled={Number(router.query.page) === 0 ? true : false}
        onClick={() => {
          router.push(
            `/mangas?page=${Number(router.query.page) - 1}&sort=${
              router.query.sort
            }`,
            undefined,
            {
              shallow: true,
            }
          );
        }}
      >
        <MdOutlineArrowBackIosNew />
      </Button>
      {create_pagination().map((item, i) => {
        return (
          <Button
            key={i + 1}
            mx="2"
            colorScheme={Number(router.query.page) === item ? "blue" : "pink"}
            onClick={() => {
              router.push(
                `/mangas?page=${item}&sort=${router.query.sort}`,
                undefined,
                {
                  shallow: true,
                }
              );
            }}
          >
            {item + 1}
          </Button>
        );
      })}

      <Button
        mx="2"
        colorScheme="pink"
        disabled={
          router.query.page >= Math.ceil(total / step) - 1 ? true : false
        }
        onClick={() => {
          router.push(
            `/mangas?page=${Number(router.query.page) + 1}&sort=${
              router.query.sort
            }`,
            undefined,
            {
              shallow: true,
            }
          );
        }}
      >
        <MdOutlineArrowForwardIos />
      </Button>
    </Flex>
  );
}
