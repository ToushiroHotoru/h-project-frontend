import { Flex, Box, Button } from "@chakra-ui/react";
import Image from "next/image";
import header from "../styles/partials/Header.module.css";
import nav from "../styles/partials/Navigation.module.css";
import A from "./partials/A";
import AuthModal from "./Auth/AuthModal";
import { useSelector } from "react-redux";

export default function Header() {
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const userNameLetter = useSelector(
    (store) => store.authReducer.user.userName
  );

  return (
    <header className={header.header}>
      <div className="container">
        <div className={header.wrap}>
          <A href="/">
            <a className={header.logo}>
              <Image src="/logo.svg" layout="fill" alt="logo" />
            </a>
          </A>
          <Flex alignItems="center">
            <Box className={`link ${nav.link}`} cursor="pointer" ml="20px">
              <A href="/mangas">Каталог</A>
            </Box>
            <Box className={`link ${nav.link}`} cursor="pointer" ml="20px">
              <A href="/tags">Теги</A>
            </Box>
            {isAuth ? (
              <A href={`/user/${userNameLetter}`}>
                <Button ml="20px">{userNameLetter.split("")[0].toUpperCase()}</Button>
              </A>
            ) : (
              <Box className={`link ${nav.link}`} ml="20px">
                <AuthModal />
              </Box>
            )}
          </Flex>
        </div>
      </div>
    </header>
  );
}
