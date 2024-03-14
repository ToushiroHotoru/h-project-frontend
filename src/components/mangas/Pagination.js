import Link from "next/link";
import { useRouter } from "next/router";

import { Button, Flex } from "@chakra-ui/react";
import { MdOutlineNavigateNext, MdOutlineLastPage } from "react-icons/md";

import useMangasStore from "@/zustand/mangas.zustand";

export default function Pagination() {
  const router = useRouter();
  const currentPage = router.query?.page ? Number(router.query.page) : 1;
  const currentSort = router.query?.sort ? router.query.sort : "latest";
  const { pageOffset, pageStep, mangasTotal } = useMangasStore();
  const totalPages = Math.ceil(mangasTotal / pageStep);

  const createPagination = () => {
    let start_page_offset = pageOffset - pageStep * 2;
    let end_page_offset = pageOffset + pageStep * 3;
    let page_offset = start_page_offset;
    let page_offsets = [];

    if (pageOffset >= mangasTotal || pageOffset + pageStep >= mangasTotal) {
      end_page_offset = pageOffset + pageStep;
    } else if (pageOffset + pageStep * 2 >= mangasTotal) {
      end_page_offset = pageOffset + pageStep * 2;
    }

    while (page_offset <= end_page_offset) {
      if (page_offset > 0) {
        page_offsets.push(page_offset);
      }
      page_offset += pageStep;
    }

    page_offsets = page_offsets.map((item) => {
      if (item != 0) {
        item = Math.ceil(item / pageStep);
      }
      return item;
    });
    return page_offsets;
  };

  return (
    mangasTotal && (
      <Flex justifyContent="center" mt="20px">
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
                minWidth={{ base: "32px", md: "40px" }}
                width={{ base: "32px", md: "40px" }}
                height={{ base: "32px", md: "40px" }}
                fontSize={{ base: "14px", md: "16px" }}
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
                minWidth={{ base: "32px", md: "40px" }}
                width={{ base: "32px", md: "40px" }}
                height={{ base: "32px", md: "40px" }}
                fontSize={{ base: "14px", md: "16px" }}
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

        {mangasTotal > pageStep &&
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
                    minWidth={{ base: "32px", md: "40px" }}
                    width={{ base: "32px", md: "40px" }}
                    height={{ base: "32px", md: "40px" }}
                    fontSize={{ base: "14px", md: "16px" }}
                  >
                    {item}
                  </Button>
                </a>
              </Link>
            );
          })}

        {currentPage < Math.ceil(mangasTotal / pageStep) && (
          <Link
            href={`/mangas?page=${currentPage + 1}&sort=${currentSort}${
              router.query.tags ? "&tags=" + router.query.tags : ""
            }`}
          >
            <a>
              <Button
                mx="2px"
                p="0"
                minWidth={{ base: "32px", md: "40px" }}
                width={{ base: "32px", md: "40px" }}
                height={{ base: "32px", md: "40px" }}
                fontSize={{ base: "14px", md: "16px" }}
                colorScheme="whatsapp"
                borderRadius="50%"
                disabled={
                  currentPage === Math.ceil(mangasTotal / pageStep)
                    ? true
                    : false
                }
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
                minWidth={{ base: "32px", md: "40px" }}
                width={{ base: "32px", md: "40px" }}
                height={{ base: "32px", md: "40px" }}
                fontSize={{ base: "14px", md: "16px" }}
                colorScheme="whatsapp"
                borderRadius="50%"
                disabled={
                  currentPage === Math.ceil(mangasTotal / pageStep)
                    ? true
                    : false
                }
              >
                <MdOutlineLastPage size="20px" />
              </Button>
            </a>
          </Link>
        )}
      </Flex>
    )
  );
}
