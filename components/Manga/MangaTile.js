import css from "../../styles/components/MangaTile.module.css";
import Image from "next/image";

// const myLoader = () => {
// 	return "https://i.pinimg.com/originals/c6/d3/47/c6d347f93ea96785bfbc2fd13a5950f9.png";
// };

export default function MangaTile({ props }) {
  return (
    <>
      <div className={css.manga_tile}>
        <Image
          // loader={myLoader}
          src="https://get.wallhere.com/photo/THE-email-protected-brunette-anime-girls-one-eye-closed-phone-redhead-yellow-eyes-belly-sunglasses-2185007.jpg"
          layout="responsive"
          alt="pic"
          width={500}
          height={700}
        />

        <div className={css.manga_tile_title}>{props.title}</div>
      </div>
    </>
  );
}
