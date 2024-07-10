import React, { useState } from 'react';
import CriterioA from './CriterioPaso7/CriterioA';
import CriterioE from './CriterioPaso7/CriterioE';
import CriterioG from './CriterioPaso7/CriterioG';
import CriterioH from './CriterioPaso7/CriterioH';


const Paso7 = () => {
    const [valoresCriterioA, setValoresCriterioA] = useState([]);
    const [valoresCriterioE, setValoresCriterioE] = useState([]);
    const [valoresCriterioG, setValoresCriterioG] = useState([]);
    const [valoresCriterioH, setValoresCriterioH] = useState([]);

    const handleSaveCriterios = (nuevosDatos, criterio) => {
        if (Array.isArray(nuevosDatos)) {
            if (criterio === 'A') {
                setValoresCriterioA((prevDatos) => {
                    const filteredDatos = prevDatos.filter(data => data.subcriterio !== nuevosDatos[0].subcriterio);
                    return [...filteredDatos, ...nuevosDatos];
                });
            } else if (criterio === 'E') {
                setValoresCriterioE((prevDatos) => {
                    const filteredDatos = prevDatos.filter(data => data.subcriterio !== nuevosDatos[0].subcriterio);
                    return [...filteredDatos, ...nuevosDatos];
                });
            } else if (criterio === 'G') {
                setValoresCriterioG((prevDatos) => {
                    const filteredDatos = prevDatos.filter(data => data.subcriterio !== nuevosDatos[0].subcriterio);
                    return [...filteredDatos, ...nuevosDatos];
                });
            } else if (criterio === 'H') {
                setValoresCriterioH((prevDatos) => {
                    const filteredDatos = prevDatos.filter(data => data.subcriterio !== nuevosDatos[0].subcriterio);
                    return [...filteredDatos, ...nuevosDatos];
                });
            } else {
                console.error('Error: criterio no válido', criterio);
            }
        } else {
            console.error('Error: nuevosDatos no es un array', nuevosDatos);
        }
    };

    const handleGuardar = () => {
        localStorage.setItem('valoresCriterioA', JSON.stringify(valoresCriterioA));
        localStorage.setItem('valoresCriterioE', JSON.stringify(valoresCriterioE));
        localStorage.setItem('valoresCriterioG', JSON.stringify(valoresCriterioG));
        localStorage.setItem('valoresCriterioH', JSON.stringify(valoresCriterioH));
        alert('Valores guardados exitosamente');
    };

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg mb-10">
            <span className="flex items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-6">
                    7. Valoración de Cada Alternativa Respecto Cada Criterio de Selección
                </h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                Cada criterio de selección se debe ponderar con un peso, que dependiendo de la importancia relativa que tenga en relación con los demás, será mayor o menor. Esta valoración se realiza de forma cuantitativa, estableciendo una escala arbitraria, de 1 a 5, donde:
            </p>
            <ul className="text-gray-600 dark:text-gray-300 mb-4">
                <li>• 5 mayor valoración</li>
                <li>• 1 menor valoración</li>
            </ul>
            <CriterioA onSaveCriterios={(datos) => handleSaveCriterios(datos, 'A')} />
            <CriterioE onSaveCriterios={(datos) => handleSaveCriterios(datos, 'E')} />
            <CriterioG onSaveCriterios={(datos) => handleSaveCriterios(datos, 'G')} />
            <CriterioH onSaveCriterios={(datos) => handleSaveCriterios(datos, 'H')} />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleGuardar}
            >
                Guardar
            </button>
        </div>

    );
};

export default Paso7;