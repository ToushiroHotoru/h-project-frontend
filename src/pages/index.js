import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Flex, Box, Heading } from "@chakra-ui/react";

import axios from "@/utils/axios";
import newMangaCss from "@/styles/components/NewManga.module.css";

export default function Index() {
  const [newManges, setNewMangas] = useState([]);
  const loadNewMangas = async () => {
    const response = await axios.get("/new_manga");
    setNewMangas(response.data.manga);
  };

  useEffect(() => {
    loadNewMangas();
  }, []);
  return (
    <div className="container">
      <Head>
        <title>Главная</title>
      </Head>
      <div className={newMangaCss.news_manga}>
        <Heading as="h1" size="xl" marginBottom="12px">
          Новые манги
        </Heading>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={14}
          slidesPerView={2}
          loop={true}
          breakpoints={{
            1000: {
              slidesPerView: 5,
            },
            700: {
              slidesPerView: 4,
            },
            700: {
              slidesPerView: 3,
            },
          }}
        >
          {newManges.map((item, i) => {
            return (
              <SwiperSlide key={item._id}>
                <Link href={`/mangas/${item._id}`}>
                  <a>
                    <Image
                      src={item.cover}
                      layout="responsive"
                      alt="pic"
                      width={500}
                      height={700}
                    />
                    <Flex
                      position="absolute"
                      left="0"
                      bottom="0"
                      zIndex="2"
                      width="100%"
                      px={{ base: "4px", sm: "8px" }}
                      pb={{ base: "4px", sm: "6px" }}
                      height={{ base: "50%", sm: "30%" }}
                      bgGradient="linear(to-t, rgba(0,0,0,0.8), rgba(0,0,0,0))"
                    >
                      <Box
                        mt="auto"
                        maxHeight={{ base: "34px", sm: "48px" }}
                        fontSize={{ base: "14px", sm: "18px" }}
                        lineHeight="125%"
                        overflowY="hidden"
                      >
                        {item.title}
                      </Box>
                    </Flex>
                  </a>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
