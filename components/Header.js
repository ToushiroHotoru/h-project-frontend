import Image from "next/image";
import header from "../styles/partials/Header.module.css";
import nav from "../styles/partials/Navigation.module.css";
import A from "./partials/A"

export default function Header() {
	return (
		<header className={header.header}>
			<div className='container'>
				<div className={header.wrap}>
					<A className={header.logo} href="/">
						<Image
							src='/logo.svg'
							layout="fill"
							alt='logo'
						/>
					</A>

					<nav className={nav.nav}>
						<A className={nav.link} href="/mangas" text="Каталог манг" />
					</nav>
				</div>
			</div>
		</header>
	);
}
