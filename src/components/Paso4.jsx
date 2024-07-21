import React, { useEffect, useState } from 'react';
import DataEficienciaRemocion from '../data/DataEficienciaRemocion.json';
import Tabla4_1 from './Tabla4_1';
import Tabla4_2 from './Tabla4_2';
import Tabla4_5 from './Tabla4_5';
import Tabla4_4 from './Tabla4_4';
import Tabla4_3 from './Tabla4_3';
import Tabla4_6 from './Tabla4_6';


// Paso4 component
function Paso4() {
    //const [selectedLines, setSelectedLines] = useState([]);
    //const [eficienciaRemocion, setEficienciaRemocion] = useState([]);
    const [area_terreno, setArea_terreno] = useState(() => localStorage.getItem('area_terreno') || '');
    // const [checkedRows, setCheckedRows] = useState({});
    const [selectedRowsTabla4_1, setSelectedRowsTabla4_1] = useState([]);
    const [selectedRowsTabla4_2, setSelectedRowsTabla4_2] = useState([]);
    const [selectedRowsTabla4_3, setSelectedRowsTabla4_3] = useState([]);
    const [selectedRowsTabla4_4, setSelectedRowsTabla4_4] = useState([]);
    const [selectedRowsTabla4_5, setSelectedRowsTabla4_5] = useState([]);
    const [selectedRowsTabla4_6, setSelectedRowsTabla4_6] = useState([]);
    //declaramos valores constantes para trabajar los rendimientos
    const ss = 60.0;
    const dbo5Constant = 80.0;
    const dqoConstant = 250.0;
    const coliformes0 = 1000;
    
    //constantes para anexo 1
    const ss1 = 100;
    const dbo1 = 30;
    const dqo1 = 60;
    const nt1 = 12;
    const pt1 = 1;
    const coliformes1 = 5000;

    //cargamos los valores de guardadso en el paso2 de ss, dbo5 y dqo para calcular los redimientos
    const [solidosSuspension, setSolidosSuspension] = useState(() => localStorage.getItem('solidosSuspension') || '');
    const [dbo5, setDbo5] = useState(() => localStorage.getItem('dbo5') || '');
    const [dqo, setDqo] = useState(() => localStorage.getItem('dqo') || '');
    const [nt, setNt] = useState(()=> localStorage.getItem('nt')|| '');
    const [pt, setPt] = useState(()=> localStorage.getItem('pt') || '');
    const [coliformes, setColiformes] = useState(()=> localStorage.getItem('coliformesTotales') || '');

    // Cálculos de porcentajes de reducción
    const calcularPorcentajeReduccion = (valorInicial, valorConstante) => {
        return ((valorInicial - valorConstante) / valorInicial) * 100;
    };

    const dbo5Porcentaje = dbo5 ? calcularPorcentajeReduccion(dbo5, dbo5Constant).toFixed(2) : 0;
    const ssPorcentaje = solidosSuspension ? calcularPorcentajeReduccion(solidosSuspension, ss).toFixed(2) : 0;
    const dqoPorcentaje = dqo ? calcularPorcentajeReduccion(dqo, dqoConstant).toFixed(2) : 0;
    const ptPorcentaje = pt ? calcularPorcentajeReduccion(pt, pt1).toFixed(2) : 0;
    const ntPorcentaje = nt ? calcularPorcentajeReduccion(nt, nt1).toFixed(2) : 0;
    const coliformesPorcentaje = coliformes ? calcularPorcentajeReduccion(coliformes, coliformes1).toFixed(2) : 0;
    const dbo1Porcentaje = dbo5 ? calcularPorcentajeReduccion(dbo5, dbo1).toFixed(2) : 0;
    const ss1Porcentaje = solidosSuspension ? calcularPorcentajeReduccion(solidosSuspension, ss1).toFixed(2) : 0;
    const dqo1Porcentaje = dqo ? calcularPorcentajeReduccion(dqo, dqo1).toFixed(2) : 0;
    const coliformesPorcentaj0 = coliformes ? calcularPorcentajeReduccion(coliformes, coliformes0).toFixed(2) : 0;

    useEffect(() => {

        // Cargar datos del localStorage al montar el componente
        const storedSelectedRows3 = JSON.parse(localStorage.getItem('selectedRowsTabla4_3')) || [];

        const storedSelectedRows2 = JSON.parse(localStorage.getItem('selectedRowsTabla4_2')) || [];
        setSelectedRowsTabla4_3(storedSelectedRows3);
        setSelectedRowsTabla4_2(storedSelectedRows2);
    }, []);

    //guarda los datos de las tablas en el local storage
    const handleSaveSelectedRows = () => {

        localStorage.setItem('selectedRowsTabla4_1', JSON.stringify(selectedRowsTabla4_1));
        localStorage.setItem('selectedRowsTabla4_2', JSON.stringify(selectedRowsTabla4_2));

        // Guardar en el localStorage al hacer clic en el botón de guardar
        localStorage.setItem('selectedRowsTabla4_3', JSON.stringify(selectedRowsTabla4_3));
        /*const selected3 = selectedRowsTabla4_3.filter(item => item.seleccionada);
        localStorage.setItem('selectedRowsTabla4_3', JSON.stringify(selected3));*/
        localStorage.setItem('selectedRowsTabla4_4', JSON.stringify(selectedRowsTabla4_4));
        /* const selected4 = selectedRowsTabla4_4.filter(item => item.seleccionada);
         localStorage.setItem('selectedRowsTabla4_4', JSON.stringify(selected4));*/

        //onst selected5 = selectedRowsTabla4_5.filter(item => item.seleccionada);
        localStorage.setItem('selectedRowsTabla4_5', JSON.stringify(selectedRowsTabla4_5));

        //const selected6 = selectedRowsTabla4_6.filter(item => item.seleccionada);
        localStorage.setItem('selectedRowsTabla4_6', JSON.stringify(selectedRowsTabla4_6));

        alert('Filas seleccionadas guardadas exitosamente!');
    };

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-200 rounded-lg shadow-lg mb-10">
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-4">
                Una vez establecidos los criterios de selección, deben evaluarse aquellos, que para la situación concreta que se analiza,
                son de caracter limitante para alguna de las alternativas de tratamiento elegidas en la 'Selección Preliminar'.
                Una vez se hayan evaluado los criterios limitantes, aquellas Líneas de Tratamiento que no cumplan los mismos se
                eliminan del proceso de selección.
            </p>
            <span className="flex items-center mb-2">
                <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6">4.1. Eficacia de Remoción</h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="mb-2">El criterio de eficacia de remoción considera:</p>
            <ul className="list-disc list-inside mb-4 pl-6 text-justify">
                <li className="mb-1">
                    La calidad exigida a los efluentes tratados, para cumplir con los requisitos de vertido se deberán seleccionar aquellas tecnologías con rendimientos iguales o superiores a los requeridos e indicados en el cuadro 'RENDIMIENTO REQUERIDO'.
                </li>
                <li className="mb-1">
                    La adaptación de la Línea de Tratamiento al tipo de contaminación de las aguas residuales a tratar, la presencia de aguas residuales de origen industrial pueden afectar negativamente a los rendimientos de la PTAR. Como referencia, las líneas de tratamiento basadas en procesos de biopelícula (Líneas 4, 5, 6 y 7) presentan una mejor tolerancia frente a la presencia de compuestos tóxicos en las aguas residuales a tratar, que los sistemas de biomasa en suspensión.
                </li>
                <li className="mb-1">
                    El nivel de concentración de materia orgánica en las aguas residuales a tratar, de forma generalizada, las tecnologías de carácter extensivo se comportan mejor para el tratamiento de aguas residuales diluidas que las de carácter intensivo y, dentro de estas, las de biomasa adherida presentan un mejor comportamiento que las de biomasa en suspensión. Como referencia, se recomienda seleccionar las Líneas de Tratamiento considerando el cuadro 'COMPORTAMIENTO AL NIVEL DE CONCENTRACIÓN'.
                </li>
                <li className="mb-1">
                    La tolerancia de la Línea de Tratamiento para hacer frente a las variaciones de caudal y carga, que experimentan las aguas residuales a tratar, para poder seguir cumpliendo en todo momento con las exigencias de la normativa de vertidos. Como referencia, se recomienda que la selección de las líneas de tratamiento considere la tolerancia de las mismas indicado en el cuadro 'TOLERANCIA LÍNEAS DE TRATAMIENTO A VARIACIONES DE CAUDAL Y CARGA'.
                </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                A continuación tiene listadas las Líneas de Tratamiento elegidas en la 'Selección Previa'. Marque aquellas Líneas de Tratamiento que cumplen los criterios previamente detallados acerca de la eficacia de remoción:            </p>

            <Tabla4_1 setSelectedRowsTabla4_1={setSelectedRowsTabla4_1} />
            <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6 text-center">Anexo A-1</h3>

          <div className="overflow-x-auto shadow-md sm:rounded-lg mt-4 mb-4 max-w-md mx-auto">
            <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
              <thead className="bg-green-400 text-white">
                <tr>
                  <th className="border border-gray-200 px-2 py-2">Parámetro</th>
                  <th className="border border-gray-200 px-2 py-2">Valor Ingresado</th>
                  <th className="border border-gray-200 px-2 py-2">Max. Admisible (Diario)</th>
                  <th className="border border-gray-200 px-2 py-2">Rendimiento (%)</th>
                </tr>
              </thead>
              <tbody>
             
                <tr>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">DBO5</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{dbo5}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{dbo1}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{dbo1Porcentaje}%</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">DQO</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{dqo}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{dqo1}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{dqo1Porcentaje}%</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">PT</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{pt}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{pt1}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{ptPorcentaje}%</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">NT</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{nt}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{nt1}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{ntPorcentaje}%</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">Coliformes</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{coliformes}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{coliformes1}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{coliformesPorcentaje}%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6 text-center" >Anexo A-2</h3>
          <div className="overflow-x-auto shadow-md sm:rounded-lg mt-4 mb-4 max-w-md mx-auto">
            <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
              <thead className="bg-green-400 text-white">
                <tr>
                  <th className="border border-gray-200 px-2 py-2">Parámetro</th>
                  <th className="border border-gray-200 px-2 py-2">Valor Ingresado</th>
                  <th className="border border-gray-200 px-2 py-2">Max. Admisible (Diario)</th>
                  <th className="border border-gray-200 px-2 py-2">Rendimiento (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">Sólidos en suspensión</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{solidosSuspension}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{ss}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{ssPorcentaje}%</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">DBO5</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{dbo5}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{dbo5Constant}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{dbo5Porcentaje}%</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">DQO</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{dqo}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{dqoConstant}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{dqoPorcentaje}%</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">Coliformes</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{coliformes}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{coliformes0}</td>
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{coliformesPorcentaj0}%</td>
                </tr>
              </tbody>
            </table>
          </div>
            <span className="flex items-center mb-2">
                <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6">4.2. Terrenos disponibles para la implantación de la PTAR</h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                La superficie de terreno disponible para la ubicación de la PTAR se constituye en un factor limitante, ya que puede impedir la implantación de tratamientos que presenten elevados requisitos de superficie por habitante servido.
            </p>
            <p className="text-gray-600 dark:text-gray-300 font-black mb-2">
                {/*input de poblacion horizonte */}
                Conocida que la superficie disponible para la implantación de la PTAR es:<input className="font-semibold text-center bg-green-300 rounded-s text-white cursor-not-allowed" disabled placeholder={area_terreno} ></input> m2.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                A continuación, se ha calculado los requisitos de superficie para cada Línea de Tratamiento previamente seleccionada, considerando las superficies estimadas en el apartado 12.2.3.2 de la Guía.
            </p>
            <p className="mb-2">Además de la superficie disponibe, deben considerarse otros factores referidos al sitio de implantación, como son:</p>
            <ul className="list-disc list-inside mb-4 pl-6 text-justify">
                <li className="mb-1">
                    Los tratamientos que exijan mayores movimientos de tierra se ven penalizados en terrenos rocosos o difíciles de excavar.
                </li>
                <li className="mb-1">
                    Los tratamientos que requieran de mayor profundidad se verán afectados por el nivel freático.
                </li>
                <li className="mb-1">
                    Los tratamientos que precisen de desniveles mayores para poder realizar una operación por gravedad se ven beneficiados cuando la topografía del sitio lo permite.
                </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                En el siguiente listado, elija las Líneas de Tratamiento cuya superficie necesaria sea aproximadamente igual o menor a la superficie disponible. Asimismo, considere para la elección los aspectos previamente indicados.
            </p>
            <Tabla4_2 setSelectedRowsTabla4_2={setSelectedRowsTabla4_2} />
            <span class="flex items-center mb-2">
                <h3 class=" text-lg font-semibold text-gray-800 dark:text-white pr-6">4.3. Aceptación Social</h3>
                <span class="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                En el proyecto de la PTAR, de forma general, se identifican dos grupos de interés que, debido a las repercusiones que sobre ellos puede tener la tecnología elegida, será preciso consultar: la población del lugar en que se va a implantar la PTAR y la entidad que vaya a gestionar las instalaciones de tratamiento.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                En el siguiente listado, elija las Líneas de Tratamiento que, previa consulta pública, cuentan con la Aceptación Social y la Aceptación de la Entidad encargada de la gestión de la PTAR.
            </p>
            <Tabla4_3 setSelectedRowsTabla4_3={setSelectedRowsTabla4_3} />
            <span className="flex items-center mb-2">
                <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6">4.4. Impactos ambientales</h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                Los olores o los ruidos pueden ser limitantes en caso que la PTAR se vaya a implantar cerca a zonas residenciales o turísticas. No obstante, se debe considerar que en muchos casos estos problemas pueden mitigarse a través de medidas preventivas, como el confinamiento de espacios, la desodorización de los gases malolientes, o la aplicación de sistemas antiruidos.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                A continuación, se lista las Líneas de Tratamiento previamente seleccionadas indicado el riesgo a emisión de olores y ruidos según lo establecido en el apartado 12.2.3.5 de la Guía. Si el proyectista considera que el presente criterio es limitante debido a la cercanía de la PTAR a zonas habitadas o turísticas, elegir aquellas Líneas de Tratamiento que menor riesgo de ruidos y olores generan.
            </p>
            <p className="text-blue-600 dark:text-gray-300">
                Nota.- En general se recomienda no descartar ninguna Linea de tratamiento y evaluar el criterio en la etapa de ponderación y valoración
            </p>
            <Tabla4_4 setSelectedRowsTabla4_4={setSelectedRowsTabla4_4} />
            <span className="flex items-center mb-2">
                <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6">4.5. Operación y mantenimiento</h3>
                <span claclassNamess="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                Los aspectos relacionados con la operación y el mantenimiento pueden ser limitantes en el caso de poblaciones pequeñas que no disponen de recursos, ni de personal cualificado y precisan de tecnologías de baja complejidad técnica y de mantenimiento sencillo.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                A continuación, se lista las Líneas de Tratamiento previamente seleccionadas indicado la complejidad de cada línea, de acuerdo a lo indicado en el apartado 12.2.3.7 de la Guía. En caso de considerarse el cirterio como limitante, elija las Líneas con menor complejidad.
            </p>
            <p className="text-blue-600 dark:text-gray-300">
                Nota.- En general se recomienda no descartar ninguna Linea de tratamiento y evaluar el criterio en la etapa de ponderación y valoración
            </p>
            <Tabla4_5 setSelectedRowsTabla4_5={setSelectedRowsTabla4_5} />
            <span className="flex items-center mb-2">
                <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6">4.6. Costos de construcción y de operación y mantenimiento</h3>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                La disponibilidad económica para hacer frente a los costos de construcción y de operación y mantenimiento de determinados tratamientos en un entorno socioeconómico determinado, puede constituirse en un criterio de carácter limitante. Así, en entornos con recursos económicos y técnicos limitados para afrontar la implantación y la operación y mantenimiento de una PTAR, ciertas alternativas, más sofisticadas, pueden descartarse.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                A continuación, se lista las Líneas de Tratamiento previamente seleccionadas indicando el costo de implantación y de operación y mantenimiento que han sido estimados de acuerdo a lo indicado en el apartado 12.2.3.8 de la Guía.
            </p>
            <Tabla4_6 setSelectedRowsTabla4_6={setSelectedRowsTabla4_6} />
            <p className="text-blue-600 dark:text-gray-300">
                (*) Los costos son estimados a efectos de comparación solamente, el presupuesto del proyecto debe determinarse a partir del Diseño Final
            </p>
            <div className="flex justify-center mt-4">
                <button onClick={handleSaveSelectedRows} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                    Guardar Selección
                </button>
            </div>

        </div>
    )
}

export default Paso4