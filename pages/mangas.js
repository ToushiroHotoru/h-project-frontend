import catalog from "../styles/pages/Catalog.module.css";
import useSWR from "swr";
import MangaTile from "../components/Manga/MangaTile.js";
import Image from "next/image";



export default function Mangas() {
	const fetcher = (...args) => fetch(...args).then((res) => res.json());

	const { data, error } = useSWR("https://h-project.herokuapp.com/mangas", fetcher);
	if (error)
		return (
			<div className='container'>
				<div className={catalog.error}>
					<div className={catalog.error_img_box}>
						<Image
							src='/manga_cover/cover_error.png'
							layout='intrinsic'
							alt='error'
							width={723}
							height={693}
						/>
					</div>
				</div>
			</div>
		);
	if (!data) return <div className="container">загрузка...</div>;
	return (
		<div className={catalog.catalog}>
			<div className='container'>
				<div className={`${catalog.wrap} ${catalog.grid}`}>
					{data.map((item, i) => {
						return (
							<MangaTile
								props={item}
								key={i + 1}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
