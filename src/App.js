import "./App.css";
import { useState, useEffect } from "react";
import CarTable from "./components/CarTable";
import EditCarForm from "./components/EditCarForm";
import FilterForm from "./components/FilterForm";
import axios from "axios";

function App() {
  const [cars, setCars] = useState([]);//vsechna auta
  const [filtredCar, setFiltredCars] = useState([]);//vyfiltrovana a k zobrazeni

  const [carForEdit, setCarForEdit] = useState({//auto k editaci
    id: "",
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });

  const [addCar, setAddCar] = useState({///auto k pridani

    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });

  //********************** GET data **************************************************npm star
   const getCars = () => {
    axios
      .get("https://pavel-tichy.cz/projects/cars/server/?action=getAll")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCars(response.data);
          setFiltredCars(response.data);
        } else {
          console.log("odpoved serveru neni pole");
        }
      })
      .catch((error) => {
        console.log("chyba serveru:", error);
        alert("chyba serveru:", error);
      });
  };

  //******************* GETspec data  **************************************
  const filtredCars = (ids) => {
    //[1,5,2,4]
    const param = ids.join(); //"1,5,2,4"
    axios
      .get(`https://pavel-tichy.cz/projects/cars/server/?action=getSpec&ids=${param}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setFiltredCars(response.data);
        } else {
          console.log("odpoved serveru neni pole");
        }
      })
      .catch((error) => {
        console.log("chyba serveru:", error);
        alert("chyba serveru:", error);
      });
  };

  //*********************** DELETE *****************************************
  const deleteCar = (id) => {
    axios
      .delete(`https://pavel-tichy.cz/projects/cars/server/${id}`)
      .then((response) => {
        console.log(response.data);
        getCars();
        alert("Auto úspěšně smazáno.");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  //******************** addcar POST *************************************** */
  const insertCar = (car) => {
    axios.post('https://pavel-tichy.cz/projects/cars/server/', car).then((response) => {
    console.log(response.data);
    getCars();
    // alert("Auto úspěšně přidáno.");
    }).catch((error) => {
    console.error("There was an error!", error);
    alert(`Chyba: ${error}`);
    });
    }

    //************************ update car PUT ***********************************
    const updateCar = (car)=>{
      axios.put('https://pavel-tichy.cz/projects/cars/server/', car).then((response) => {
        console.log(response.data);
        getCars();
        // alert("Auto úspěšně aktualizovano.");
        }).catch((error) => {
        console.error("There was an error!", error);
        alert(`Chyba: ${error}`);
        });
    }

  useEffect(() => {
    getCars();
  }, []);

  const handleEdit = (id) => {
    const tempCarForEdit = filtredCar.filter((oneCar) => {
      return oneCar.id === id;
    });
    setCarForEdit(...tempCarForEdit);
  };

  const handleDelete = (id) => {
    deleteCar(id);
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
          // const index = filtredCar.findIndex(
          //   (oneCar) => oneCar.id === carForEdit.id
          // );
          updateCar(temp);
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

          insertCar(temp);
          setAddCar({

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
    
    const ids = cars.map((car) => car.id);

    filtredCars(ids);
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
