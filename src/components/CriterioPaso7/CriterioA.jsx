import React, { useEffect, useState } from 'react';
import TablaCriterios from '../TablaCriterios';

const tipoAguaResidual = [
    {
        tipo: "Contaminación fuerte (500-700 mg/L de DBO5)",
        muyAdecuada: "Línea 8.1 / Línea 8.2 / Línea 2 / Línea 6.3 / Línea 7.3",
        adecuada: "Línea 4.2 / Línea 5 / Línea 1 / Línea 6.1 / Línea 6.2 / Línea 7.1 / Línea 7.2",
        menosAdecuada: "Línea 3 / Línea 4.1",
    },
    {
        tipo: "Contaminación media (300-500 mg/L de DBO5)",
        muyAdecuada: "Todos las Líneas de Tratamiento son adecuadas",
        adecuada: "",
        menosAdecuada: "",
    },
    {
        tipo: "Contaminación débil (< 150 mg/L de DBO5)",
        muyAdecuada: "Línea 3 / Línea 4.1 / Línea 4.2 / Línea 5 / Línea 6.1 / Línea 6.2 / Línea 7.1 / Línea 7.2",
        adecuada: "Línea 1",
        menosAdecuada: "Línea 8.1 / Línea 8.2 / Línea 2 / Línea 6.3 / Línea 7.3",
    },
];

const a1 = "A.1. Calidad exigida a los efluentes tratados";
const a2 = "A.2. Tipo de contaminación de las aguas residuales a tratar";
const a3 = "A.3. Tolerancia a las variaciones de caudal y carga";

function CriterioA({ onSaveCriterios }) {
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
            <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-2">
                EFICIENCIA DE REMOCIÓN
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                CALIDAD EXIGIDA A LOS EFLUENTES TRATADOS. Se debe valorar cada alternativa en comparación con las demás, en relación a la calidad exigida del efluente. Como apoyo a la valoración puede considerar los rendimientos indicados en el cuadro de la derecha, recuerde:
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-4">
                A mayor rendimiento le corresponde mayor valoración.
            </p>
            <TablaCriterios
                lineas={lineasTabla4_2}
                subcriterios={a1}
                criteriosSeleccionados={criteriosSeleccionados}
                onSave={handleSaveCriterios}
            />
            <span className="flex items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-6">
                    TIPO DE CONTAMINACION DE LAS AGUAS A TRATAR
                </h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                Se debe valorar cada alternativa en comparación con las demás, en relación a su desempeño con el tipo de agua residual a tratar. Como apoyo a la valoración puede considerar el comportamiento de las Líneas de Tratamiento seleccionadas en función al nivel de concentración de las aguas residuales a tratar, indicados en la tabla de la derecha, recuerde: A mejor desempeño le corresponde mayor valoración.
            </p>
            <div className="flex mb-4">
                <div className="w-3/4 pr-2">
                    <TablaCriterios
                        lineas={lineasTabla4_2}
                        subcriterios={a2}
                        criteriosSeleccionados={criteriosSeleccionados}
                        onSave={handleSaveCriterios}
                    />
                </div>
                <div className="w-1/4 pl-2">
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
                            <thead className="bg-blue-400 text-white">
                                <tr>
                                    <th className="border border-gray-200 px-4 py-2">Tipo de Agua Residual</th>
                                    <th className="border border-gray-200 px-4 py-2">Línea de Tratamiento</th>
                                    <th className="border border-gray-200 px-4 py-2">Muy Adecuada</th>
                                    <th className="border border-gray-200 px-4 py-2">Adecuada</th>
                                    <th className="border border-gray-200 px-4 py-2">Menos adecuada</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tipoAguaResidual.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-200 px-4 py-2">{item.tipo}</td>
                                        <td className="border border-gray-200 px-4 py-2">{item.alternativa}</td>
                                        <td className="border border-gray-200 px-4 py-2">{item.muyAdecuada}</td>
                                        <td className="border border-gray-200 px-4 py-2">{item.adecuada}</td>
                                        <td className="border border-gray-200 px-4 py-2">{item.menosAdecuada}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <span className="flex items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-6">
                TOLERANCIA A LAS VARIACIONES DE CAUDAL Y CARGA.
                </h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
            Se debe valorar cada alternativa en comparación con las demás, en relación su tolerancia a las variaciones de caudal y de carga contaminante. Como apoyo a la valoración puede considerar la tolerancia indicados en el cuadro de la derecha, recuerde: A mejor tolerancia le corresponde mayor valoración            
            </p>      
            <TablaCriterios
                lineas={lineasTabla4_2}
                subcriterios={a3}
                criteriosSeleccionados={criteriosSeleccionados}
                onSave={handleSaveCriterios}
            />
        </div>
    );
}

export default CriterioA;