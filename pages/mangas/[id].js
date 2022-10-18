import { getMangas } from "../../libs/get_post.js";

export async function getStaticProps({ params }) {
	const { id } = params;

	const res = await fetch("https://h-project.herokuapp.com/manga", {
		method: "POST",
		body: JSON.stringify({ id: id }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	console.log(res);
	const data = await res.json();
	return {
		props: { manga: data }, // will be passed to the page component as props
	};
}

export async function getStaticPaths(context) {
	console.log(context);
	const data = await getMangas();
	const paths = data.map((post) => ({
		params: { id: post._id.toString() },
	}));
	return {
		paths,
		fallback: false,
	};
}

export default function Manga({ manga }) {
	// console.log(manga);
	return <div>Manga {manga.title}</div>;
}
