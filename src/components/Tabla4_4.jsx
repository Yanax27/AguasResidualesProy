import React, { useEffect, useState } from 'react';
import dataOlores from '../data/DataEmisionOlores.json';
import dataRuidos from '../data/DataEmisionRuidos.json';

const Tabla4_4 = ({ setSelectedRowsTabla4_4 }) => {
  const [selectedLines, setSelectedLines] = useState([]);
  const [checkedRows, setCheckedRows] = useState({});

  useEffect(() => {
    // Get selected lines from local storage
    const storedSelectedLines = JSON.parse(localStorage.getItem('selectedLines')) || [];
    setSelectedLines(storedSelectedLines);

    // Get previously selected rows for Tabla4_4
    const storedSelectedRowsTabla4_4 = JSON.parse(localStorage.getItem('selectedRowsTabla4_4')) || [];
    const initialCheckedRows = {};
    storedSelectedRowsTabla4_4.forEach(row => {
      initialCheckedRows[row.linea] = true;
    });
    setCheckedRows(initialCheckedRows);
    setSelectedRowsTabla4_4(storedSelectedRowsTabla4_4);
  }, []);

  const getRiesgo = (data, linea) => {
    for (let item of data) {
      if (item.lineas_de_tratamiento.includes(linea)) {
        return item.riesgo;
      }
    }
    return 'Desconocido';
  };

  const handleCheckboxChange = (linea) => {
    setCheckedRows((prev) => {
      const newCheckedRows = { ...prev, [linea]: !prev[linea] };
      const updatedSelectedRows = filteredData.filter(item => newCheckedRows[item.linea]);
      setSelectedRowsTabla4_4(updatedSelectedRows);
      return newCheckedRows;
    });
  };

  const filteredData = selectedLines.map(line => {
    const riesgoOlores = getRiesgo(dataOlores, line.linea);
    const riesgoRuidos = getRiesgo(dataRuidos, line.linea);
    return { ...line, riesgoOlores, riesgoRuidos };
  });

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
        <thead className="bg-blue-400 text-white">
          <tr>
            <th className="border border-gray-200 px-4 py-2">Línea</th>
            <th className="border border-gray-200 px-4 py-2">Linea de Agua</th>
            <th className="border border-gray-200 px-4 py-2">Riesgo emisión olores</th>
            <th className="border border-gray-200 px-4 py-2">Riesgo emisión ruidos</th>
            <th className="border border-gray-200 px-4 py-2">Selección</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((line, index) => (
            <tr
              key={index}
              className={checkedRows[line.linea] ? 'bg-yellow-400' : ''}
            >
              <td className="border border-gray-200 px-4 py-2">{line.linea}</td>
              <td className="border border-gray-200 px-4 py-2">{line.lineaAgua}</td>
              <td className="border border-gray-200 px-4 py-2 text-center">{line.riesgoOlores}</td>
              <td className="border border-gray-200 px-4 py-2 text-center">{line.riesgoRuidos}</td>
              <td className="border border-gray-200 px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={checkedRows[line.linea] || false}
                  onChange={() => handleCheckboxChange(line.linea)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla4_4;
