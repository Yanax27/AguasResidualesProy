import React, { useState, useEffect } from 'react';

function TablaCriterios({ lineas, subcriterios, criteriosSeleccionados, onSave }) {
    const [valoraciones, setValoraciones] = useState({});

    const handleValoracionChange = (index, value) => {
        if (value >= 1 && value <= 5) {
            setValoraciones({
                ...valoraciones,
                [index]: value
            });
        }
    };

    const getPeso = (subcriterio) => {
        for (let criterio of criteriosSeleccionados) {
            for (let sub of criterio.subcriterios) {
                if (sub.nombre === subcriterio) {
                    return sub.peso;
                }
            }
        }
        return 0;
    };

    const recolectarDatos = () => {
        return lineas.map((linea, index) => {
            const peso = getPeso(subcriterios);
            const valoracion = valoraciones[index] || 0;
            const total = valoracion * peso;
            return {
                linea: linea.linea_tratamiento,
                valoracion,
                peso,
                total,
                subcriterio: subcriterios
            };
        });
    };

    useEffect(() => {
        const datos = recolectarDatos();
        onSave(datos);
        //console.log("imprimiendo onSave: ", onSave)
    }, [valoraciones]);

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
                <thead className="bg-blue-400 text-white">
                    <tr>
                        <th className="border border-gray-200 px-4 py-2">Alternativa</th>
                        <th className="border border-gray-200 px-4 py-2">Resumen</th>
                        <th className="border border-gray-200 px-4 py-2">Valoración</th>
                        <th className="border border-gray-200 px-4 py-2">Ponderación</th>
                        <th className="border border-gray-200 px-4 py-2">Total (V*P)</th>
                    </tr>
                </thead>
                <tbody>
                    {lineas.map((linea, index) => {
                        const peso = getPeso(subcriterios);
                        const valoracion = valoraciones[index] || 0;
                        const total = valoracion * peso;

                        return (
                            <tr key={index}>
                                <td className="border border-gray-200 px-4 py-2">{linea.linea_tratamiento}</td>
                                <td className="border border-gray-200 px-4 py-2"></td>
                                <td className="border border-gray-200 px-4 py-2 text-center bg-yellow-400">
                                    <input
                                        type="number"
                                        value={valoraciones[index] || ''}
                                        onChange={(e) => handleValoracionChange(index, Number(e.target.value))}
                                        className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                                    />
                                </td>
                                <td className="border border-gray-200 px-4 py-2 text-center">{peso}</td>
                                <td className="border border-gray-200 px-4 py-2 text-center">{total}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TablaCriterios;
