import React, { useEffect, useState } from "react";
import LineasTratamiento from "../data/LineasTratamiento.json"

const Paso1 = () => {

  const [lineaTratamiento, setLineaTratamiento] = useState([]);
  useEffect(() => {
    setLineaTratamiento(LineasTratamiento);
  }, []);

  return (


    <div className="overflow-x-auto shadow-md sm:rounded-lg mb-2">

      <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-blue-400 text-white">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Línea
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Descripción
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Línea Agua
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Línea de Lodos
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {lineaTratamiento.map((item) =>(
          <tr key={item.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {item.linea}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {item.descripcion}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 text-center">
              {item.lineaAgua}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 text-center">{item.lineaLodos}</td>
          </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default Paso1;
