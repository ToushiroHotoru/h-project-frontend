import Head from "next/head";
import styles from "../styles/Home.module.css";
import useSWR, { SWRConfig } from "swr";
import Layout from "../components/Layout";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export async function getStaticProps() {
	const response = await fetch("https://h-project.herokuapp.com/mangas");
	const mangas = await response.json();
	return {
		props: {
			fallback: {
				"https://h-project.herokuapp.com/mangas": mangas,
			},
		},
	};
}

function Mangas() {
	const { data, error } = useSWR("https://h-project.herokuapp.com/mangas", fetcher);

	if (error) return <div>ошибка загрузки</div>;
	if (!data) return <div>загрузка...</div>;

	return (
		<div>
			{data.map((item) => (
				<div
					className='check'
					key={item._id}>
					{item.artist} + {item._id}
				</div>
			))}
		</div>
	);
}

export default function Home({ fallback }) {
	return (
		<SWRConfig value={{ fallback }}>
			<Mangas />
		</SWRConfig>
	);
}
