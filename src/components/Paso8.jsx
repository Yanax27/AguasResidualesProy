import React, { useEffect, useState } from 'react';

const Paso8 = () => {
    const [valoresCriterioA, setValoresCriterioA] = useState([]);
    const [valoresCriterioE, setValoresCriterioE] = useState([]);
    const [valoresCriterioG, setValoresCriterioG] = useState([]);
    const [valoresCriterioH, setValoresCriterioH] = useState([]);
    const [selectedLine, setSelectedLine] = useState('');
    const [lineasTratamiento, setLineasTratamiento] = useState([]);

    useEffect(() => {
        setValoresCriterioA(JSON.parse(localStorage.getItem('valoresCriterioA')) || []);
        setValoresCriterioE(JSON.parse(localStorage.getItem('valoresCriterioE')) || []);
        setValoresCriterioG(JSON.parse(localStorage.getItem('valoresCriterioG')) || []);
        setValoresCriterioH(JSON.parse(localStorage.getItem('valoresCriterioH')) || []);

        const savedSelectedLine = localStorage.getItem('selectedLine');
        if (savedSelectedLine) {
            setSelectedLine(savedSelectedLine);
        }

        const selectedRowsTabla = JSON.parse(localStorage.getItem('selectedRowsTabla4_2')) || [];
        setLineasTratamiento(selectedRowsTabla.map(row => row.linea_tratamiento));
    }, []);

    const agruparPorLinea = (valores) => {
        return valores.reduce((acc, item) => {
            const { linea, subcriterio, total } = item;
            if (!acc[linea]) {
                acc[linea] = {};
            }
            acc[linea][subcriterio] = total;
            return acc;
        }, {});
    };

    const valoresAgrupadosA = agruparPorLinea(valoresCriterioA);
    const valoresAgrupadosE = agruparPorLinea(valoresCriterioE);
    const valoresAgrupadosG = agruparPorLinea(valoresCriterioG);
    const valoresAgrupadosH = agruparPorLinea(valoresCriterioH);

    const subcriteriosA = ["A.1. Calidad exigida a los efluentes tratados", "A.2. Tipo de contaminación de las aguas residuales a tratar", "A.3. Tolerancia a las variaciones de caudal y carga"];
    const subcriteriosE = ["E.1. Producción de malos olores", "E.2. Generación de gases de efecto invernadero", "E.3. Generación de ruidos", "E.4. Impacto visual"];
    const subcriteriosG = ["G.1. Requerimientos de personal cualificado", "G.2. Disponibilidad de repuestos y de servicio técnico"];
    const subcriteriosH = ["H.1. Costos de construcción", "H.2. Costos de operación y mantenimiento"];

    const calcularPuntuacionTotal = (valores) => {
        return Object.values(valores).reduce((acc, item) => acc + item, 0);
    };

    const puntuacionesTotales = lineasTratamiento.reduce((acc, linea) => {
        acc[linea] = calcularPuntuacionTotal({
            ...valoresAgrupadosA[linea],
            ...valoresAgrupadosE[linea],
            ...valoresAgrupadosG[linea],
            ...valoresAgrupadosH[linea]
        });
        return acc;
    }, {});

    const handleLineSelection = (event, linea) => {
        setSelectedLine(event.target.checked ? linea : '');
    };

    const saveSelection = () => {
        localStorage.setItem('selectedLine', selectedLine);
        localStorage.removeItem("LineaSeleccionadaFinal");
        alert('Selección guardada: ' + selectedLine);
    };

    const getRowClass = (linea) => {
        return selectedLine === linea ? 'bg-green-300 text-black' : '';
    };

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg mb-10">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                8. MATRIZ DE DECISIÓN
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-4">
                Finalmente, se suman todas las valoraciones dadas a cada alternativa, ponderando cada factor del sumatorio por su peso correspondiente, lo que permite comparar las diferentes Líneas de Tratamiento. La ponderación se presenta en forma de matriz a continuación:
            </p>
            <div className="max-w-3xl mx-auto py-8">
                <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
                    <thead className="bg-blue-400 text-white">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2">MATRIZ DE DECISIÓN</th>
                            {lineasTratamiento.map(linea => (
                                <th key={linea} className="border border-gray-200 px-4 py-2">{linea}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-blue-400 text-white">
                            <td className="border border-gray-200 px-4 py-2">CRITERIOS DE SELECCIÓN</td>
                            {lineasTratamiento.map(linea => (
                                <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}>{linea}</td>
                            ))}
                        </tr>
                        <tr className="bg-gray-300">
                            <td className="border border-gray-200 px-4 py-2">A. EFICACIA DE REMOCIÓN</td>
                            {lineasTratamiento.map(linea => (
                                <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}></td>
                            ))}
                        </tr>
                        {subcriteriosA.map(subcriterio => (
                            <tr key={subcriterio}>
                                <td className="border border-gray-200 px-4 py-2">{subcriterio}</td>
                                {lineasTratamiento.map(linea => (
                                    <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}>{valoresAgrupadosA[linea]?.[subcriterio] || 0}</td>
                                ))}
                            </tr>
                        ))}
                        <tr className="bg-gray-300">
                            <td className="border border-gray-200 px-4 py-2">E. IMPACTOS AMBIENTALES</td>
                            {lineasTratamiento.map(linea => (
                                <td key={linea} className={`border border-gray-200 px-4 py-2`}></td>
                            ))}
                        </tr>
                        {subcriteriosE.map(subcriterio => (
                            <tr key={subcriterio}>
                                <td className="border border-gray-200 px-4 py-2">{subcriterio}</td>
                                {lineasTratamiento.map(linea => (
                                    <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}>{valoresAgrupadosE[linea]?.[subcriterio] || 0}</td>
                                ))}
                            </tr>
                        ))}
                        <tr className="bg-gray-300">
                            <td className="border border-gray-200 px-4 py-2">G. OPERACIÓN Y MANTENIMIENTO</td>
                            {lineasTratamiento.map(linea => (
                                <td key={linea} className={`border border-gray-200 px-4 py-2`}></td>
                            ))}
                        </tr>
                        {subcriteriosG.map(subcriterio => (
                            <tr key={subcriterio}>
                                <td className="border border-gray-200 px-4 py-2">{subcriterio}</td>
                                {lineasTratamiento.map(linea => (
                                    <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}>{valoresAgrupadosG[linea]?.[subcriterio] || 0}</td>
                                ))}
                            </tr>
                        ))}
                        <tr className="bg-gray-300">
                            <td className="border border-gray-200 px-4 py-2">H. COSTOS</td>
                            {lineasTratamiento.map(linea => (
                                <td key={linea} className={`border border-gray-200 px-4 py-2`}></td>
                            ))}
                        </tr>
                        {subcriteriosH.map(subcriterio => (
                            <tr key={subcriterio}>
                                <td className="border border-gray-200 px-4 py-2">{subcriterio}</td>
                                {lineasTratamiento.map(linea => (
                                    <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}>{valoresAgrupadosH[linea]?.[subcriterio] || 0}</td>
                                ))}
                            </tr>
                        ))}
                        <tr className="bg-blue-400 text-white font-semibold">
                            <td className="border border-gray-200 px-4 py-2">PUNTUACIÓN TOTAL</td>
                            {lineasTratamiento.map(linea => (
                                <td key={linea} className={`border border-gray-200 px-4 py-2 text-center ${getRowClass(linea)}`}>
                                    {puntuacionesTotales[linea] || 0}
                                </td>
                            ))}
                        </tr>
                        <tr className="bg-blue-400 text-white font-semibold">
                            <td className="border border-gray-200 px-4 py-2">SELECCIONAR LÍNEA</td>
                            {lineasTratamiento.map(linea => (
                                <td key={linea} className={`border border-gray-200 px-4 py-2 text-center ${getRowClass(linea)}`}>
                                    <input
                                        type="checkbox"
                                        checked={selectedLine === linea}
                                        onChange={(event) => handleLineSelection(event, linea)}
                                        className="ml-2"
                                    />
                                    {" "+linea}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                    <button onClick={saveSelection} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Guardar Selección
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Paso8;
