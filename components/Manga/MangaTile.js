import css from "./Manga.module.css";
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
					src='https://images.hdqwalls.com/download/tracer-overwatch-2-2019-4k-j3-2160x3840.jpg'
					layout='responsive'
					alt='pic'
					width={500}
					height={700}
				/>
				<div className={css.manga_tile_title}>{props.title}</div>
			</div>
		</>
	);
}
