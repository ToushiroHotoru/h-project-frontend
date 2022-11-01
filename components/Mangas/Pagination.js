import { Button, Flex } from "@chakra-ui/react";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";

export default function Pagination({
  pageIndex,
  total,
  offset,
  step,
  setPageIndex,
}) {
  const create_pagination = () => {
    console.log(offset, total);
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

  return (
    <Flex justifyContent="center">
      <Button
        mx="2"
        colorScheme="pink"
        disabled={pageIndex === 0 ? true : false}
        onClick={() => {
          setPageIndex(() => {
            return pageIndex - 1;
          });
        }}
      >
        <MdOutlineArrowBackIosNew />
      </Button>
      {create_pagination().map((item, i) => {
        return (
          <Button
            key={i + 1}
            mx="2"
            colorScheme={pageIndex === item ? "blue" : "pink"}
            onClick={() => {
              setPageIndex(() => {
                return item;
              });
            }}
          >
            {item + 1}
          </Button>
        );
      })}

      <Button
        mx="2"
        colorScheme="pink"
        disabled={pageIndex >= Math.ceil(total / step) - 1 ? true : false}
        onClick={() => {
          setPageIndex(() => {
            return pageIndex + 1;
          });
        }}
      >
        <MdOutlineArrowForwardIos />
      </Button>
    </Flex>
  );
}
