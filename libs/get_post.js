export async function getMangas() {
	const res = await fetch(`https://h-project.herokuapp.com/mangas`);
	const data = await res.json();
	return data;
}
