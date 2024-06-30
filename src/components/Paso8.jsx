import React, { useEffect, useState } from 'react';

const Paso8 = () => {
    const [valoresCriterioA, setValoresCriterioA] = useState([]);
    const [valoresCriterioE, setValoresCriterioE] = useState([]);
    const [valoresCriterioG, setValoresCriterioG] = useState([]);
    const [valoresCriterioH, setValoresCriterioH] = useState([]);
    const [selectedLine, setSelectedLine] = useState('');

    useEffect(() => {
        setValoresCriterioA(JSON.parse(localStorage.getItem('valoresCriterioA')) || []);
        setValoresCriterioE(JSON.parse(localStorage.getItem('valoresCriterioE')) || []);
        setValoresCriterioG(JSON.parse(localStorage.getItem('valoresCriterioG')) || []);
        setValoresCriterioH(JSON.parse(localStorage.getItem('valoresCriterioH')) || []);

        const savedSelectedLine = localStorage.getItem('selectedLine');
        if (savedSelectedLine) {
            setSelectedLine(savedSelectedLine);
        }
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

    const linea1 = "Línea 6.3 (soporte áridos)";
    const linea2 = "Línea 7.3";

    const puntuacionTotalLinea1 = calcularPuntuacionTotal({
        ...valoresAgrupadosA[linea1],
        ...valoresAgrupadosE[linea1],
        ...valoresAgrupadosG[linea1],
        ...valoresAgrupadosH[linea1]
    });

    const puntuacionTotalLinea2 = calcularPuntuacionTotal({
        ...valoresAgrupadosA[linea2],
        ...valoresAgrupadosE[linea2],
        ...valoresAgrupadosG[linea2],
        ...valoresAgrupadosH[linea2]
    });

    const handleLineSelection = (linea) => {
        setSelectedLine(linea);
    };

    const saveSelection = () => {
        localStorage.setItem('selectedLine', selectedLine);
        localStorage.removeItem("LineaSeleccionadaFinal")
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
                            <th className="border border-gray-200 px-4 py-2">{linea1}</th>
                            <th className="border border-gray-200 px-4 py-2">{linea2}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-blue-400 text-white">
                            <td className="border border-gray-200 px-4 py-2">CRITERIOS DE SELECCIÓN</td>
                            <td className={`border border-gray-200 px-4 py-2 text-center`}>{linea1}</td>
                            <td className={`border border-gray-200 px-4 py-2 text-center`}>{linea2}</td>
                        </tr>
                        <tr className="bg-gray-300">
                            <td className="border border-gray-200 px-4 py-2">A. EFICACIA DE REMOCIÓN</td>
                            <td className={`border border-gray-200 px-4 py-2 text-center`}></td>
                            <td className={`border border-gray-200 px-4 py-2 text-center`}></td>
                        </tr>
                        {subcriteriosA.map(subcriterio => (
                            <tr key={subcriterio}>
                                <td className="border border-gray-200 px-4 py-2">{subcriterio}</td>
                                <td className={`border border-gray-200 px-4 py-2 text-center`}>{valoresAgrupadosA[linea1]?.[subcriterio] || 0}</td>
                                <td className={`border border-gray-200 px-4 py-2 text-center`}>{valoresAgrupadosA[linea2]?.[subcriterio] || 0}</td>
                            </tr>
                        ))}
                        <tr className="bg-gray-300">
                            <td className="border border-gray-200 px-4 py-2">E. IMPACTOS AMBIENTALES</td>
                            <td className={`border border-gray-200 px-4 py-2`}></td>
                            <td className={`border border-gray-200 px-4 py-2`}></td>
                        </tr>
                        {subcriteriosE.map(subcriterio => (
                            <tr key={subcriterio}>
                                <td className="border border-gray-200 px-4 py-2">{subcriterio}</td>
                                <td className={`border border-gray-200 px-4 py-2 text-center`}>{valoresAgrupadosE[linea1]?.[subcriterio] || 0}</td>
                                <td className={`border border-gray-200 px-4 py-2 text-center }`}>{valoresAgrupadosE[linea2]?.[subcriterio] || 0}</td>
                            </tr>
                        ))}
                        <tr className="bg-gray-300">
                            <td className="border border-gray-200 px-4 py-2">G. OPERACIÓN Y MANTENIMIENTO</td>
                            <td className={`border border-gray-200 px-4 py-2 `}></td>
                            <td className={`border border-gray-200 px-4 py-2 `}></td>
                        </tr>
                        {subcriteriosG.map(subcriterio => (
                            <tr key={subcriterio}>
                                <td className="border border-gray-200 px-4 py-2">{subcriterio}</td>
                                <td className={`border border-gray-200 px-4 py-2 text-center`}>{valoresAgrupadosG[linea1]?.[subcriterio] || 0}</td>
                                <td className={`border border-gray-200 px-4 py-2 text-center`}>{valoresAgrupadosG[linea2]?.[subcriterio] || 0}</td>
                            </tr>
                        ))}
                        <tr className="bg-gray-300">
                            <td className="border border-gray-200 px-4 py-2">H. COSTOS</td>
                            <td className={`border border-gray-200 px-4 py-2 `}></td>
                            <td className={`border border-gray-200 px-4 py-2 `}></td>
                        </tr>
                        {subcriteriosH.map(subcriterio => (
                            <tr key={subcriterio}>
                                <td className="border border-gray-200 px-4 py-2">{subcriterio}</td>
                                <td className={`border border-gray-200 px-4 py-2 text-center`}>{valoresAgrupadosH[linea1]?.[subcriterio] || 0}</td>
                                <td className={`border border-gray-200 px-4 py-2 text-center`}>{valoresAgrupadosH[linea2]?.[subcriterio] || 0}</td>
                            </tr>
                        ))}
                        <tr className="bg-blue-400 text-white">
                            <td className="border border-gray-200 px-4 py-2">PUNTUACIÓN TOTAL</td>
                            <td className={`border border-gray-200 px-4 py-2 text-center ${getRowClass(linea1)}`}>{puntuacionTotalLinea1}</td>
                            <td className={`border border-gray-200 px-4 py-2 text-center ${getRowClass(linea2)}`}>{puntuacionTotalLinea2}</td>
                        </tr>
                        <tr className="bg-blue-400 text-white">
                            <td className="border border-gray-200 px-4 py-2">LÍNEA DE TRATAMIENTO</td>
                            <td className={`border border-gray-200 px-4 py-2 text-center ${getRowClass(linea1)}`}>{linea1}</td>
                            <td className={`border border-gray-200 px-4 py-2 text-center ${getRowClass(linea2)}`}>{linea2}</td>
                        </tr>
                        <tr className="bg-blue-400 text-white">
                            <td className="border border-gray-200 px-4 py-2">SELECCIÓN</td>
                            <td className={`border border-gray-200 px-4 py-2 text-center ${getRowClass(linea1)}`}>
                                <input
                                    type="checkbox"
                                    checked={selectedLine === linea1}
                                    onChange={() => handleLineSelection(linea1)}
                                />
                            </td>
                            <td className={`border border-gray-200 px-4 py-2 text-center ${getRowClass(linea2)}`}>
                                <input
                                    type="checkbox"
                                    checked={selectedLine === linea2}
                                    onChange={() => handleLineSelection(linea2)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
  
                </div>
            </div>
        </div>
    );
};

export default Paso8;
