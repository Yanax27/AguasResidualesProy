import React, { useEffect, useState } from 'react'
import TablaCriterios from '../TablaCriterios';

const b1 = "B.1. Superficie disponible";
const b2 = "B.2. Características constructivas de los terrenos";


function CriterioB({onSaveCriterios}) {
    const [lineasTabla4_2, setLineasTabla4_2] = useState([]);
    const [criteriosSeleccionados, setCriteriosSeleccionados] = useState([]);

    useEffect(() => {
        const storageCriteriosTabla4_2 = JSON.parse(localStorage.getItem('selectedRowsTabla4_2'));
        setLineasTabla4_2(storageCriteriosTabla4_2);
        const storageCriteriosSeleccionados = JSON.parse(localStorage.getItem('criterioS'));
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
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg mb-10">
            <span className="flex items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-6">
                    TERRENOS DISPONIBLES
                </h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                SUPERFICIE DISPONIBLE. Se debe valorar cada alternativa en comparación con las demás, en relación a los requerimientos de superficie de cada Línea de Tratamiento. Como apoyo a la valoración en el cuadro de la derecha se presenta el requerimiento de superficie de las Líneas previamente selecciondas considerando lo previsto en el apartado 12.2.3.2 de la Guía, recuerde:             </p>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-4">
                A mayor rendimiento le corresponde mayor valoración.
            </p>

            <TablaCriterios
                lineas={lineasTabla4_2}
                subcriterios={b1}
                criteriosSeleccionados={criteriosSeleccionados}
                onSave={handleSaveCriterios}
            />
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                CARACTERÍSTICAS CONSTRUCTIVAS DE LOS TERRENOS. Se debe valorar cada alternativa en comparación con las demás, en relación a los posibles problemas producto de las características de constructivas del terreno como ser: topografía, geotécnia, profundidad del nivel freático. La valoración es propia de cada caso, no obstante, en el cuadro de la derecha se describe problemas típicos.             </p>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-4">
                A mayores problemas constructivos le corresponde menor valoración
            </p>
            <div className="flex mb-4">
                <div className="w-4/6 pr-2">
                <TablaCriterios
                lineas={lineasTabla4_2}
                subcriterios={b2}
                criteriosSeleccionados={criteriosSeleccionados}
                onSave={handleSaveCriterios}
            />

                </div>
                <div className="w-2/4 pl-2">
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
                            <thead>
                                <tr className="bg-blue-400">
                                    <th className="py-3 px-4 text-center text-white">Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-3 px-4 text-gray-700 text-justify">
                                        Los tratamientos que exigen mayores movimientos de tierra (caso de las Lagunas de Estabilización), se ven penalizados en terrenos rocosos o difíciles de excavar
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 px-4 text-gray-700 text-justify">
                                        Los tratamientos que requieran mayores profundidades de excavación (Tanques Imhoff, Lagunas Anaerobias), les afectará el nivel freático de mayor manera
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 px-4 text-gray-700 text-justify">
                                        Los tratamientos que precisen de desniveles mayores para poder realizar una operación por gravedad (Filtros Percoladores, Humedales Artificiales de Flujo Vertical), se verán beneficiados cuando la topografía así lo permita.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CriterioB