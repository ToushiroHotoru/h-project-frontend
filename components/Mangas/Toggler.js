import catalog from "../../styles/pages/Catalog.module.css";
import { FiList } from "react-icons/fi";
import { BsImage } from "react-icons/bs";
import { Center } from "@chakra-ui/react";

export default function Toggler({ isToggled, setIsToggled }) {
  return (
    <div className={catalog.toggler}>
      <Center
        className={`${catalog.toggle_common} ${
          !isToggled && catalog.toggle_active
        }`}
        onClick={() => {
          setIsToggled(false);
        }}
      >
        <BsImage />
      </Center>
      <Center
        className={`${catalog.toggle_detail} ${
          isToggled && catalog.toggle_active
        }`}
        onClick={() => {
          setIsToggled(true);
        }}
      >
        <FiList />
      </Center>
    </div>
  );
}
