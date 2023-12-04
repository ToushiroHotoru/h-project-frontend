import Link from "next/link";
import Image from "next/image";

import { useSelector } from "react-redux";
import { Flex, Box, Button } from "@chakra-ui/react";

import styles from "./styles.module.css";
import AuthModal from "@/components/auth/AuthModal";

export default function Header() {
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const userNameLetter = useSelector(
    (store) => store.authReducer.user.userName
  );

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
            <Box className={`link ${styles.link}`} cursor="pointer" ml="20px">
              <Link href="/mangas">Каталог</Link>
            </Box>
            <Box className={`link ${styles.link}`} cursor="pointer" ml="20px">
              <Link href="/tags">Теги</Link>
            </Box>
            {isAuth ? (
              <Link href={`/user/${userNameLetter}`}>
                <Button ml="20px">
                  {userNameLetter.split("")[0].toUpperCase()}
                </Button>
              </Link>
            ) : (
              <Box className={`link ${styles.link}`} ml="20px">
                <AuthModal />
              </Box>
            )}
          </Flex>
        </div>
      </div>
    </header>
  );
}
