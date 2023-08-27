import Header from "./header/Header";
import Footer from "./footer/Footer";

export default function Layout({ children }) {
  return (
    <>
      <div className="content">
        <Header />
        <div className="page">{children}</div>
      </div>
      <Footer />
    </>
  );
}
