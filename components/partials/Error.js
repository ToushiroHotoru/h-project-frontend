import catalog from "../../styles/pages/Catalog.module.css";
import Image from "next/image";

export default function Error({ children }) {
  return (
    <div className="container">
      <div className={catalog.error}>
        <div className={catalog.error_img_box}>{children}</div>
      </div>
    </div>
  );
}
