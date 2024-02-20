import Head from "next/head";
import Image from "next/image";
import { Box, Flex, Skeleton, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import axios from "@/utils/axios";
import ErrorDefault from "./../../components/errors/errorDefault/errorDefault";

export default function Profile() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({ code: null, message: "" });
  const router = useRouter();

  const getCurrentUser = async () => {
    setIsLoading(true);
    const username = router.query.username;
    axios
      .get(`/user`, {
        params: {
          username: username,
        },
      })
      .then((response) => {
        const { data, status, message } = response.data;
        if (status === "success") {
          setIsError(false);
          setError({ code: null, message: "" });
          setUser(data.user);
          setIsLoading(false);

          console.log(user.username.split(""));
        }
      })
      .catch((response) => {
        setIsError(true);
        setError({ code: response.status, message: response.message });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCurrentUser();
  }, [router.query.username]);

  if (!user && isLoading) {
    return (
      <>
        <Head>
          <title>Профиль</title>
        </Head>

        <Flex height="100%" position="relative">
          <div className="container">
            <Box>
              <Box
                borderTopLeftRadius="10px"
                borderTopRightRadius="10px"
                width="100%"
                height="160px"
                backgroundColor="var(--pink)"
              >
                <Box textAlign="center" fontSize="52px" pt="24px">
                  H-PROJECT
                </Box>
                <Skeleton isLoaded={isLoading}>
                  <Flex justifyContent="center">
                    <Image
                      src="/zero.png"
                      width="100px"
                      height="100px"
                      objectFit="cover"
                    />
                  </Flex>
                </Skeleton>
              </Box>
              <Skeleton isLoaded={isLoading}>
                <Heading as="h1">User</Heading>
              </Skeleton>
            </Box>
          </div>
        </Flex>
      </>
    );
  }

  if (!isLoading && isError) {
    return (
      <>
        <Head>
          <title>Профиль</title>
        </Head>

        <Flex height="100%" position="relative">
          <div className="container">
            <ErrorDefault code={error.code} message={error.message} />
          </div>
        </Flex>
      </>
    );
  }

  if (!isLoading && user) {
    return (
      <>
        <Head>
          <title>Профиль</title>
        </Head>

        <Flex height="100%" position="relative">
          <div className="container">
            <Box>
              <Box
                borderTopLeftRadius="10px"
                borderTopRightRadius="10px"
                width="100%"
                height="160px"
                backgroundColor="var(--pink)"
              >
                <Box textAlign="center" fontSize="52px" pt="24px">
                  H-PROJECT
                </Box>

                {/* <Skeleton isLoaded={isLoading}> */}
                <Flex
                  justifyContent="center"
                  borderRadius="50%"
                  overflow="hidden"
                  width="100px"
                  height="100px"
                  mx="auto"
                >
                  {user.avatar?.image ? (
                    <Image
                      src={user.avatar?.image}
                      width="100px"
                      height="100px"
                      objectFit="cover"
                    />
                  ) : (
                    <Flex
                      width="100%"
                      height="100%"
                      backgroundColor="grey"
                      justifyContent="center"
                      alignItems="center"
                      fontSize="44px"
                    >
                      {user.username?.split("")[0].toUpperCase()}
                    </Flex>
                  )}
                </Flex>
                {/* </Skeleton> */}
              </Box>
              <Heading as="h1" textAlign="center" mt="54px">
                {user.username}
              </Heading>
              <Box textAlign="center" fontSize="14px">
                {user.role?.roleRu}
              </Box>
            </Box>
          </div>
        </Flex>
      </>
    );
  }
}
