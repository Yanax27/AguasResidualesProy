import React from "react";

const Paso9 = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        9. SELECCIÓN FINAL
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-4">
        Para finalizar el proceso de selección de alternativas, proceda con la selección de la alternativa más adecuada a las condiciones del sitio de emplazamiento de la PTAR. Como principal indicador considere la alternativa que alcanzó la mayor puntuación. Sin embargo, si dos o más alternativas tienen valoraciones finales semejantes, a partir de la comparación de los aspectos en que más se diferencien y, en especial de las preferencias del operador, realice la decisión definitiva marcando una alternativa en la fila 'SELECCIÓN'.
        Entonces la Línea de Tratamiento seleccionada es:
      </p>
      <table className="table-auto">
        <thead>
          <tr className="text-lg font-semibold bg-blue-400 text-white">
            <th className="px-4 py-2">Línea</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2">Línea Agua</th>
            <th className="px-4 py-2">Línea Lodos</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-lg font-semibold">
            <td className="border px-4 py-2">6.3</td>
            <td className="border px-4 py-2">Pretratamiento + Reactores Anaerobios de Flujo Ascendente + Filtros Percoladores + Sedimentadores Secundarios</td>
            <td className="border px-4 py-2">RAFA + FP</td>
            <td className="border px-4 py-2">LS</td>
          </tr>
          <tr className="text-lg font-semibold bg-blue-400 text-white"> 
            <td className="border px-4 py-2">Superficie necesaria (m2)</td>
            <td className="border px-4 py-2">Costo de construcción estimado (Bs)</td>
            <td className="border px-4 py-2">Costo anual estimado de O&M (Bs)</td>
          </tr>
          <tr className="text-lg font-semibold">
            <td className="border px-4 py-2">1.716</td>
            <td className="border px-4 py-2">5.723.776</td>
            <td className="border px-4 py-2">219.509</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Paso9;