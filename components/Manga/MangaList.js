import manga from "./Manga.module.css";
import { Image } from "next/image";

export default function MangaList(data) {
	return (
		<>
			{data.map((item) => (
				<div
					className={manga.list}
					key={item_id}>
					<div className={manga.list_image_wrap}>
						<Image
							className={manga.list_image}
							src='#'
							width={300}
							height={300}
							alt={item.title}
						/>
					</div>
					<div className={manga.list_info}>
						<div className={manga.list_title}>{item.title}</div>
						<div className={manga.list_series}>{item.series}</div>
						<div className={manga.list_artist}>{item.artist}</div>
						<div className={manga.list_tags}>
							{item.tags.forEach((tag) => (
								<div className={manga.list_tag}>{tag}</div>
							))}
						</div>
						<div className={manga.list_info}></div>
					</div>
				</div>
			))}
		</>
	);
}
