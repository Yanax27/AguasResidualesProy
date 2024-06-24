import React, { useEffect, useState } from 'react';
import TablaCriterios from '../TablaCriterios';

const e1 = "E.1. Producción de malos olores";
const e2 = "E.2. Generación de gases de efecto invernadero";
const e3 = "E.3. Generación de ruidos";
const e4 = "E.4. Impacto visual";

function CriterioE({ onSaveCriterios }) {
    const [lineasTabla4_2, setLineasTabla4_2] = useState([]);
    const [criteriosSeleccionados, setCriteriosSeleccionados] = useState([]);

    useEffect(() => {
        const storageCriteriosTabla4_2 = JSON.parse(localStorage.getItem('selectedRowsTabla4_2'));
        const storageCriteriosSeleccionados = JSON.parse(localStorage.getItem('criteriosSeleccionados'));

        setLineasTabla4_2(storageCriteriosTabla4_2);
        setCriteriosSeleccionados(storageCriteriosSeleccionados);

    }, []);


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
                    IMPACTOS AMBIENTALES
                </h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                PRODUCCION DE MALOS OLORES. Se debe valorar cada alternativa en comparación con las demás, en relación al riesgo de emisión de malos olores. Como apoyo a la valoración puede considerar el riesgo de emisión de malos olores indicados en el cuadro de la derecha, recuerde: A mayor riesgo le corresponde menor valoración.
            </p>
            <div className="flex mb-4">
                <div className="w-4/6 pr-2">
                <TablaCriterios
                lineas={lineasTabla4_2}
                subcriterios={e1}
                criteriosSeleccionados={criteriosSeleccionados}
                onSave={handleSaveCriterios}
            />
                </div>
                <div className="w-2/4 pl-2">
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
                            <thead className="bg-blue-400 text-white">
                                <tr>
                                    <th className="border border-gray-200 px-4 py-2">Riesgo de emisión de malos olores</th>
                                    <th className="border border-gray-200 px-4 py-2">Línea de Tratamiento</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-200 px-4 py-2">Alto</td>
                                    <td className="border border-gray-200 px-4 py-2">Línea 1 / Línea 2 / Línea 6.3 / Línea 7.3 / Línea 3</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-200 px-4 py-2">Medio</td>
                                    <td className="border border-gray-200 px-4 py-2">Línea 7.1 / Línea 7.2 / Línea 6.1 / Línea 6.2 / Línea 4.1 / Línea 4.2 / Línea 5</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-200 px-4 py-2">Bajo</td>
                                    <td className="border border-gray-200 px-4 py-2">Línea 8.1 / Línea 8.2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <span className="flex items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-6">
                    GENERACIÓN DE GASES DE EFECTO INVERNADERO
                </h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                Se debe valorar cada alternativa en comparación con las demás, en relación a la emisión de Gases de efecto Invernadero. Como referencia considere que las Líneas de Tratamiento que cuenten con procesos anaerobios, generan biogás, si este biogás no se recoge, se emiten a la atmósfera gases de efecto invernadero (metano y dióxido de carbono). Recuerde: A mayor emisión le corresponde menor valoración.
            </p>
            <TablaCriterios 
                   lineas={lineasTabla4_2}
                   subcriterios={e2}
                   criteriosSeleccionados={criteriosSeleccionados}  
                   onSave={handleSaveCriterios}
                   />

            <span className="flex items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-6">
                    GENERACIÓN DE RUIDOS
                </h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                Se debe valorar cada alternativa en comparación con las demás, en relación al riesgo de generación de ruidos. Como apoyo a la valoración puede considerar el riesgo de emisión de ruidos indicados en el cuadro de la derecha. Recuerde: A mayor riesgo le corresponde menor valoración.
            </p>
            <div className="flex mb-4">
                <div className="w-3/4 pr-2">
                <TablaCriterios 
                   lineas={lineasTabla4_2}
                   subcriterios={e3}
                   criteriosSeleccionados={criteriosSeleccionados}  
                   onSave={handleSaveCriterios}
                   />
                </div>
                <div className="w-1/4 pl-2">
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
                            <thead className="bg-blue-400 text-white">
                                <tr>
                                    <th className="border border-gray-200 px-4 py-2">Riesgo de generación de ruidos</th>
                                    <th className="border border-gray-200 px-4 py-2">Línea de Tratamiento</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-200 px-4 py-2">Alto</td>
                                    <td className="border border-gray-200 px-4 py-2">Línea 2 / Línea 4.1 / Línea 4.2 / Línea 5</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-200 px-4 py-2">Medio</td>
                                    <td className="border border-gray-200 px-4 py-2">Línea 3 / Línea 7.3</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-200 px-4 py-2">Bajo</td>
                                    <td className="border border-gray-200 px-4 py-2">Línea 6.1 / Línea 6.2 / Línea 6.3 / Línea 7.1 / Línea 7.2 / Línea 8.1 / Línea 8.2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <span className="flex items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-6">
                    IMPACTO VISUAL
                </h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
            Se debe valorar cada alternativa en comparación con las demás, en relación al riesgo de generación de ruidos. Como apoyo a la valoración puede considerar el riesgo de emisión de ruidos indicados en el cuadro de la derecha, Recuerde: A mayor riesgo le corresponde menor valoración.
            </p>
            <div className="flex mb-4">
                <div className="w-3/4 pr-2">
                <TablaCriterios 
                   lineas={lineasTabla4_2}
                   subcriterios={e4}
                   criteriosSeleccionados={criteriosSeleccionados}  
                   onSave={handleSaveCriterios}
                   />
                </div>
                <div className="w-1/4 pl-2">
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
                            <thead className="bg-blue-400 text-white">
                                <tr>
                                    <th className="border border-gray-200 px-4 py-2">Riesgo de generación de lixiviados</th>
                                    <th className="border border-gray-200 px-4 py-2">Línea de Tratamiento</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-200 px-4 py-2">Alto</td>
                                    <td className="border border-gray-200 px-4 py-2">Línea 1 / Línea 2 / Línea 5</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-200 px-4 py-2">Medio</td>
                                    <td className="border border-gray-200 px-4 py-2">Línea 3 / Línea 4.1 / Línea 4.2</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-200 px-4 py-2">Bajo</td>
                                    <td className="border border-gray-200 px-4 py-2">Línea 6.1 / Línea 6.2 / Línea 6.3 / Línea 7.1 / Línea 7.2 / Línea 7.3 / Línea 8.1 / Línea 8.2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CriterioE;
