import Link from "next/link";

export default function A({ href, children }) {
	return <Link href={href}>{children}</Link>;
}
