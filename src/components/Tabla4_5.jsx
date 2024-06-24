import React, { useEffect, useState } from 'react';
import dataOyM from '../data/DataOyM.json';

const Tabla4_5 = ({ setSelectedRowsTabla4_5 }) => {
    const [selectedLines, setSelectedLines] = useState([]);
    const [checkedRows, setCheckedRows] = useState({});

    useEffect(() => {
        // Get selected lines from local storage
        const storedSelectedLines = JSON.parse(localStorage.getItem('selectedLines')) || [];
        setSelectedLines(storedSelectedLines);

        // Get previously selected rows for Tabla4_5
        const storedSelectedRowsTabla4_5 = JSON.parse(localStorage.getItem('selectedRowsTabla4_5')) || [];
        const initialCheckedRows = {};
        storedSelectedRowsTabla4_5.forEach(row => {
            initialCheckedRows[row.id] = true;
        });
        setCheckedRows(initialCheckedRows);
        setSelectedRowsTabla4_5(storedSelectedRowsTabla4_5);
    }, []);

    const getComplejidad = (data, linea) => {
        for (let item of data) {
            if (item.lineas_de_tratamiento.includes(linea)) {
                return item.complejidad;
            }
        }
        return 'Desconocido';
    };

    const handleCheckboxChange = (id) => {
        setCheckedRows((prev) => {
            const newCheckedRows = { ...prev, [id]: !prev[id] };
            const updatedSelectedRows = filteredData.filter(item => newCheckedRows[item.id]);
            setSelectedRowsTabla4_5(updatedSelectedRows);
            return newCheckedRows;
        });
    };

    const filteredData = selectedLines.map(line => {
        const complejidad = getComplejidad(dataOyM, line.linea);
        return { ...line, complejidad };
    });

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
                <thead className="bg-blue-400 text-white">
                    <tr>
                        <th className="border border-gray-200 px-4 py-2">Línea</th>
                        <th className="border border-gray-200 px-4 py-2">Linea de Agua</th>
                        <th className="border border-gray-200 px-4 py-2">Complejidad O&M</th>
                        <th className="border border-gray-200 px-4 py-2">Selección</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr
                            key={item.id}
                            className={checkedRows[item.id] ? 'bg-yellow-400' : ''}
                        >
                            <td className="border border-gray-200 px-4 py-2">{item.linea}</td>
                            <td className="border border-gray-200 px-4 py-2">{item.lineaAgua}</td>
                            <td className="border border-gray-200 px-4 py-2 text-center">{item.complejidad}</td>
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

export default Tabla4_5;
