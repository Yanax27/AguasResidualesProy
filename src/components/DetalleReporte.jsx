import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../data/FireBase';

const DetalleReporte = () => {
  const { id } = useParams();
  const [reporte, setReporte] = useState(null);

  useEffect(() => {
    const fetchReporte = async () => {
      const docRef = doc(db, "Reportes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setReporte(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchReporte();
  }, [id]);

  if (!reporte) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4 mb-16">
      <div className="flex justify-start mb-4">
        <Link to="/dashboard/reporte" className="text-blue-500 hover:text-blue-700">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
           Volver atrás
          </button>
        </Link>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Detalles del Reporte</h2>
      <table className="table-auto w-full border-collapse border border-gray-200 bg-white">
        <thead>
          <tr className="bg-blue-400 text-white">
            <th className="px-4 py-2">Campo</th>
            <th className="px-4 py-2">Valor</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(reporte).map(([key, value]) => (
            <tr key={key} className="border-t">
              <td className="border px-4 py-2">{key}</td>
              <td className="border px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetalleReporte;
