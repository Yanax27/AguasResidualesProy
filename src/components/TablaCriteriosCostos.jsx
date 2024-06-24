import React, { useState, useEffect } from 'react';

function TablaCriteriosCostos({ lineas, subcriterios, criteriosSeleccionados, tipoCosto, onSave }) {
    const [dataCostos, setDataCostos] = useState([]);
    const [valoraciones, setValoraciones] = useState({});

    useEffect(() => {
        const storedDataCostos1 = localStorage.getItem('dataCostos1');
        const storedDataCostos2 = localStorage.getItem('dataCostos2');
        let parsedDataCostos = [];

        if (tipoCosto === 'Costo medio de construcción (Bs/hab)' && storedDataCostos1) {
            parsedDataCostos = JSON.parse(storedDataCostos1);
        } else if (storedDataCostos2) {
            parsedDataCostos = JSON.parse(storedDataCostos2);
        }

        if (parsedDataCostos.length > 0) {
            setDataCostos(parsedDataCostos);
            const valoracionesIniciales = {};
            parsedDataCostos.forEach(item => {
                valoracionesIniciales[item.linea] = getValoracionNumerica(item.valoracion);
            });
            setValoraciones(valoracionesIniciales);
        }
    }, [tipoCosto]);

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

    const getValoracionNumerica = (valoracion) => {
        switch (valoracion) {
            case 'Muy alta': return 5;
            case 'Alta': return 4;
            case 'Media': return 3;
            case 'Baja': return 2;
            case 'Muy baja': return 1;
            default: return 0;
        }
    };

    const recolectarDatos = () => {
        return lineas.map((linea, index) => {
            const peso = getPeso(subcriterios);
            const dataCostosItem = dataCostos.map(item => item.linea);
            const valoracion = dataCostosItem ? valoraciones[dataCostosItem[index]] : 0;
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
        console.log("imprimiendo onSave: ", datos)
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
                        const dataCostosItem = dataCostos.map(item => item.linea);
                        const valoracion = dataCostosItem ? valoraciones[dataCostosItem[index]] : 0;
                        const total = valoracion * peso;

                        return (
                            <tr key={index}>
                                <td className="border border-gray-200 px-4 py-2">{linea.linea_tratamiento}</td>
                                <td className="border border-gray-200 px-4 py-2"></td>
                                <td className="border border-gray-200 px-4 py-2 text-center bg-yellow-400">
                                    {valoracion}
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

export default TablaCriteriosCostos;

