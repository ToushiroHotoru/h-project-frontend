import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { Flex, Box, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./styles.module.css";
import axiosFront from "@/utils/axiosFront";
import AuthModal from "@/components/auth/AuthModal";
import { updateAccessToken, updateUserInfo } from "@/redux/slices/AuthSlice";

export default function Header() {
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const userNameLetter = useSelector(
    (store) => store.authReducer.user.userName
  );
  const dispatch = useDispatch();

  const reLogin = async () => {
    const response = await axiosFront.get("/api/refreshToken");
    if (response.data.status !== null && response.data.status === 200) {
      dispatch(
        updateAccessToken({
          token: response.data.accessToken,
        })
      );
      dispatch(
        updateUserInfo({
          user: response.data.user,
        })
      );
    }
  };

  useEffect(() => {
    reLogin();
  }, []);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrap}>
          {/* <Link href="/" className={styles.logo}>
            <Image src="/logo.svg" layout="fill" alt="logo" />
          </Link> */}
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
