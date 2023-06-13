import { useState } from "react";
import Select, { components } from "react-select";
import { SearchIcon } from "./SearchIcon";
import axios from "axios";

const CitySearch = () => {
  const [inputText, setInputText] = useState("");
  const [municipios, setMunicipios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (inputText, meta) => {
    if (meta.action !== "input-blur" && meta.action !== "menu-close") {
      setInputText(inputText);
      handleSearch(inputText);
    }
  };

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim().length === 0) {
      setMunicipios([]);
      return;
    }
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/ciudad?nombre=${searchQuery}`)
      .then((response) => {
        setMunicipios(response.data.map((l) => ({ label: l, value: l })));
        setIsLoading(false);
      });
  };

  const noOptionsMessage = (obj) => {
    if (obj.inputValue.trim().length === 0) {
      return null;
    }
    return "No existen municipios con ese nombre";
  };

  return (
    <span style={{ marginLeft: "10px", display: "inline-block", width: "75%" }}>
      <Select
        name="municipio"
        options={municipios}
        isClearable={true}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator,
        }}
        styles={customStyles}
        inputValue={inputText}
        onInputChange={handleInputChange}
        isLoading={isLoading}
        filterOption={null}
        noOptionsMessage={noOptionsMessage}
        placeholder={"Buscar..."}
        required
      />
    </span>
  );
};

export default CitySearch;

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <SearchIcon />
      </components.DropdownIndicator>
    )
  );
};

const customStyles = {
  control: (base) => ({
    ...base,
    flexDirection: "row-reverse",
  }),
  clearIndicator: (base) => ({
    ...base,
    position: "absolute",
    right: 0,
  }),
  valueContainer: (base) => ({
    ...base,
    paddingRight: "2.3rem",
  }),
};
