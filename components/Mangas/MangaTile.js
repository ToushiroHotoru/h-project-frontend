import css from "../../styles/components/MangaTile.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

export default function MangaTile({ props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const onLoadHandler = () => {
    setIsLoaded(true);
  };

  return (
    <Link href={`/${props._id}`}>
      <div className={css.manga_tile}>
        <Skeleton isLoaded={isLoaded}>
          <Image
            onLoad={onLoadHandler}
            src="/manga_cover/cover_6.jpg"
            layout="responsive"
            alt="pic"
            width={500}
            height={700}
          />
        </Skeleton>
        <SkeletonText isLoaded={isLoaded} mt="4">
          <div className={css.manga_tile_title}>{props.title}</div>
        </SkeletonText>
      </div>
    </Link>
  );
}
