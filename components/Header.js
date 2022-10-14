import Image from "next/image";
import header from "../styles/partials/Header.module.css";
import nav from "../styles/partials/Navigation.module.css";
import A from "./partials/A";

export default function Header() {
	return (
		<header className={header.header}>
			<div className='container'>
				<div className={header.wrap}>
					<A href='/'>
						<div className={header.logo}>
							<Image
								src='/logo.svg'
								layout='fill'
								alt='logo'
							/>
						</div>
					</A>

					<nav className={nav.nav}>
						<A href='/mangas'>
							<a className={`link ${nav.link}`}>Каталог манг</a>
						</A>
					</nav>
				</div>
			</div>
		</header>
	);
}
