import React, { useEffect, useState } from 'react';
import data from "../data/DataCostosConstrucicon.json";

const Tabla4_6 = ({ setSelectedRowsTabla4_6 }) => {
    const [resultadosCostos, setResultadosCostos] = useState([]);
    const [checkedRows, setCheckedRows] = useState({});

    useEffect(() => {
        const poblacionHorizonte = parseInt(localStorage.getItem('poblacion_horizonte'), 10);
        const zonaEcologica = localStorage.getItem('zonaEcologica');
        const selectedLines = JSON.parse(localStorage.getItem('selectedLines')) || [];
        
        // Get previously selected rows for Tabla4_6
        const storedSelectedRowsTabla4_6 = JSON.parse(localStorage.getItem('selectedRowsTabla4_6')) || [];
        const initialCheckedRows = {};
        storedSelectedRowsTabla4_6.forEach(row => {
            initialCheckedRows[row.id] = true;
        });
        setCheckedRows(initialCheckedRows);
        setSelectedRowsTabla4_6(storedSelectedRowsTabla4_6);

        if (poblacionHorizonte && zonaEcologica && selectedLines.length > 0) {
            const newResultados = data.map(item => {
                if (item.zona_ecologica === zonaEcologica) {
                    const matchedLine = selectedLines.find(line => line.linea === item.linea_tratamiento);
                    if (matchedLine) {
                        const interpolatedCost = interpolateCost(item.partidas, poblacionHorizonte, 'costo_total_construccion');
                        const interpolatedOMCost = interpolateCost(item.partidas, poblacionHorizonte, 'costo_total_OM');

                        const costoPTAR = interpolatedCost * poblacionHorizonte;
                        const costoAnualOM = interpolatedOMCost * poblacionHorizonte;
                        return {
                            id: item.id,
                            linea: item.linea_tratamiento,
                            lineaAgua: matchedLine.lineaAgua, // ejemplo, ajustar según necesidad
                            costoPTAR: Math.round(costoPTAR),
                            costoOMAnual: Math.round(costoAnualOM),
                            seleccionada: false // Agregar propiedad seleccionada
                        };
                    }
                }
                return null;
            }).filter(item => item !== null);
            setResultadosCostos(newResultados);
        }
    }, []);

    const interpolateCost = (partidas, poblacion, tipoCosto) => {
        const keys = Object.keys(partidas).map(key => parseInt(key.split('_')[0], 10)).sort((a, b) => a - b);
        for (let i = 0; i < keys.length - 1; i++) {
            const lowerKey = keys[i];
            const upperKey = keys[i + 1];
            if (poblacion === lowerKey) {
                return partidas[`${lowerKey}_habitantes`][tipoCosto];
            }
            if (poblacion === upperKey) {
                return partidas[`${upperKey}_habitantes`][tipoCosto];
            }
            if (poblacion > lowerKey && poblacion < upperKey) {
                const lowerCost = partidas[`${lowerKey}_habitantes`][tipoCosto];
                const upperCost = partidas[`${upperKey}_habitantes`][tipoCosto];
                return lowerCost + (upperCost - lowerCost) * ((poblacion - lowerKey) / (upperKey - lowerKey));
            }
        }
        return partidas[`${keys[keys.length - 1]}_habitantes`][tipoCosto];
    };

    const formatMoney = (amount) => {
        return amount.toLocaleString('es-BO', { style: 'currency', currency: 'BOB' });
    };

    const handleCheckboxChange = (id) => {
        setCheckedRows((prev) => {
            const newCheckedRows = { ...prev, [id]: !prev[id] };
            const updatedSelectedRows = resultadosCostos.filter(item => newCheckedRows[item.id]);
            setSelectedRowsTabla4_6(updatedSelectedRows);
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
                        <th className="border border-gray-200 px-4 py-2">Costo PTAR (Bs)</th>
                        <th className="border border-gray-200 px-4 py-2">Costo anual O&M (Bs)</th>
                        <th className="border border-gray-200 px-4 py-2">Selección</th>
                    </tr>
                </thead>
                <tbody>
                    {resultadosCostos.map((resultado) => (
                        <tr
                            key={resultado.id}
                            className={checkedRows[resultado.id] ? 'bg-yellow-400' : ''}
                        >
                            <td className="border border-gray-200 px-4 py-2">{resultado.linea}</td>
                            <td className="border border-gray-200 px-4 py-2">{resultado.lineaAgua}</td>
                            <td className="border border-gray-200 px-4 py-2">{formatMoney(resultado.costoPTAR)}</td>
                            <td className="border border-gray-200 px-4 py-2">{formatMoney(resultado.costoOMAnual)}</td>
                            <td className="border border-gray-200 px-4 py-2 text-center">
                                <input
                                    type="checkbox"
                                    checked={checkedRows[resultado.id] || false}
                                    onChange={() => handleCheckboxChange(resultado.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tabla4_6;
