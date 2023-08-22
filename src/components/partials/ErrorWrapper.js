import catalog from "../../styles/partials/Error.module.css";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

export default function ErrorWrapper({ children, link, linkTitle }) {
  return (
    <div className="container">
      <div className={catalog.error}>
        <div className={catalog.error_img_box}>{children}</div>
        <Link href={link}>
          <Button mt="1em" colorScheme="orange">
            {linkTitle}
          </Button>
        </Link>
      </div>
    </div>
  );
}
