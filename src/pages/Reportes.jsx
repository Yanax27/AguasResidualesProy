import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../data/FireBase';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import SpinnerPdf from "../components/SpinnerPdf";


const Reportes = () => {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    const fetchReportes = async () => {
      const querySnapshot = await getDocs(collection(db, "Reportes"));
      const reportesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReportes(reportesList);
      setLoading(false); // Cuando se cargan los datos, establece loading a false
    };

    fetchReportes();
  }, []);

  const handleDelete = async (id) => {
    const result = await swal({
      title: '¿Estás seguro que desea eliminar?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });

    if (result) {
      await deleteDoc(doc(db, "Reportes", id));
      setReportes(reportes.filter(reporte => reporte.id !== id));
      swal('¡Eliminado!', 'El reporte ha sido eliminado.', 'success');
    }
  };

  // Muestra el spinner mientras los datos se están cargando
  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <SpinnerPdf />
    </div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Lista de Reportes</h2>
      <table className="table-auto w-full border-collapse border border-gray-200 bg-white">
        <thead>
          <tr className="bg-blue-400 text-white">
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Línea Seleccionada</th>
            <th className="px-4 py-2">Área del Terreno</th>
            <th className="px-4 py-2">Zona Ecológica</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map((reporte) => (
            <tr key={reporte.id} className="border-t">
              <td className="border px-4 py-2">{reporte.nombreSeleccion}</td>
              <td className="border px-4 py-2">{reporte.LineaSeleccionada}</td>
              <td className="border px-4 py-2">{reporte.area_terreno}</td>
              <td className="border px-4 py-2">{reporte.zonaEcologica}</td>
              <td className="border px-4 py-2 text-center space-x-2">
                <Link to={`/dashboard/detalle-reporte/${reporte.id}`} className="bg-blue-500 text-white px-2 py-1 rounded inline-flex items-center">
                  <FontAwesomeIcon icon={faEye} />
                </Link>
                <button
                  onClick={() => handleDelete(reporte.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded inline-flex items-center"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reportes;
