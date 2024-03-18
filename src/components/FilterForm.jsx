import React, { useEffect, useState } from "react";

function FilterForm({ data, handleFiltredDataToShow }) {
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedReg, setSelectedReg] = useState([]);
  const [criteria, setCriteria] = useState("brand");

  const handleChange = (event) => {
    const { value, selectedOptions, name } = event.target;

    switch (name) {
      case "brand": {
        const temp = Array.from(selectedOptions).map((option) => option.value);
        setSelectedBrands(temp);

        break;
      }

      default:
        break;
    }
  };
  const handleClick = () => {
    switch (criteria) {
      case "brand": {
        const temp = data.filter((oneCar) => {
          return selectedBrands.includes(oneCar.brand);
        });
        handleFiltredDataToShow(temp);
        break;
      }
      case "reg": {
        const temp = data.filter((oneCar) => {
          return selectedReg.includes(oneCar.reg);
        });
        handleFiltredDataToShow(temp);
        break;
      }

      default:
        break;
    }
  };

  const handleReset = () => {
    handleFiltredDataToShow(data);
  };

  useEffect(() => {
    // console.log(selectedBrands);
  }, [selectedBrands]);

  useEffect(() => {
    setBrands(Array.from(new Set(data.map((brand) => brand.brand))));
  }, [data]);

  useEffect(() => {
    console.log(selectedReg);
  }, [selectedReg]);

  return (
    <div>
      <fieldset>
        <legend>Vyhledávání</legend>
        <div class="form-check">
          <input
            class="form-check-input"
            onChange={(event) => setCriteria(event.target.id)}
          type="radio"
          name="radio-choose"
          id="brand"
          checked={criteria === "brand"}
          />
          <label class="form-check-label" for="flexRadioDefault1">
          Vyhledat podle výrobce
          </label>
        </div>
        <select
          className="form-select"
          multiple
          aria-label="Multiple select example"
          disabled={criteria === "reg"}
          name="brand"
          id="brand"
          onChange={handleChange}
        >
          {brands.map((oneBrand, index) => (
            <option key={index} value={oneBrand}>
              {oneBrand}
            </option>
          ))}
        </select>
        <div class="form-check">
          <input
            class="form-check-input"        
            onChange={(event) => setCriteria(event.target.id)}
          type="radio"
          name="radio-choose"
          id="reg"
          checked={criteria === "reg"}
          />
          <label class="form-check-label" for="flexRadioDefault2">
          Vyhledat podle reg. značky
          </label>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">
            Vyhledat podle značky
          </span>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            disabled={criteria === "brand"}
            value={selectedReg}
            onChange={(event) => setSelectedReg(event.target.value)}
            placeholder="Zadejte reg.značku"
          />
        </div>

        
        <button className="btn btn-info" onClick={handleClick}>Vyhledat</button>
        <button className="btn btn-info" onClick={handleReset}>reset</button>
      </fieldset>
    </div>
  );
}

export default FilterForm;
