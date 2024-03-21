import Link from "next/link";
import Image from "next/image";

import { Flex, Box, Button } from "@chakra-ui/react";
import useAuthStore from "@/zustand/auth.zustand";

import styles from "./styles.module.css";
import AuthModal from "@/components/auth/AuthModal";

export default function Header() {
  const { isAuth, user } = useAuthStore();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrap}>
          <Box
            position="relative"
            display="flex"
            justifyContent="flex-start"
            width="150px"
            height="26px"
          >
            <Link href="/" className={styles.logo}>
              <a>
                <Image
                  src="/logo.svg"
                  layout="fill"
                  alt="logo"
                  style={{ height: "26px" }}
                />
              </a>
            </Link>
          </Box>

          <Flex alignItems="center">
            <Box
              className={`link ${styles.link}`}
              cursor="pointer"
              ml={{ base: "10px", md: "20px" }}
            >
              <Link href="/mangas">Каталог</Link>
            </Box>
            <Box
              className={`link ${styles.link}`}
              cursor="pointer"
              ml={{ base: "10px", md: "20px" }}
            >
              <Link href="/tags">Теги</Link>
            </Box>
            {isAuth ? (
              <Link href={`/profile/${user.name}`}>
                <Button
                  ml={{ base: "10px", md: "20px" }}
                  p={0}
                  borderRadius="50%"
                  overflow="hidden"
                  width="30px"
                  height="30px"
                  minWidth="30px"
                >
                  <Image src={user.avatar} width="30px" height="30px" />
                </Button>
              </Link>
            ) : (
              <Box
                className={`link ${styles.link}`}
                ml={{ base: "10px", md: "20px" }}
              >
                <AuthModal />
              </Box>
            )}
          </Flex>
        </div>
      </div>
    </header>
  );
}
