import Header from "./headerRename/Header";
import Footer from "./footerRename/Footer";

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
