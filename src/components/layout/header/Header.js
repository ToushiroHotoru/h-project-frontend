import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import {
  Flex,
  Box,
  Avatar,
  Menu,
  MenuList,
  MenuItem,
  useDisclosure,
  MenuButton,
  Divider,
} from "@chakra-ui/react";
import useAuthStore from "@/zustand/auth.zustand";

import styles from "./styles.module.css";
import AuthModal from "@/components/auth/AuthModal";

export default function Header() {
  const { isAuth, user, logout } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [timer, setTimer] = useState(null);

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
              className="link"
              fontSize="18px"
              fontWeight="600"
              cursor="pointer"
              ml={{ base: "10px", md: "20px" }}
            >
              <Link href="/mangas">Каталог</Link>
            </Box>
            <Box
              className="link"
              fontSize="18px"
              fontWeight="600"
              cursor="pointer"
              ml={{ base: "10px", md: "20px" }}
            >
              <Link href="/tags">Теги</Link>
            </Box>
            {isAuth ? (
              <Menu isOpen={isOpen}>
                <MenuButton
                  onMouseEnter={onOpen}
                  onMouseLeave={() => {
                    clearTimeout(timer);
                    const st = setTimeout(() => {
                      onClose();
                    }, 300);
                    setTimer(st);
                  }}
                >
                  <Avatar
                    ml={{ base: "10px", md: "20px" }}
                    width="30px"
                    height="30px"
                    minWidth="30px"
                    name={user.name}
                    src={user.avatar}
                    onMouseEnter={onOpen}
                  />
                </MenuButton>
                <MenuList
                  onMouseEnter={() => {
                    clearTimeout(timer);
                    onOpen();
                  }}
                  onMouseLeave={onClose}
                >
                  <MenuItem
                    onClick={() => {
                      logout(), onClose();
                    }}
                  >
                    <Link href={`/profile/${user.name}`}>
                      <a>Профиль</a>
                    </Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      logout(), onClose();
                    }}
                  >
                    Выйти
                  </MenuItem>
                </MenuList>
              </Menu>
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
