import React, { useState, useEffect } from "react";
import criteriosData from "../data/CriteriosSeleccion.json";

function Paso3() {
  const [criterios, setCriterios] = useState(criteriosData);
  const [otrosCriterios, setOtrosCriterios] = useState({
    otro1: "",
    otro2: "",
    otro3: ""
  });

  useEffect(() => {
    const criteriosGuardados = JSON.parse(localStorage.getItem("criteriosSeleccionados"));
    if (criteriosGuardados) {
      const updatedCriterios = criterios.map((criterio) => {
        if (criteriosGuardados.some((guardado) => guardado.id === criterio.id)) {
          return { ...criterio, seleccion: true };
        }
        return criterio;
      });
      setCriterios(updatedCriterios);
    }
  }, []); // Empty dependency array to ensure useEffect runs only once on component mount

  const handleInputChange = (event, key) => {
    const { value } = event.target;
    setOtrosCriterios((prevState) => ({
      ...prevState,
      [key]: value
    }));
    setCriterios((prevCriterios) =>
      prevCriterios.map((criterio) =>
        criterio.criterio.includes(`Otro (${key.slice(-1)})`)
          ? { ...criterio, input: value }
          : criterio
      )
    );
  };

  const handleCheckboxChange = (id) => {
    setCriterios((prevCriterios) =>
      prevCriterios.map((criterio) =>
        criterio.id === id ? { ...criterio, seleccion: !criterio.seleccion } : criterio
      )
    );
  };

  const handleSaveCriterios = () => {
    const criteriosSeleccionados = criterios.filter(criterio => criterio.seleccion);
    localStorage.setItem("criteriosSeleccionados", JSON.stringify(criteriosSeleccionados));
    alert("Criterios guardados correctamente.");
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg mb-10">
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
        Los criterios de selección recogen los aspectos que condicionan el tratamiento de las aguas residuales y por tanto, afectan la toma de decisiones en la selección de la Línea de Tratamiento. A continuación, se listan los criterios de selección más habituales, los mismos se encuentran detallados en el Apartado 12.2.3 de la Guía. No obstante, el listado mostrado abajo no es exhaustivo por lo que el proyectista puede considerar otros criterios adicionales de acuerdo a su experiencia o no considerar todos los criterios listados.
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
        En el siguiente listado, marque los criterios que considera pertinentes para el proceso de selección de la Línea de Tratamiento, en caso de considerar otro criterio adicional a los ya listados, marque la opción 'otro' e introduzca el nombre del criterio.
      </p>
      
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div class="max-w-3xl mx-auto py-8">
          <div class="overflow-x-auto shadow-md sm:rounded-lg mb-1">
          <div className="flex justify-end mb-2">
        <button
          className="mt-1 px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          onClick={handleSaveCriterios}
        >
          Guardar criterios
        </button>
      </div>
            <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
              <thead className="bg-blue-400 text-white">
                <tr>
                  <th className="border border-gray-200 px-4 py-2">Criterio de Selección</th>
                  <th className="border border-gray-200 px-4 py-2">Selección</th>
                </tr>
              </thead>
              <tbody>
                {criterios.map((criterio) => (
                  <tr key={criterio.id}>
                    <td className="border border-gray-200 px-4 py-2">
                      {criterio.criterio.includes("Otro") ? (
                        <>
                          {criterio.criterio}{" "}
                          <input
                            type="text"
                            value={criterio.input || ""}
                            onChange={(event) =>
                              handleInputChange(event, `otro${criterio.id - 8}`)
                            }
                            className="ml-2 border rounded px-2 py-1"
                          />
                        </>
                      ) : (
                        criterio.criterio
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={criterio.seleccion}
                        onChange={() => handleCheckboxChange(criterio.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Paso3;
