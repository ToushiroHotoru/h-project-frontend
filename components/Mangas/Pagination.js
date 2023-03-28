import { Button, Flex } from "@chakra-ui/react";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import { useEffect } from "react";

export default function Pagination({ router, total, offset, step }) {
  const currentPage = router.query?.page ? router.query?.page : 1;
  const currentSort = router.query?.sort ? router.query.sort : "latest";
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

    while (page_offset <= end_page_offset) {
      if (page_offset > 0) {
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
      {Number(currentPage) - 1 !== 0 ? (
        <Button
          mx="2"
          colorScheme="whatsapp"
          disabled={Number(currentPage) - 1 === 0 ? true : false}
          onClick={() => {
            router.push(
              `/mangas?page=${Number(currentPage) - 1}&sort=${currentSort}${
                router.query.tag ? "&tag=" + router.query.tag : ""
              }`,
              undefined,
              {
                scroll: true,
                shallow: true,
              }
            );
          }}
        >
          <MdOutlineArrowBackIosNew />
        </Button>
      ) : (
        ""
      )}

      {create_pagination().map((item, i) => {
        return (
          <Button
            key={i + 1}
            mx="2"
            colorScheme={Number(currentPage) === item ? "gray" : "whatsapp"}
            onClick={() => {
              router.push(
                `/mangas?page=${item}&sort=${currentSort}${
                  router.query.tag ? "&tag=" + router.query.tag : ""
                }`,
                undefined,
                {
                  scroll: true,
                  shallow: true,
                }
              );
            }}
          >
            {item}
          </Button>
        );
      })}

      {currentPage <= Math.ceil(total / step) - 1 ? (
        <Button
          mx="2"
          colorScheme="whatsapp"
          disabled={currentPage >= Math.ceil(total / step) - 1 ? true : false}
          onClick={() => {
            router.push(
              `/mangas?page=${Number(currentPage) + 1}&sort=${currentSort}${
                router.query.tag ? "&tag=" + router.query.tag : ""
              }`,
              undefined,
              {
                scroll: true,
                shallow: true,
              }
            );
          }}
        >
          <MdOutlineArrowForwardIos />
        </Button>
      ) : (
        ""
      )}
    </Flex>
  );
}
