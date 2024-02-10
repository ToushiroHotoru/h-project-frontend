import Link from "next/link";
import Image from "next/image";
import { Divider } from "@chakra-ui/react";

import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.wrap}>
          <Divider my="10px" />
          <Link href="/" className={styles.logo}>
            <a>
              <Image
                src="/logo.svg"
                width={257}
                height={36}
                alt="logo"
                style={{ height: "26px" }}
              />
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
