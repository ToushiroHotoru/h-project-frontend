import Image from "next/image";
import header from "../styles/partials/Header.module.css";
import nav from "../styles/partials/Navigation.module.css";
import A from "./partials/A";

export default function Header() {
  return (
    <header className={header.header}>
      <div className="container">
        <div className={header.wrap}>
          <A href="/">
            <a className={header.logo}>
              PROJECT
              {/* <Image
								src='/logo.svg'
								layout='fill'
								alt='logo'
							/> */}
            </a>
          </A>

          <nav className={nav.nav}>
            <A href="/mangas?page=0&sort=latest">
              <a className={`link ${nav.link}`}>Каталог</a>
            </A>
          </nav>
        </div>
      </div>
    </header>
  );
}
