import React, { useEffect, useState } from "react";
import LineasTratamiento from "../data/LineasTratamiento.json";

const Tabla1 = () => {
  const [lineas, setLineas] = useState([]);
  const [selectedRows, setSelectedRows] = useState(() => {
    // Obtener las filas seleccionadas del localStorage si existen
    const savedRows = localStorage.getItem("selectedLines");
    return savedRows ? JSON.parse(savedRows) : [];
  });

  useEffect(() => {
    setLineas(LineasTratamiento);
  }, []);

  useEffect(() => {
    // Guardar las filas seleccionadas en localStorage cada vez que cambien
    localStorage.setItem("selectedLines", JSON.stringify(selectedRows));
  }, [selectedRows]);

  const handleCheckboxChange = (event, index) => {
    const isChecked = event.target.checked;
    const selectedRowData = lineas[index];
    if (isChecked) {
      setSelectedRows([...selectedRows, selectedRowData]);
    } else {
      setSelectedRows(selectedRows.filter((row) => row.linea !== selectedRowData.linea));
    }
  };

  const isSelected = (index) => {
    const selectedRowData = lineas[index];
    return selectedRows.some((row) => row.linea === selectedRowData.linea);
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg mb-2">
      <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
        <thead className="bg-blue-400 text-white">
          <tr>
            <th scope="col" className="border border-gray-200 px-4 py-2">
              Línea
            </th>
            <th scope="col" className="border border-gray-200 px-4 py-2">
              Descripción
            </th>
            <th scope="col" className="border border-gray-200 px-4 py-2">
              Línea Agua
            </th>
            <th scope="col" className="border border-gray-200 px-4 py-2">
              Seleccionar
            </th>
          </tr>
        </thead>
        <tbody>
          {lineas.map((row, index) => (
            <tr key={index} className={isSelected(index) ? "bg-yellow-300" : ""}>
              <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">
                {row.linea}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">
                {row.descripcion}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">
                {row.lineaAgua}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={isSelected(index)}
                  onChange={(event) => handleCheckboxChange(event, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla1;
