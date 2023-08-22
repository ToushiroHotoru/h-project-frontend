import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
	return (
		<>
			<div className='content'>
				<Header />
				<div className='page'>{children}</div>
			</div>
			<Footer />
		</>
	);
}
