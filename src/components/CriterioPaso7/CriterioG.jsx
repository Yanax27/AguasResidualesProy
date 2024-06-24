import React, { useEffect, useState } from 'react';
import TablaCriterios from '../TablaCriterios';
const g1 = "G.1. Requerimientos de personal cualificado";
const g2 = "G.2. Disponibilidad de repuestos y de servicio técnico";

function CriterioG({ onSaveCriterios }) {
    const [lineasTabla4_2, setLineasTabla4_2] = useState([]);
    const [criteriosSeleccionados, setCriteriosSeleccionados] = useState([]);

    useEffect(() => {
        const storageCriteriosTabla4_2 = JSON.parse(localStorage.getItem('selectedRowsTabla4_2'));
        const storageCriteriosSeleccionados = JSON.parse(localStorage.getItem('criterioS'));

        setLineasTabla4_2(storageCriteriosTabla4_2);
        setCriteriosSeleccionados(storageCriteriosSeleccionados);

    }, [])
    const handleSaveCriterios = (datos) => {
        if (Array.isArray(datos)) {
            onSaveCriterios(datos);
        } else {
            console.error('Error: datos no es un array', datos);
        }
    };

    return (
        <div>
            <span className="flex items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-6">
                    OPERACIÓN Y MANTENIMIENTO
                </h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                REQUERIMIENTO DE PERSONAL CUALIFICADO. Se debe valorar cada alternativa en comparación con las demás, en relación al Grado de Complejidad de las labores de operación y mantenimiento. Como apoyo a la valoración puede considerar la Complejidad de operación y mantenimiento de las Líneas de Tratamiento seleccionadas indicados en el cuadro de la derecha, recuerde:
            </p>
            <div className="flex mb-4">
                <div className="w-3/4 pr-2">
                    <TablaCriterios
                        lineas={lineasTabla4_2}
                        subcriterios={g1}
                        criteriosSeleccionados={criteriosSeleccionados}
                        onSave={handleSaveCriterios}
                    />
                </div>
                <div className="w-1/4 pl-2">
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
                            <thead className="bg-blue-400 text-white">
                                <tr>
                                    <th className="border border-gray-200 px-4 py-2">Complejidad</th>
                                    <th className="border border-gray-200 px-4 py-2">Línea de Tratamiento</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-200 px-4 py-2">Muy baja</td>
                                    <td className="border border-gray-200 px-4 py-2">Línea 1 / Línea 3 / Línea 4.1</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-200 px-4 py-2">Baja</td>
                                    <td className="border border-gray-200 px-4 py-2">Línea 4.2 / Línea 5 / Línea 3</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-200 px-4 py-2">Media</td>
                                    <td className="border border-gray-200 px-4 py-2">Línea 2 / Línea 6.1 / Línea 6.2 / Línea 7.1 / Línea 7.2 / Línea 6.3 / Línea 7.3</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-200 px-4 py-2">Alta</td>
                                    <td className="border border-gray-200 px-4 py-2">Línea 8.1 / Línea 8.2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg mb-10">
                <span className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-6">
                        DISPONIBILIDAD DE REPUESTOS Y DE SERVICIO TÉCNICO.
                    </h3>
                    <span className="h-px flex-1 bg-black"></span>
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                    Se debe valorar cada alternativa en comparación con las demás, en relación a la disponibilidad de equipos, repuestos y el servicio técnico. Como apoyo a la valoración en la tabla de la derecha se describe la situación de diferentes Líneas de Tratamiento, recuerde:
                </p>
                <TablaCriterios
                    lineas={lineasTabla4_2}
                    subcriterios={g2}
                    criteriosSeleccionados={criteriosSeleccionados}
                    onSave={handleSaveCriterios}
                />

            </div>
        </div>
    );
}

export default CriterioG;
