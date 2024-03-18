import React from "react";

function CarTable({ dataIn, handleEdit, handleDelete }) {
  if (dataIn.length === 0) {
    return <p>Zadna data k zobrazeni</p>;
  }

  return (
    <div>
      <table  className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Značka</th>
            <th scope="col">Model</th>
            <th scope="col">Reg. značka</th>
            <th scope="col">Najeto km</th>
            <th scope="col">Rok výroby</th>
            <th scope="col" colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {dataIn.map((oneCar, index) => (
            <>
              <tr key={oneCar.id}>
                <td>{oneCar.brand}</td>
                <td>{oneCar.model}</td>
                <td>{oneCar.reg}</td>
                <td>{oneCar.km}</td>
                <td>{oneCar.year}</td>
                <td>
                  <button   className="btn btn-info " onClick={() => handleEdit(oneCar.id)}>
                    editovat
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger " onClick={() => handleDelete(oneCar.id)}>
                    X
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarTable;
