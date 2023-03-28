// import { useColorMode } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { Flex, Box, Heading } from "@chakra-ui/react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import newMangaCss from "./../styles/components/NewManga.module.css";
import axios from "../libs/axios";
import A from "../components/partials/A";

export async function getStaticProps() {
  const response = await axios.get("/new_manga");
  const manga = response.data.manga;
  return {
    props: {
      manga,
    },
    revalidate: 10,
  };
}

export default function Index({ manga }) {
  // const { toggleColorMode } = useColorMode();
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
          slidesPerView={5}
          loop={true}
        >
          {manga.map((item, i) => {
            return (
              <SwiperSlide key={item._id}>
                <A href={`/mangas/${item._id}`}>
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
                </A>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
