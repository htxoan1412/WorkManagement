import { TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { ISearchBar } from "../../../../api/task/type";
const ContainerSearch = styled.div`
  margin-left: 200px;
`;
const SearchTask: React.FC<ISearchBar> = ({ setSearchKey }) => {
  const [textInput, setTextInput] = useState("");
  const onChangeInput = (event: any): void => {
    setTextInput(event.currentTarget.value.trim());
    if (event.currentTarget.value.trim().length === 0)
      setSearchKey(event.currentTarget.value.trim());
  };
  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setSearchKey(textInput);
    }
  };

  return (
    <ContainerSearch>
      <TextField
        helperText=" "
        id="demo-helper-text-aligned-no-helper"
        label="Search by Task Name"
        style={{ width: "500px" }}
        onChange={(e) => onChangeInput(e)}
        onKeyUp={onKeyUp}
      />
    </ContainerSearch>
  );
};

export default SearchTask;
