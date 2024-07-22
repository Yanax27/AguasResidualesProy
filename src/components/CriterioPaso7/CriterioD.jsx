import React, { useEffect, useState } from 'react'
import TablaCriterios from '../TablaCriterios';

const d1 = "D.1. Temperatura";
const d2 = "D.2. Pluviometría";
const d3 = "D.3. Altitud";

function CriterioD({ onSaveCriterios }) {
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
                    CARACTERÍSTICAS MEDIOAMBIENTALES
                </h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                TEMPERATURA. Se constituye en el factor medioambiental que ejerce una mayor influencia en el comportamiento de las diferentes Líneas de Tratamiento. Esta influencia se puede observar, de un modo orientativo, en las comparativas realizadas por tecnología y piso ecológico en el Capítulo 7 de la Guía.
            </p>
            <TablaCriterios
                lineas={lineasTabla4_2}
                subcriterios={d1}
                criteriosSeleccionados={criteriosSeleccionados}
                onSave={handleSaveCriterios}
            />
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                PLUVIOMETRÍA. Tiene su principal influencia en la alteración de los caudales y concentraciones de las aguas residuales a tratar, en el caso de redes de saneamiento unitarias, o de las de carácter separativo que presenten un elevado número de conexiones erradas. Esta influencia se puede observar, de un modo orientativo, en las comparativas realizadas por tecnología y piso ecológico en el Capítulo 7 de la Guía.
                De forma orientativa en el cuadro de la derecha se indican aspectos a considerar para la valoración.
            </p>

            <div className="flex mb-4">
                <div className="w-4/6 pr-2">
                    <TablaCriterios
                        lineas={lineasTabla4_2}
                        subcriterios={d2}
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
                                        Este factor influye notablemente en el comportamiento de los Lombrifiltros que operan sin cubierta, pues el agua de lluvia que cae sobre la superficie de estos incrementa la carga hidráulica aplicada y puede provocar el encharcamiento del sustrato filtrante, con la consecuente muerte de las lombrices.                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 px-4 text-gray-700 text-justify">
                                        El comportamiento de los Reactores Anaerobios de Flujo Ascendente (RAFA) es muy sensible a la elevada variabilidad de caudales de aguas residuales que puedan llegan a la PTAR, aconsejándose en estos casos  la implantación de tanques de laminación a la entrada de la planta de tratamiento.                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                ALTITUD. La influencia de la altitud sobre el comportamiento de las diferentes Líneas de Tratamiento aún no se conoce con exactitud, y tan sólo en el caso de las Aireaciones Extendidas se dispone de fórmulas para determinar la influencia de este parámetro a la hora de determinar la potencia necesaria de los equipos de aireación. En el caso concreto de esta tecnología, los consumos de energía eléctrica de los equipos de aireación se incrementan notablemente con la altitud del emplazamiento de la PTAR.
            </p>
            <TablaCriterios
                lineas={lineasTabla4_2}
                subcriterios={d3}
                criteriosSeleccionados={criteriosSeleccionados}
                onSave={handleSaveCriterios}
            />
        </div>

    )
}

export default CriterioD