import React, { useEffect, useState } from 'react';

const Paso8 = () => {
    const [valoresCriterioA, setValoresCriterioA] = useState([]);
    const [valoresCriterioB, setValoresCriterioB] = useState([]);
    const [valoresCriterioC, setValoresCriterioC] = useState([]);
    const [valoresCriterioD, setValoresCriterioD] = useState([]);
    const [valoresCriterioE, setValoresCriterioE] = useState([]);
    const [valoresCriterioF, setValoresCriterioF] = useState([]);
    const [valoresCriterioG, setValoresCriterioG] = useState([]);
    const [valoresCriterioH, setValoresCriterioH] = useState([]);
    const [selectedLine, setSelectedLine] = useState('');
    const [lineasTratamiento, setLineasTratamiento] = useState([]);
    const [criteriosSeleccionados, setCriteriosSeleccionados] = useState({});

    useEffect(() => {
        setValoresCriterioA(JSON.parse(localStorage.getItem('valoresCriterioA')) || []);
        setValoresCriterioB(JSON.parse(localStorage.getItem('valoresCriterioB')) || []);
        setValoresCriterioC(JSON.parse(localStorage.getItem('valoresCriterioC')) || []);
        setValoresCriterioD(JSON.parse(localStorage.getItem('valoresCriterioD')) || []);
        setValoresCriterioE(JSON.parse(localStorage.getItem('valoresCriterioE')) || []);
        setValoresCriterioF(JSON.parse(localStorage.getItem('valoresCriterioF')) || []);
        setValoresCriterioG(JSON.parse(localStorage.getItem('valoresCriterioG')) || []);
        setValoresCriterioH(JSON.parse(localStorage.getItem('valoresCriterioH')) || []);

        const savedSelectedLine = localStorage.getItem('selectedLine');
        if (savedSelectedLine) {
            setSelectedLine(savedSelectedLine);
        }

        const selectedRowsTabla = JSON.parse(localStorage.getItem('selectedRowsTabla4_2')) || [];
        setLineasTratamiento(selectedRowsTabla.map(row => row.linea_tratamiento));

        const criterios = JSON.parse(localStorage.getItem('criteriosSeleccionados')) || [];
        const criteriosMap = criterios.reduce((acc, criterio) => {
            acc[criterio.criterio] = criterio.seleccion;
            return acc;
        }, {});
        setCriteriosSeleccionados(criteriosMap);
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
    const valoresAgrupadosB = agruparPorLinea(valoresCriterioB);
    const valoresAgrupadosC = agruparPorLinea(valoresCriterioC);
    const valoresAgrupadosD = agruparPorLinea(valoresCriterioD);
    const valoresAgrupadosE = agruparPorLinea(valoresCriterioE);
    const valoresAgrupadosF = agruparPorLinea(valoresCriterioF);
    const valoresAgrupadosG = agruparPorLinea(valoresCriterioG);
    const valoresAgrupadosH = agruparPorLinea(valoresCriterioH);

    const subcriteriosA = ["A.1. Calidad exigida a los efluentes tratados", "A.2. Tipo de contaminación de las aguas residuales a tratar", "A.3. Tolerancia a las variaciones de caudal y carga"];
    const subcriteriosB = ["B.1. Superficie disponible", "B.2. Características constructivas de los terrenos"];
    const subcriteriosC = ["C.1. Aceptación por parte de la población", "C.2. Aceptación por parte de la entidad explotadora"];
    const subcriteriosD = ["D.1. Temperatura", "D.2. Pluviometría", "D.3. Altitud"]
    const subcriteriosE = ["E.1. Producción de malos olores", "E.2. Generación de gases de efecto invernadero", "E.3. Generación de ruidos", "E.4. Impacto visual"];
    const subcriteriosF = ["F.1. Cantidad de lodos generados"]
    const subcriteriosG = ["G.1. Requerimientos de personal cualificado", "G.2. Disponibilidad de repuestos y de servicio técnico"];
    const subcriteriosH = ["H.1. Costos de construcción", "H.2. Costos de operación y mantenimiento"];

    const calcularPuntuacionTotal = (valores) => {
        return Object.values(valores).reduce((acc, item) => acc + item, 0);
    };

    const puntuacionesTotales = lineasTratamiento.reduce((acc, linea) => {
        acc[linea] = calcularPuntuacionTotal({
            ...valoresAgrupadosA[linea],
            ...valoresAgrupadosB[linea],
            ...valoresAgrupadosC[linea],
            ...valoresAgrupadosD[linea],
            ...valoresAgrupadosE[linea],
            ...valoresAgrupadosF[linea],
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
            <div className="max-w-3xl mx-auto py-8 ">
                <table className="w-full table-auto border-collapse border border-gray-200 bg-white sm:rounded-lg">
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
                            <td className="border border-gray-200 px-4 py-2 font-semibold">CRITERIOS DE SELECCIÓN</td>
                            {lineasTratamiento.map(linea => (
                                <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}>{linea}</td>
                            ))}
                        </tr>
                        {criteriosSeleccionados["A. Eficacia de remoción"] && (
                            <>
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
                            </>
                        )}
                        {criteriosSeleccionados["B. Terrenos disponibles"] && (
                            <>
                                <tr className="bg-gray-300">
                                    <td className="border border-gray-200 px-4 py-2">B. TERRENOS DISPONIBLES</td>
                                    {lineasTratamiento.map(linea => (
                                        <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}></td>
                                    ))}
                                </tr>
                                {subcriteriosB.map(subcriterio => (
                                    <tr key={subcriterio}>
                                        <td className="border border-gray-200 px-4 py-2">{subcriterio}</td>
                                        {lineasTratamiento.map(linea => (
                                            <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}>{valoresAgrupadosB[linea]?.[subcriterio] || 0}</td>
                                        ))}
                                    </tr>
                                ))}
                            </>
                        )}
                        {criteriosSeleccionados["C. Aceptación social"] && (
                            <>
                                <tr className="bg-gray-300">
                                    <td className="border border-gray-200 px-4 py-2">C. ACEPTACIÓN SOCIAL</td>
                                    {lineasTratamiento.map(linea => (
                                        <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}></td>
                                    ))}
                                </tr>
                                {subcriteriosC.map(subcriterio => (
                                    <tr key={subcriterio}>
                                        <td className="border border-gray-200 px-4 py-2">{subcriterio}</td>
                                        {lineasTratamiento.map(linea => (
                                            <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}>{valoresAgrupadosC[linea]?.[subcriterio] || 0}</td>
                                        ))}
                                    </tr>
                                ))}
                            </>
                        )}
                        {criteriosSeleccionados["D. Características medioambientales"] && (
                            <>
                                <tr className="bg-gray-300">
                                    <td className="border border-gray-200 px-4 py-2">D. CARACTERISTICAS MEDIOAMBIENTALES</td>
                                    {lineasTratamiento.map(linea => (
                                        <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}></td>
                                    ))}
                                </tr>
                                {subcriteriosD.map(subcriterio => (
                                    <tr key={subcriterio}>
                                        <td className="border border-gray-200 px-4 py-2">{subcriterio}</td>
                                        {lineasTratamiento.map(linea => (
                                            <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}>{valoresAgrupadosD[linea]?.[subcriterio] || 0}</td>
                                        ))}
                                    </tr>
                                ))}
                            </>
                        )}
                        {criteriosSeleccionados["E. Impactos medioambientales"] && (
                            <>
                                <tr className="bg-gray-300">
                                    <td className="border border-gray-200 px-4 py-2">E. IMPACTO MEDIOAMBIENTALES</td>
                                    {lineasTratamiento.map(linea => (
                                        <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}></td>
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
                            </>
                        )}
                        {criteriosSeleccionados["F. Generación de lodos"] && (
                            <>
                                <tr className="bg-gray-300">
                                    <td className="border border-gray-200 px-4 py-2">F. GENERACIÓN DE LODOS</td>
                                    {lineasTratamiento.map(linea => (
                                        <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}></td>
                                    ))}
                                </tr>
                                {subcriteriosF.map(subcriterio => (
                                    <tr key={subcriterio}>
                                        <td className="border border-gray-200 px-4 py-2">{subcriterio}</td>
                                        {lineasTratamiento.map(linea => (
                                            <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}>{valoresAgrupadosF[linea]?.[subcriterio] || 0}</td>
                                        ))}
                                    </tr>
                                ))}
                            </>
                        )}
                        {criteriosSeleccionados["G. Operación y mantenimiento"] && (
                            <>
                                <tr className="bg-gray-300">
                                    <td className="border border-gray-200 px-4 py-2">G. OPERACION Y MANTENIMIENTO</td>
                                    {lineasTratamiento.map(linea => (
                                        <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}></td>
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
                            </>
                        )}
                        {criteriosSeleccionados["H. Costos de construcción y de operación y mantenimiento"] && (
                            <>
                                <tr className="bg-gray-300">
                                    <td className="border border-gray-200 px-4 py-2">H. COSTOS CONSTRUCCIÓN</td>
                                    {lineasTratamiento.map(linea => (
                                        <td key={linea} className={`border border-gray-200 px-4 py-2 text-center`}></td>
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
                            </>
                        )}                     
                    </tbody>
                    <tfoot>
                    <tr className="bg-blue-400 text-white font-semibold">
                            <td className="border border-gray-200 px-4 py-2">PUNTUACIÓN TOTAL</td>
                            {lineasTratamiento.map(linea => (
                                <td key={linea}  className={`border border-gray-200 px-4 py-2 text-center ${getRowClass(linea)}`}>
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
                    </tfoot>
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
