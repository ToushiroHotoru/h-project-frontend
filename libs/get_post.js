export async function getPaths() {
	const res = await fetch(`https://h-project.herokuapp.com/get_paths`);
	// const res = await fetch(`http://localhost:8080/get_paths`);
	const data = await res.json();
	return data;
}
