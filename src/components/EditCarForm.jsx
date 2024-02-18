import React, { useEffect, useState } from "react";

function EditCarForm({ id,dataIn,handleChangedata,handleClick }) {
  const handleChange = (event) => {
    const temp = { ...dataIn };
    const { name, value } = event.target;
    switch (name) {
      case "brand": {
        temp.brand = value;
        break;
      }
      case "model": {
        temp.model = value;
        break;
      }
      case "reg": {
        temp.reg = value;
        break;
      }
      case "km": {
        temp.km = value;
        break;
      }
      case "year": {
        temp.year = value;
        break;
      }
      default:
        break;
    }
    handleChangedata(id,temp)
    console.log(temp);
  };

  useEffect(() => {
    console.log(dataIn);
  }, []);

  return (
    <div id={id} className="mb-3">
     
        <input
        className="form-control"
          type="text"
          name="brand"
          id=""
          placeholder="Značka auta"
          value={dataIn.brand}
          onChange={handleChange}
        />
        <br />
        <input
        className="form-control"
          type="text"
          name="model"
          id=""
          placeholder="Model auta"
          value={dataIn.model}
          onChange={handleChange}
        />
        <br />
        <input
        className="form-control"
          type="text"
          name="reg"
          id=""
          placeholder="Reg. značka auta"
          value={dataIn.reg}
          onChange={handleChange}
        />
        <br />
        <input
        className="form-control"
          type="text"
          name="km"
          id=""
          placeholder="Počet ujetých km"
          value={dataIn.km}
          onChange={handleChange}
        />
        <br />
        <input
        className="form-control"
          type="text"
          name="year"
          id=""
          placeholder="Rok výroby"
          value={dataIn.year}
          onChange={handleChange}
        />
        <br />
        <input className="btn btn-info"
        onClick={()=>handleClick(id)} type="submit" name="submit" id="" />
     
    </div>
  );
}

export default EditCarForm;
