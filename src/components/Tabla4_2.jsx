import React, { useEffect, useState } from 'react';
import dataSuperficie from '../data/DataSuperficieEstimada.json';

const Tabla4_2 = ({ setSelectedRowsTabla4_2 }) => {
  const [selectedZone, setSelectedZone] = useState('');
  const [populationHorizon, setPopulationHorizon] = useState(0);
  const [populationTerreno, setPopulationTerreno] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [checkedRows, setCheckedRows] = useState({});
  const [selectedLines, setSelectedLinesState] = useState([]);

  useEffect(() => {
    // Obtener zona seleccionada y horizonte poblacional del local storage
    const storedZone = localStorage.getItem('zonaEcologica') || '';
    const storedPopulation = parseInt(localStorage.getItem('poblacion_horizonte'), 10) || 0;
    const storedTerreno = parseInt(localStorage.getItem('area_terreno'), 10) || 0;
   // const storedSelectedLines = JSON.parse(localStorage.getItem('selectedLines')) || [];
  //  setSelectedLinesState(storedSelectedLines);
    setSelectedZone(storedZone);
    setPopulationHorizon(storedPopulation);
    setPopulationTerreno(storedTerreno);

    // Obtener filas seleccionadas previamente para Tabla4_2
    const storedSelectedRowsTabla4_2 = JSON.parse(localStorage.getItem('selectedRowsTabla4_2')) || [];
    const initialCheckedRows = {};
    storedSelectedRowsTabla4_2.forEach(row => {
      initialCheckedRows[row.id] = true;
    });
    setCheckedRows(initialCheckedRows);
    setSelectedRowsTabla4_2(storedSelectedRowsTabla4_2);
  }, [setSelectedRowsTabla4_2]);

  useEffect(() => {
    if (selectedZone && populationHorizon) {
      // Filtrar datos según la zona seleccionada
      const filtered = dataSuperficie.filter(item => item.zona_ecologica === selectedZone);

      // Interpolar el horizonte poblacional si no se encuentra un valor exacto
      const interpolatedData = filtered.map(item => {
        const horizons = Object.keys(item.partidas);
        const horizonNumbers = horizons.map(h => parseInt(h.split('_')[0], 10));
        const closestLower = Math.max(...horizonNumbers.filter(num => num <= populationHorizon));
        const closestUpper = Math.min(...horizonNumbers.filter(num => num >= populationHorizon));

        let superficieTotal;
        if (closestLower === closestUpper || closestLower === -Infinity || closestUpper === Infinity) {
          superficieTotal = item.partidas[`${closestUpper || closestLower}_habitantes`]?.superficie_total || 0;
        } else {
          const lowerValue = item.partidas[`${closestLower}_habitantes`]?.superficie_total || 0;
          const upperValue = item.partidas[`${closestUpper}_habitantes`]?.superficie_total || 0;
          superficieTotal = lowerValue + ((upperValue - lowerValue) * (populationHorizon - closestLower) / (closestUpper - closestLower));
        }

        superficieTotal = parseFloat(superficieTotal);

        const superficieNecesaria = (superficieTotal * populationHorizon);
        const estado = superficieNecesaria <= populationTerreno ? 'Área suficiente' : 'Área disponible insuficiente';
        return {
          ...item,
          superficie_total: superficieTotal.toFixed(2),
          superficie_necesaria: Math.round(superficieNecesaria),
          estado: estado
        };
      }).filter(item => item.superficie_total > 0);

      setFilteredData(interpolatedData);
    }
  }, [selectedZone, populationHorizon, populationTerreno]);

  const handleCheckboxChange = (id) => {
    setCheckedRows((prev) => {
      const newCheckedRows = { ...prev, [id]: !prev[id] };
      const updatedSelectedRows = filteredData.filter(item => newCheckedRows[item.id]);
      setSelectedRowsTabla4_2(updatedSelectedRows);
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
            <th className="border border-gray-200 px-4 py-2">Requisito superficie</th>
            <th className="border border-gray-200 px-4 py-2">Superficie necesaria</th>
            <th className="border border-gray-200 px-4 py-2">Estado</th>
            <th className="border border-gray-200 px-4 py-2">Selección</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <tr
                key={item.id}
                className={checkedRows[item.id] ? 'bg-yellow-400' : ''}
              >
                <td className="border border-gray-200 px-4 py-2">{item.linea_tratamiento}</td>
                <td className="border border-gray-200 px-4 py-2">{item.partidas.linea_agua}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{item.superficie_total}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{item.superficie_necesaria}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{item.estado}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={checkedRows[item.id] || false}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border border-gray-200 px-4 py-2 text-center">No hay datos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla4_2;
