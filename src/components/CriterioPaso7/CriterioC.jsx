import React, { useEffect, useState } from 'react'
import TablaCriterios from '../TablaCriterios';

const c1 = "C.1. Aceptación por parte de la población";
const c2 = "C.2. Aceptación por parte de la entidad explotadora";


function CriterioC({ onSaveCriterios }) {
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
                    ACEPTACIÓN SOCIAL
                </h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                ACEPTACIÓN POR PARTE DE LA POBLACIÓN. La población donde se va a implantar la PTAR debe conocer el proyecto y las alternativas que se están planteando, con el fin de que esté informada y pueda sensibilizarse y concienciarse de la necesidad de dichas infraestructuras. Mediante proceso de participación pública la población debe tener la posibilidad de manifestar su opinión y sus intereses.
            </p>
            tabla val
            {/* Aqui va la tabla de valores */}
            <TablaCriterios
                lineas={lineasTabla4_2}
                subcriterios={c1}
                criteriosSeleccionados={criteriosSeleccionados}
                onSave={handleSaveCriterios}
            />
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                ACEPTACIÓN POR PARTE DE ENTIDAD QUE VA A GESTIONAR LA PTAR. También, es importante conocer y evaluar adecuadamente las opiniones de los responsables de la entidad que vaya a gestionar la PTAR, pudiendo estos llegar a manifestar su rechazo ante determinadas tecnologías.              
            </p>
            <TablaCriterios
                lineas={lineasTabla4_2}
                subcriterios={c2}
                criteriosSeleccionados={criteriosSeleccionados}
                onSave={handleSaveCriterios}
            />
        </div>

    )
}

export default CriterioC