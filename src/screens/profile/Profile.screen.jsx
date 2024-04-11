import Head from "next/head";
import Image from "next/image";
import { Box, Flex, Skeleton, Heading } from "@chakra-ui/react";
import ErrorDefault from "@/components/errors/errorDefault/errorDefault";

export default function ProfileScreen({ user }) {
  if (!user) {
    return <ErrorDefault code={404} message="Пользователь не найден" />;
  }
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
