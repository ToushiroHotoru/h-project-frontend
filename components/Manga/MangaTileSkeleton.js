import { Skeleton, SkeletonText } from "@chakra-ui/react";
import css from "../../styles/components/MangaTile.module.css";
export default function MangaTileSkeleton() {
  return (
    <>
      <div className={css.manga_tile}>
        <Skeleton height="400px" />
        <Skeleton height="50px" mt="4" />
      </div>
    </>
  );
}
