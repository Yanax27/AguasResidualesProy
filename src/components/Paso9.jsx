import React, { useState } from "react";
import { getImg } from "../services/firestoreService";
import SpinnerPdf from "./SpinnerPdf";

const Paso9 = () => {
  const [matchingImages, setMatchingImages] = useState([]);
  // Helper function to extract the main line part (e.g., "Línea 6.3" from "Línea 6.3 (soporte áridos)")
  const extractMainLine = (line) => {
    const match = line.match(/Línea \d+(\.\d+)?/);
    return match ? match[0] : line;
  };

  // Load data from localStorage
  const selectedLineRaw = localStorage.getItem("selectedLine");
  const selectedLine = extractMainLine(selectedLineRaw);

  const selectedRowsTabla4_2 = JSON.parse(localStorage.getItem("selectedRowsTabla4_2"));
  const selectedRowsTabla4_6 = JSON.parse(localStorage.getItem("selectedRowsTabla4_6"));
  const selectedLines = JSON.parse(localStorage.getItem("selectedLines"));

  // Find the matching data
  const lineData4_2 = selectedRowsTabla4_2.find(row => extractMainLine(row.linea_tratamiento) === selectedLine);
  const lineData4_6 = selectedRowsTabla4_6.find(row => extractMainLine(row.linea) === selectedLine);
  const lineDetails = selectedLines.find(line => extractMainLine(line.linea) === selectedLine);

  // Format number as Bolivian currency
  const formatCurrency = (value) => {
    return value.toLocaleString('es-BO', {
      style: 'currency',
      currency: 'BOB'
    });
  };

  // Fetch images from Firestore
  const fetchImages = async () => {
    try {
      const images = await getImg();
      // Filter images to find matches with selectedLine
      const matchingImages = images.filter(img => img.descripcion === selectedLine);
      setMatchingImages(matchingImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

 // fetchImages();

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        9. SELECCIÓN FINAL
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-4">
        Para finalizar el proceso de selección de alternativas, proceda con la selección de la alternativa más adecuada a las condiciones del sitio de emplazamiento de la PTAR. Como principal indicador considere la alternativa que alcanzó la mayor puntuación. Sin embargo, si dos o más alternativas tienen valoraciones finales semejantes, a partir de la comparación de los aspectos en que más se diferencien y, en especial de las preferencias del operador, realice la decisión definitiva marcando una alternativa en la fila 'SELECCIÓN'.
        Entonces la Línea de Tratamiento seleccionada es:
      </p>

      {lineDetails && (
        <table className="table-auto w-full border-collapse border border-gray-200 bg-white">
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
              <td className="border px-4 py-2">{lineDetails.linea}</td>
              <td className="border px-4 py-2">{lineDetails.descripcion}</td>
              <td className="border px-4 py-2">{lineDetails.lineaAgua}</td>
              <td className="border px-4 py-2">{lineDetails.lineaLodos}</td>
            </tr>
          </tbody>
        </table>
      )}

      {lineData4_2 && (
        <table className="table-auto w-full border-collapse border border-gray-200 bg-white mt-4">
          <thead>
            <tr className="text-lg font-semibold bg-blue-400 text-white">
              <th className="px-4 py-2">Superficie necesaria (m2)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-lg font-semibold">
              <td className="border px-4 py-2 text-center">{lineData4_2.superficie_necesaria} m2</td>
            </tr>
          </tbody>
        </table>
      )}

      {lineData4_6 && (
        <table className="table-auto w-full border-collapse border border-gray-200 bg-white mt-4">
          <thead>
            <tr className="text-lg font-semibold bg-blue-400 text-white">
              <th className="px-4 py-2">Costo de construcción estimado (Bs)</th>
              <th className="px-4 py-2">Costo anual estimado de O&M (Bs)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-lg font-semibold">
              <td className="border px-4 py-2 text-center">{formatCurrency(lineData4_6.costoPTAR)}</td>
              <td className="border px-4 py-2 text-center">{formatCurrency(lineData4_6.costoOMAnual)}</td>
            </tr>
          </tbody>
        </table>
      )}
      {matchingImages.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 text-center">
            Diagrama {selectedLine}
          </h3>
          <div className="flex flex-wrap items-center justify-center">
            {matchingImages.map((image, index) => (
              <div key={index} className="mr-2 mb-2">
                <img
                  src={image.imagen}
                  alt={image.descripcion}
                  className="max-w-1300 max-h-48 mx-auto"
                  onLoad={() => console.log('Loaded')}
                  onError={() => console.log('Error')}
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">{image.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <SpinnerPdf />
        </div>
      )}

    </div>
  );
};

export default Paso9;

