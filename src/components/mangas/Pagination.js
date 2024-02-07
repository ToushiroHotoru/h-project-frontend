import Link from "next/link";
import { useRouter } from "next/router";

import { MdOutlineNavigateNext, MdOutlineLastPage } from "react-icons/md";
import { Button, Flex } from "@chakra-ui/react";

export default function Pagination({ total, offset, step }) {
  const router = useRouter();
  const currentPage = router.query?.page ? Number(router.query.page) : 1;
  const currentSort = router.query?.sort ? router.query.sort : "latest";
  const totalPages = Math.ceil(total / step);
  const createPagination = () => {
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

  return (
    <Flex justifyContent="center">
      {currentPage - 1 !== 0 && (
        <Link
          href={`/mangas?page=1&sort=${currentSort}${
            router.query.tags ? "&tags=" + router.query.tags : ""
          }`}
        >
          <a>
            <Button
              mx="2px"
              p="0"
              minWidth="40px"
              colorScheme="whatsapp"
              borderRadius="50%"
              transform="rotate(180deg)"
              disabled={currentPage - 1 <= 0 ? true : false}
            >
              <MdOutlineLastPage size="20px" />
            </Button>
          </a>
        </Link>
      )}
      {currentPage - 1 !== 0 && (
        <Link
          href={`/mangas?page=${currentPage - 1}&sort=${currentSort}${
            router.query.tags ? "&tags=" + router.query.tags : ""
          }`}
        >
          <a>
            <Button
              mx="2px"
              p="0"
              minWidth="40px"
              colorScheme="whatsapp"
              borderRadius="50%"
              disabled={currentPage - 1 === 0 ? true : false}
              transform="rotate(180deg)"
            >
              <MdOutlineNavigateNext size="20px" />
            </Button>
          </a>
        </Link>
      )}

      {total > step &&
        createPagination().map((item, i) => {
          return (
            <Link
              key={i + 1}
              href={`/mangas?page=${item}&sort=${currentSort}${
                router.query.tags ? "&tags=" + router.query.tags : ""
              }`}
            >
              <a>
                <Button
                  mx="2px"
                  colorScheme={i === currentPage - 1 ? "pink" : "whatsapp"}
                  borderRadius="50%"
                >
                  {item}
                </Button>
              </a>
            </Link>
          );
        })}

      {currentPage < Math.ceil(total / step) && (
        <Link
          href={`/mangas?page=${currentPage + 1}&sort=${currentSort}${
            router.query.tags ? "&tags=" + router.query.tags : ""
          }`}
        >
          <a>
            <Button
              mx="2px"
              p="0"
              minWidth="40px"
              colorScheme="whatsapp"
              borderRadius="50%"
              disabled={currentPage === Math.ceil(total / step) ? true : false}
            >
              <MdOutlineNavigateNext size="20px" />
            </Button>
          </a>
        </Link>
      )}
      {currentPage < totalPages && (
        <Link
          href={`/mangas?page=${totalPages}&sort=${currentSort}${
            router.query.tags ? "&tags=" + router.query.tags : ""
          }`}
        >
          <a>
            <Button
              mx="2px"
              p="0"
              minWidth="40px"
              colorScheme="whatsapp"
              borderRadius="50%"
              disabled={currentPage === Math.ceil(total / step) ? true : false}
            >
              <MdOutlineLastPage size="20px" />
            </Button>
          </a>
        </Link>
      )}
    </Flex>
  );
}
