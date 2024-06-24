import React, { useEffect, useState } from 'react';

const Tabla4_3 = ({ setSelectedRowsTabla4_3 }) => {
  const [selectedLines, setSelectedLinesState] = useState([]);
  const [checkedRows, setCheckedRows] = useState({});

  useEffect(() => {
    // Obtener las líneas seleccionadas del localStorage
    const storedSelectedLines = JSON.parse(localStorage.getItem('selectedLines')) || [];
    setSelectedLinesState(storedSelectedLines);

    // Obtener las filas seleccionadas previamente para Tabla4_3
    const storedSelectedRowsTabla4_3 = JSON.parse(localStorage.getItem('selectedRowsTabla4_3')) || [];
    const initialCheckedRows = {};
    storedSelectedRowsTabla4_3.forEach(row => {
      initialCheckedRows[row.linea] = true;
    });
    setCheckedRows(initialCheckedRows);
    setSelectedRowsTabla4_3(storedSelectedRowsTabla4_3);
  }, [setSelectedRowsTabla4_3]);

  const handleCheckboxChange = (linea) => {
    setCheckedRows((prev) => {
      const newCheckedRows = { ...prev, [linea]: !prev[linea] };
      const updatedSelectedRows = selectedLines.filter(item => newCheckedRows[item.linea]);
      setSelectedRowsTabla4_3(updatedSelectedRows);
      return newCheckedRows;
    });
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
        <thead className="bg-blue-400 text-white">
          <tr>
            <th className="border border-gray-200 px-4 py-2">Línea</th>
            <th className="border border-gray-200 px-4 py-2">Linea de Agua</th>
            <th className="border border-gray-200 px-4 py-2">Linea de Lodos</th>
            <th className="border border-gray-200 px-4 py-2">Selección</th>
          </tr>
        </thead>
        <tbody>
          {selectedLines.map((line, index) => (
            <tr
              key={index}
              className={checkedRows[line.linea] ? 'bg-yellow-400' : ''}
            >
              <td className="border border-gray-200 px-4 py-2">{line.linea}</td>
              <td className="border border-gray-200 px-4 py-2">{line.lineaAgua}</td>
              <td className="border border-gray-200 px-4 py-2 text-center">{line.lineaLodos}</td>
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

export default Tabla4_3;
