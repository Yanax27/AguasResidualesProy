import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { getImg } from "../services/firestoreService";
import SpinnerPdf from "./SpinnerPdf";
import { db } from '../data/FireBase';
import { collection, addDoc } from "firebase/firestore";
import { Alert, AlertTitle } from '@mui/material';

const Paso9 = () => {
  const [matchingImages, setMatchingImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);

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
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getImg();
        // Filter images to find matches with selectedLine
        const matchingImages = images.filter(img => img.descripcion === selectedLine);
        setMatchingImages(matchingImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoadingImages(false);
      }
    };

    fetchImages();
  }, [selectedLine]);

  // Save data to Firestore
  const saveToFirestore = async (nombreSeleccion) => {
    const dataToSave = {
      solidosSuspension: localStorage.getItem("solidosSuspension"),
      dbo5: localStorage.getItem("dbo5"),
      dqo: localStorage.getItem("dqo"),
      nt: localStorage.getItem("nt"),
      pt: localStorage.getItem("pt"),
      ph: localStorage.getItem("ph"),
      coliformesTotales: localStorage.getItem("coliformesTotales"),
      temperaturaAgua: localStorage.getItem("temperaturaAgua"),
      temperaturaAire: localStorage.getItem("temperaturaAire"),
      aporteAguasResiduales: localStorage.getItem("aporteAguasResiduales"),
      caudalMedio: localStorage.getItem("caudalMedio"),
      conductividad: localStorage.getItem("conductividad"),
      aceitesGrasas: localStorage.getItem("aceitesGrasas"),
      poblacion_horizonte: localStorage.getItem("poblacion_horizonte"),
      presupuesto: localStorage.getItem("presupuesto"),
      area_terreno: localStorage.getItem("area_terreno"),
      zonaEcologica: localStorage.getItem("zonaEcologica"),
      LineaSeleccionada: selectedLine,
      nombreSeleccion: nombreSeleccion,
    };

    try {
      await addDoc(collection(db, "Reportes"), dataToSave);
      swal("Éxito", "Datos guardados exitosamente", "success");
    } catch (error) {
      console.error("Error guardando los datos en Firestore: ", error);
      swal("Error", "Error guardando los datos", "error");
    }
  };

  const handleSaveClick = () => {
    swal({
      title: "Ingrese el nombre de la selección",
      content: {
        element: "input",
        attributes: {
          placeholder: "Nombre de la selección",
          type: "text",
        },
      },
      buttons: ["Cancelar", "Guardar"],
      dangerMode: false,
    }).then((nombreSeleccion) => {
      if (nombreSeleccion) {
        saveToFirestore(nombreSeleccion);
      }
    });
  };

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
        <table className="table-auto w-full border-collapse border border-gray-200 bg-white rounded-md">
          <thead>
            <tr className="font-semibold bg-blue-400 text-white">
              <th className="px-4 py-2">Línea</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Línea Agua</th>
              <th className="px-4 py-2">Línea Lodos</th>
            </tr>
          </thead>
          <tbody>
            <tr className="font-semibold">
              <td className="border px-4 py-2">{lineDetails.linea}</td>
              <td className="border px-4 py-2">{lineDetails.descripcion}</td>
              <td className="border px-4 py-2">{lineDetails.lineaAgua}</td>
              <td className="border px-4 py-2 text-center">{lineDetails.lineaLodos}</td>
            </tr>
          </tbody>
        </table>
      )}

      {lineData4_2 && (
        <table className="table-auto w-full border-collapse border border-gray-200 bg-white mt-4 rounded-md">
          <thead>
            <tr className="font-semibold bg-blue-400 text-white">
              <th className="px-4 py-2">Superficie necesaria (m2)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="font-semibold">
              <td className="border px-4 py-2 text-center">{lineData4_2.superficie_necesaria} m2</td>
            </tr>
          </tbody>
        </table>
      )}

      {lineData4_6 && (
        <table className="table-auto w-full border-collapse border border-gray-200 bg-white mt-4 rounded-md">
          <thead>
            <tr className="font-semibold bg-blue-400 text-white">
              <th className="px-4 py-2">Costo de construcción estimado (Bs)</th>
              <th className="px-4 py-2">Costo anual estimado de O&M (Bs)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="font-semibold">
              <td className="border px-4 py-2 text-center">{formatCurrency(lineData4_6.costoPTAR)}</td>
              <td className="border px-4 py-2 text-center">{formatCurrency(lineData4_6.costoOMAnual)}</td>
            </tr>
          </tbody>
        </table>
      )}

      {loadingImages ? (
        <div className="flex justify-center items-center h-screen">
          <SpinnerPdf />
        </div>
      ) : (
        matchingImages.length > 0 && (
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
        )
      )}
      <div className="mt-4 flex justify-center mb-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleSaveClick}
        >
          Guardar Selección Final
        </button>
      </div>
   
      <div className="p-4 rounded bg-orange-100 mb-2">
      <Alert severity="warning" className="mb-2"> <AlertTitle> Advertencia...!</AlertTitle> </Alert>
          <p className=" dark:text-gray-300 text-justify mb-2">
            En caso de la decisión de reusar el efluente de la nueva PTAR a implantar, deben establecerse las características exigidas para el efluente regenerado,
            en función del uso o los usos a que se vaya a destinar. En este caso, el sistema de depuración debe incorporar los tratamientos necesarios para permitir
            la regeneración del efluente. Por lo tanto, el proyecto de la PTAR debe definir
          </p>
          <ul className="list-disc pl-6 mb-1">
            <li>- El caudal de las aguas depuradas que se quiere reusar.</li>
            <li>- Las calidades exigidas para el tipo de reúso al que se destinen los efluentes de la PTAR.</li>
            <li>- El tratamiento de regeneración a adoptar, para cumplir con los requisitos según el tipo de reúso considerado.</li>
            <li>- Los sistemas de almacenamiento y distribución necesarios de las aguas regeneradas, que permitan su empleo en el tipo de reúso elegido.</li>
            <li>- Los costos de construcción y explotación del sistema de regeneración y la forma de su financiación.</li>
          </ul>
          <div className="p-2  mb-2">
            <ul className="list-disc list-inside">
              <li>
                <strong>USO 1:</strong> Para abastecimiento doméstico de agua potable después de:
                <ul className="list-disc ml-6 mb-2">
                  <li>a) sólo una desinfección y ningún tratamiento (Clase A)</li>
                  <li>b) tratamiento solamente físico y desinfección (Clase B)</li>
                  <li>c) tratamiento físico-químico completo: coagulación, floculación, filtración y desinfección (Clase C)</li>
                  <li>d) almacenamiento prolongado o presedimentación, seguidos de tratamiento, al igual que c) (Clase D)</li>
                </ul>
              </li>
              <li><strong>USO 2:</strong> Para recreación de contacto primario: natación, esquí, inmersión (Clases A, B y C)</li>
              <li><strong>USO 3:</strong> Para protección de los recursos hidrobiológicos (Clases A, B y C)</li>
              <li><strong>USO 4:</strong> Para riego de hortalizas consumidas crudas y frutas de cáscara delgada, que sean ingeridas crudas sin remoción de ella (Clase A y B)</li>
              <li><strong>USO 5:</strong> Para abastecimiento industrial (Clases A, B, C y D)</li>
              <li><strong>USO 6:</strong> Para la cría natural y/o intensiva (acuicultura) de especies destinadas a la alimentación humana (Clases A, B y C)</li>
              <li><strong>USO 7:</strong> Para abrevadero de animales (Clases B y C)</li>
              <li><strong>USO 8:</strong> Para la navegación (Clases B, C y D)</li>
            </ul>
          </div>
      </div>
    </div>
  );
};

export default Paso9;
