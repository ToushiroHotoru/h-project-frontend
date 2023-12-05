import { BsFillTriangleFill } from "react-icons/bs";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";

export default function InputForFilter({
  showTags,
  setIsFiltered,
  setFilterValue,
  onClickHandler,
}) {
  const onChangeHandler = () => {
    setIsFiltered(e.target.value ? true : false);
    setFilterValue(e.target.value);
  };

  return (
    <InputGroup onClick={onClickHandler}>
      <Input
        placeholder="Список тегов"
        cursor="pointer"
        _placeholder={{ opacity: 0.5, color: "#fff" }}
        onChange={onChangeHandler}
      />
      <InputRightElement>
        <BsFillTriangleFill
          style={showTags && { transform: "rotate(180deg)" }}
        />
      </InputRightElement>
    </InputGroup>
  );
}
