import { LINK } from "./changeApiUrl.js";

export async function getPaths() {
	const res = await fetch(`${LINK}/get_paths`);
	const data = await res.json();
	return data;
}
