import React, { useState, useEffect } from 'react';
import CriterioA from './CriterioPaso7/CriterioA';
import CriterioB from './CriterioPaso7/CriterioB';
import CriterioC from './CriterioPaso7/CriterioC';
import CriterioD from './CriterioPaso7/CriterioD';
import CriterioE from './CriterioPaso7/CriterioE';
import CriterioF from './CriterioPaso7/CriterioF';
import CriterioG from './CriterioPaso7/CriterioG';
import CriterioH from './CriterioPaso7/CriterioH';

const Paso7 = () => {
    const [valoresCriterioA, setValoresCriterioA] = useState([]);
    const [valoresCriterioB, setValoresCriterioB] = useState([]);
    const [valoresCriterioC, setValoresCriterioC] = useState([]);
    const [valoresCriterioD, setValoresCriterioD] = useState([]);
    const [valoresCriterioE, setValoresCriterioE] = useState([]);
    const [valoresCriterioF, setValoresCriterioF] = useState([]);
    const [valoresCriterioG, setValoresCriterioG] = useState([]);
    const [valoresCriterioH, setValoresCriterioH] = useState([]);

    const [criteriosSeleccionados, setCriteriosSeleccionados] = useState([]);

    useEffect(() => {
        const criteriosGuardados = JSON.parse(localStorage.getItem('criteriosSeleccionados')) || [];
        setCriteriosSeleccionados(criteriosGuardados);
    }, []);

    const handleSaveCriterios = (nuevosDatos, criterio) => {
        if (Array.isArray(nuevosDatos)) {
            if (criterio === 'A') {
                setValoresCriterioA((prevDatos) => {
                    const filteredDatos = prevDatos.filter(data => data.subcriterio !== nuevosDatos[0].subcriterio);
                    return [...filteredDatos, ...nuevosDatos];
                });
            } else if (criterio === 'B') {
                setValoresCriterioB((prevDatos) => {
                    const filteredDatos = prevDatos.filter(data => data.subcriterio !== nuevosDatos[0].subcriterio);
                    return [...filteredDatos, ...nuevosDatos];
                });
            } else if (criterio === 'C') {
                setValoresCriterioC((prevDatos) => {
                    const filteredDatos = prevDatos.filter(data => data.subcriterio !== nuevosDatos[0].subcriterio);
                    return [...filteredDatos, ...nuevosDatos];
                });
            } else if (criterio === 'D') {
                setValoresCriterioD((prevDatos) => {
                    const filteredDatos = prevDatos.filter(data => data.subcriterio !== nuevosDatos[0].subcriterio);
                    return [...filteredDatos, ...nuevosDatos];
                });
            } else if (criterio === 'E') {
                setValoresCriterioE((prevDatos) => {
                    const filteredDatos = prevDatos.filter(data => data.subcriterio !== nuevosDatos[0].subcriterio);
                    return [...filteredDatos, ...nuevosDatos];
                });
            } else if (criterio === 'F') {
                setValoresCriterioF((prevDatos) => {
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
        localStorage.setItem('valoresCriterioB', JSON.stringify(valoresCriterioB));
        localStorage.setItem('valoresCriterioC', JSON.stringify(valoresCriterioC));
        localStorage.setItem('valoresCriterioD', JSON.stringify(valoresCriterioD));
        localStorage.setItem('valoresCriterioE', JSON.stringify(valoresCriterioE));
        localStorage.setItem('valoresCriterioF', JSON.stringify(valoresCriterioF));
        localStorage.setItem('valoresCriterioG', JSON.stringify(valoresCriterioG));
        localStorage.setItem('valoresCriterioH', JSON.stringify(valoresCriterioH));
        alert('Valores guardados exitosamente');
    };

    const criterioSeleccionado = (criterio) => {
        return criteriosSeleccionados.some(c => c.criterio.includes(criterio));
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
            {criterioSeleccionado('A') && <CriterioA onSaveCriterios={(datos) => handleSaveCriterios(datos, 'A')} />}
            {criterioSeleccionado('B') && <CriterioB onSaveCriterios={(datos) => handleSaveCriterios(datos, 'B')} />}
            {criterioSeleccionado('C') && <CriterioC onSaveCriterios={(datos) => handleSaveCriterios(datos, 'C')} />}
            {criterioSeleccionado('D') && <CriterioD onSaveCriterios={(datos) => handleSaveCriterios(datos, 'D')} />}
            {criterioSeleccionado('E') && <CriterioE onSaveCriterios={(datos) => handleSaveCriterios(datos, 'E')} />}
            {criterioSeleccionado('F') && <CriterioF onSaveCriterios={(datos) => handleSaveCriterios(datos, 'F')} />}
            {criterioSeleccionado('G') && <CriterioG onSaveCriterios={(datos) => handleSaveCriterios(datos, 'G')} />}
            {criterioSeleccionado('H') && <CriterioH onSaveCriterios={(datos) => handleSaveCriterios(datos, 'H')} />}
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleGuardar}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Guardar
                </button>
            </div>
        </div>
    );
};

export default Paso7;
