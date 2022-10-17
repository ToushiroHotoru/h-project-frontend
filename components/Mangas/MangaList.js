import manga from "../../styles/components/MangaList.module.css";
import Image from "next/image";

export default function MangaList({ data }) {
  return (
    <>
      <div className={manga.list}>
        <div className={manga.list_image_wrap}>
          {/* {data &&
            data.map((item) => {
              return (
                <Image
                  className={manga.list_image}
                  src="#"
                  width={300}
                  height={300}
                  alt={item.title}
                />
              );
            })} */}
          <Image
            // onLoad={onLoadHandler}
            src="https://i.pinimg.com/originals/75/2d/21/752d2198f907d328b1403f91b2a7ded0.jpg"
            layout="intrinsic"
            alt="pic"
            width={200}
            height={300}
          />
        </div>
        <div className={manga.list_info}>
          <div className={manga.list_title}>{data.title}</div>
          <div className={manga.list_series}>{data.series}</div>
          <div className={manga.list_artist}>{data.artist}</div>
          <div className={manga.list_tags}>
            {data.tags.map((tag, i) => {
              return (
                <div className={manga.list_tag} key={i + 1}>
                  {tag}
                </div>
              );
            })}
          </div>
          <div className={manga.list_info}></div>
        </div>
      </div>
    </>
  );
}
