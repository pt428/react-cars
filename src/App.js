import rawData from "./rawData.json";
import "./App.css";
import { useState, useEffect } from "react";
import CarTable from "./components/CarTable";
import EditCarForm from "./components/EditCarForm";
import FilterForm from "./components/FilterForm";
function App() {
  const [cars, setCars] = useState(rawData.cars);
  const [filtredCar, setFiltredCars] = useState(cars);

  const [carForEdit, setCarForEdit] = useState({
    id: "",
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });
  const [addCar, setAddCar] = useState({
    id:
      filtredCar.length > 0
        ? Math.max(...filtredCar.map((oneCar) => oneCar.id)) + 1
        : 0,
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });

  const handleEdit = (id) => {
    const tempCarForEdit = filtredCar.filter((oneCar) => {
      return oneCar.id === id;
    });
    setCarForEdit(...tempCarForEdit);
  };

  const handleDelete = (id) => {
    const carAfterDeleteOne = filtredCar.filter((oneCar) => {
      return oneCar.id !== id;
    });
    setFiltredCars(carAfterDeleteOne);
  };

  const handleChangedata = (id, temp) => {
    switch (id) {
      case "update-car": {
        setCarForEdit(temp);
        break;
      }
      case "add-car": {
        setAddCar(temp);
        break;
      }

      default:
        break;
    }
  };

  const handleClick = (id) => {
    switch (id) {
      case "update-car": {
        const temp = fillEmptyInput(carForEdit);
        if (confirmForm(temp)) {
          const index = filtredCar.findIndex(
            (oneCar) => oneCar.id === carForEdit.id
          );

          const carsToUpdate = [...filtredCar];

          carsToUpdate[index] = temp;
          setFiltredCars(carsToUpdate);
          setCarForEdit({
            id: "",
            brand: "",
            model: "",
            reg: "",
            km: "",
            year: "",
          });
          alert("Data byl úspěšně aktualizována");
        } else {
          alert("Odeslání bylo zrušeno");
        }

        break;
      }
      case "add-car": {
        const temp = fillEmptyInput(addCar);
        if (confirmForm(temp)) {
          const carToUpdate = [...filtredCar];
          carToUpdate.push(temp);
          setFiltredCars(carToUpdate);
          setAddCar({
            id:
              filtredCar.length > 0
                ? Math.max(...filtredCar.map((oneCar) => oneCar.id)) + 1
                : 0,
            brand: "",
            model: "",
            reg: "",
            km: "",
            year: "",
          });
          alert("Data byl úspěšně odeslána");
        } else {
          alert("Odeslání bylo zrušeno");
        }

        break;
      }

      default:
        break;
    }
  };

  const handleFiltredDataToShow = (cars) => {
    setFiltredCars(cars);
  };

  const fillEmptyInput = (car) => {
    const fllledCar = {
      ...car,
      brand: car.brand.trim() ? car.brand : "empty",
      model: car.model.trim() ? car.model : "empty",
      reg: car.reg.trim() ? car.reg : "empty",
      km: car.km.toString().trim() ? parseInt(car.km) : 0,
      year: car.year.toString().trim() ? parseInt(car.year) : 0,
    };
    return fllledCar;
  };
  const confirmForm = (car) => {
    return window.confirm(`Opravdu chcete odeslat?\n
 Značka: ${car.brand}\n
 Model: ${car.model}\n
 Reg. zn. : ${car.reg}\n
 km : ${car.km}
 Rok : ${car.year} `);
  };
  useEffect(() => {
    console.log("addCar");
    console.log(addCar);
  }, [addCar]);
  // *********************************************************************
  return (
    <div className="container">
      <div className="row ">
      <h1 className="text-center">Databáze aut</h1>
        <div className="col  col-sm col-md col-lg col-xl-6">
        <CarTable
            dataIn={filtredCar}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          ></CarTable>
        </div>

        <div className="col  col-sm col-md col-lg  col-xl-6">
          <FilterForm
            data={cars}
            handleFiltredDataToShow={handleFiltredDataToShow}
          ></FilterForm>
          <hr />
          <h4>Přidání nového auta</h4>
          <EditCarForm
            id={"add-car"}
            dataIn={addCar}
            handleChangedata={handleChangedata}
            handleClick={handleClick}
          ></EditCarForm>
          <hr />
          <h4>Editace auta</h4>
          <EditCarForm
            id={"update-car"}
            dataIn={carForEdit}
            handleChangedata={handleChangedata}
            handleClick={handleClick}
          ></EditCarForm>
         
          <hr />
        </div>
      </div>
    </div>
  );
}

export default App;
