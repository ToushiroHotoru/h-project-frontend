import Link from "next/link";

export default function A({ href, text, className, children }) {
	return (
		<Link href={href}>
			<a className={className + " link"}>{children ? children : text ? text : ""}</a>
		</Link>
	);
}
