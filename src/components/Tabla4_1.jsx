import React, { useEffect, useState } from 'react';
import DataEficienciaRemocion from '../data/DataEficienciaRemocion.json';

const Tabla4_1 = ({ setSelectedRowsTabla4_1 }) => {
    const [eficienciaRemocion, setEficienciaRemocion] = useState([]);
    const [selectedLines, setSelectedLines] = useState([]);
    const [checkedRows, setCheckedRows] = useState({});

    useEffect(() => {
        // Get selected lines from local storage
        const storedSelectedLines = JSON.parse(localStorage.getItem('selectedLines')) || [];
        setSelectedLines(storedSelectedLines);

        // Get previously selected rows for Tabla4_1
        const storedSelectedRowsTabla4_1 = JSON.parse(localStorage.getItem('selectedRowsTabla4_1')) || [];
        const initialCheckedRows = {};
        storedSelectedRowsTabla4_1.forEach(row => {
            initialCheckedRows[row.id] = true;
        });
        setCheckedRows(initialCheckedRows);
        setSelectedRowsTabla4_1(storedSelectedRowsTabla4_1);
    }, []);

    useEffect(() => {
        // Filter data based on selected lines
        const eficienciaRemocion = DataEficienciaRemocion.filter(item => {
            // Check if any of the selected lines matches the line_tratamiento in the data
            return selectedLines.some(selectedLine => selectedLine.linea === item.linea_tratamiento);
        });
        setEficienciaRemocion(eficienciaRemocion);
    }, [selectedLines]);

    const handleCheckboxChange = (id) => {
        setCheckedRows((prev) => {
            const newCheckedRows = { ...prev, [id]: !prev[id] };
            const updatedSelectedRows = eficienciaRemocion.filter(item => newCheckedRows[item.id]);
            setSelectedRowsTabla4_1(updatedSelectedRows);
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
                        <th className="border border-gray-200 px-4 py-2">SS (%)</th>
                        <th className="border border-gray-200 px-4 py-2">DBO5 (%)</th>
                        <th className="border border-gray-200 px-4 py-2">DQO (%)</th>
                        <th className="border border-gray-200 px-4 py-2">NT (%)</th>
                        <th className="border border-gray-200 px-4 py-2">PT (%)</th>
                        <th className="border border-gray-200 px-4 py-2">Selección</th>
                    </tr>
                </thead>
                <tbody>
                    {eficienciaRemocion.map((item) => (
                        <tr
                            key={item.id}
                            className={checkedRows[item.id] ? 'bg-yellow-400' : ''}
                        >
                            <td className="border border-gray-200 px-4 py-2">
                                {item.linea_tratamiento}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">{item.lineaAgua}</td>
                            <td className="border border-gray-200 px-4 py-2">{item.SS}</td>
                            <td className="border border-gray-200 px-4 py-2">{item.DBO5}</td>
                            <td className="border border-gray-200 px-4 py-2">{item.DQO}</td>
                            <td className="border border-gray-200 px-4 py-2">{item.NT}</td>
                            <td className="border border-gray-200 px-4 py-2">{item.PT}</td>
                            <td className="border border-gray-200 px-4 py-2 text-center">
                                <input
                                    type="checkbox"
                                    checked={checkedRows[item.id] || false}
                                    onChange={() => handleCheckboxChange(item.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tabla4_1;
