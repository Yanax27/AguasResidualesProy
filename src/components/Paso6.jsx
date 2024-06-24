import React, { useState, useEffect } from 'react';

function Paso6() {
    // Obtener los criterios seleccionados desde localStorage
    const criteriosSeleccionados = JSON.parse(localStorage.getItem('criteriosSeleccionados')) || [];

    // Filtrar los criterios seleccionados
    const criteriosFiltrados = criteriosSeleccionados.filter(criterio => criterio.seleccion);

    // Inicializar los pesos desde criteriosSeleccionados
    const initialPesos = {};
    criteriosFiltrados.forEach((criterio, criterioIndex) => {
        criterio.subcriterios.forEach((subcriterio, subIndex) => {
            initialPesos[`${criterioIndex}-${subIndex}`] = subcriterio.peso || '';
        });
    });

    // Estado para almacenar los pesos de los subcriterios
    const [pesos, setPesos] = useState(initialPesos);

    // Manejar cambios en los inputs de los pesos
    const handlePesoChange = (criterioIndex, subIndex, value) => {
        if (value >= 1 && value <= 4) {
            setPesos({
                ...pesos,
                [`${criterioIndex}-${subIndex}`]: value
            });
        }
    };

    // Manejar el guardado de los valores
    const handleGuardar = () => {
        // Verificar que todos los pesos estén dentro del rango permitido
        const allValid = Object.values(pesos).every(peso => peso >= 1 && peso <= 4);

        if (allValid) {
            // Actualizar criteriosSeleccionados con los pesos asignados
            const criteriosConPesos = criteriosFiltrados.map((criterio, criterioIndex) => ({
                ...criterio,
                subcriterios: criterio.subcriterios.map((subcriterio, subIndex) => ({
                    nombre: subcriterio,  // Mantener el nombre original del subcriterio
                    peso: pesos[`${criterioIndex}-${subIndex}`] || null
                }))
            }));

            // Guardar los criterios con pesos en el localStorage
            localStorage.setItem('criterioS', JSON.stringify(criteriosConPesos));
            alert('Pesos guardados correctamente');
        } else {
            alert('Todos los pesos deben estar entre 1 y 4');
        }
    };

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg mb-10">
            <span className="flex items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-6">4.6. Costos de construcción y de operación y mantenimiento</h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                Cada criterio de selección se debe ponderar con un peso, que dependiendo de la importancia relativa que tenga en relación con los demás, será mayor o menor.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-1">
                La ponderación se realiza asignando un peso a cada criterio, considerando una clasificación de importancia de acuerdo a los siguientes niveles:
            </p>
            <div className="max-w-xs mx-auto">
                <div className="overflow-x-auto shadow-md sm:rounded-lg mb-1">
                    <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
                        <thead className="bg-blue-400 text-white">
                            <tr>
                                <th className="border border-gray-200 px-4 py-2">Nivel</th>
                                <th className="border border-gray-200 px-4 py-2">Peso</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-200 px-4 py-2">Muy importante</td>
                                <td className="border border-gray-200 px-4 py-2">4</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-200 px-4 py-2">Importante</td>
                                <td className="border border-gray-200 px-4 py-2">3</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-200 px-4 py-2">Media importancia</td>
                                <td className="border border-gray-200 px-4 py-2">2</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-200 px-4 py-2">Poco importante</td>
                                <td className="border border-gray-200 px-4 py-2">1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="max-w-3xl mx-auto py-8">
                <div className="overflow-x-auto shadow-md sm:rounded-lg mb-1">
                    <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
                        <thead className="bg-blue-400 text-white">
                            <tr>
                                <th className="border border-gray-200 px-4 py-2">Descripción y Criterio de Selección</th>
                                <th className="border border-gray-200 px-4 py-2">Peso</th>
                            </tr>
                        </thead>
                        <tbody>
                            {criteriosFiltrados.map((criterio, criterioIndex) => (
                                <React.Fragment key={criterioIndex}>
                                    <tr>
                                        <td className="border border-gray-200 px-4 py-2 bg-blue-400 text-white">{criterio.criterio}</td>
                                        <td className="border border-gray-200 px-4 py-2 bg-blue-400 text-white"></td>
                                    </tr>
                                    {criterio.subcriterios && criterio.subcriterios.map((subcriterio, subIndex) => (
                                        <tr key={subIndex}>
                                            <td className="border border-gray-200 px-4 py-2">{subcriterio}</td>
                                            <td className="border border-gray-200 px-4 py-2 text-center bg-yellow-400">
                                                <input
                                                    type="number"
                                                    value={pesos[`${criterioIndex}-${subIndex}`] || ''}
                                                    onChange={(e) => handlePesoChange(criterioIndex, subIndex, Number(e.target.value))}
                                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
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
}

export default Paso6;
