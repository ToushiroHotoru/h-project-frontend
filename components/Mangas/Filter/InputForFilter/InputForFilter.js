import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BsFillTriangleFill } from "react-icons/bs";

export default function InputForFilter({
  showTags,
  inputOnChange,
  inputGroupOnClickHandler,
}) {
  return (
    <InputGroup onClick={inputGroupOnClickHandler}>
      <Input
        placeholder="Список тегов"
        cursor="pointer"
        _placeholder={{ opacity: 0.5, color: "#fff" }}
        onChange={inputOnChange}
      />
      <InputRightElement>
        <BsFillTriangleFill
          style={showTags && { transform: "rotate(180deg)" }}
        />
      </InputRightElement>
    </InputGroup>
  );
}
