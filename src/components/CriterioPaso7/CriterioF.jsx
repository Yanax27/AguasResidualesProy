import React, { useEffect, useState } from 'react'
import TablaCriterios from '../TablaCriterios';

const f1 = "F.1. Cantidad de lodos generados";



function CriterioF({ onSaveCriterios }) {
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
                    GENERACIÓN DE LODOS
                </h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                CANTIDAD DE LODOS GENERADOS. Se debe valorar cada alternativa en comparación con las demás, en relación a la cantidad de lodos generados y su grado de estabilidad. Como apoyo a la valoración puede considerar la Generación de Lodos anual de las Líneas de Tratamiento seleccionadas indicados en el cuadro de la derecha, recuerde:
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-4">
                A mayor generación le corresponde menor valoración
            </p>
            <TablaCriterios
                lineas={lineasTabla4_2}
                subcriterios={f1}
                criteriosSeleccionados={criteriosSeleccionados}
                onSave={handleSaveCriterios}
            />
        </div>

    )
}

export default CriterioF