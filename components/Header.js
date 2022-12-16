import { Flex, Box } from "@chakra-ui/react";
import Image from "next/image";
import header from "../styles/partials/Header.module.css";
import nav from "../styles/partials/Navigation.module.css";
import A from "./partials/A";
import AuthModal from "./Auth/AuthModal";

export default function Header() {
  return (
    <header className={header.header}>
      <div className="container">
        <div className={header.wrap}>
          <A href="/">
            <a className={header.logo}>
              <Image src="/logo.svg" layout="fill" alt="logo" />
            </a>
          </A>

          <Flex alignItems="center" >
            <A href="/mangas?page=1&sort=latest">
              <a className={`link ${nav.link}`}>Каталог</a>
            </A>
            <Box className={`link ${nav.link}`} ml="20px">
              <AuthModal />
            </Box>
          </Flex>
        </div>
      </div>
    </header>
  );
}
