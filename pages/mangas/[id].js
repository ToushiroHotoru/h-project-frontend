import { getPaths } from "../../libs/get_post.js";
import css from "../../styles/pages/Manga.module.css";
import { useEffect, useState } from "react";
import { Box, Center, Divider, Heading } from "@chakra-ui/react";
import Comments from "../../components/Manga/Comments.js";
import Pages from "../../components/Manga/Pages.js";
import HeadTags from "../../components/Manga/HeadTags.js";
import HeadDesc from "../../components/Manga/HeadDesc.js";
import HeadImg from "../../components/Manga/HeadImg.js";
import Head from "next/head";

export async function getStaticProps({ params }) {
	const { id } = params;
	// http://localhost:8080/
	// https://h-project.herokuapp.com/
	const res = await fetch("https://h-project.herokuapp.com/manga-static", {
		method: "POST",
		body: JSON.stringify({ id: id }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();
	return {
		props: { manga: data, id: id }, // will be passed to the page component as props
	};
}

export async function getStaticPaths(context) {
	const data = await getPaths();
	const paths = data.map((post) => ({
		params: { id: post._id.toString() },
	}));
	return {
		paths,
		fallback: false,
	};
}

export default function Manga({ manga, id }) {
	const [mangaDynamic, setMangaDynamic] = useState();

	const onLoadHander = async () => {
		try {
			const res = await fetch("https://h-project.herokuapp.com/manga-dynamic", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: id }),
			});

			const data = await res.json();
			setMangaDynamic(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		onLoadHander();
	}, []);

	return (
		<>
			<Head>
				<title>{manga.title}</title>
			</Head>
			<div className={css.wrap}>
				<div className='container'>
					<Heading
						as='h1'
						size='xl'
						className={css.title}>
						Manga - {manga.title}
					</Heading>
					<div className={css.head}>
						<HeadImg />
						<HeadDesc
							mangaDynamic={mangaDynamic}
							manga={manga}
						/>
						<HeadTags tags={mangaDynamic && mangaDynamic.tags} />
					</div>
					<Pages
						pages={mangaDynamic && mangaDynamic.pages}
						manga={manga}
					/>
					<Comments />
				</div>
			</div>
		</>
	);
}
