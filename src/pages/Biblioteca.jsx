import React, { useState, useEffect } from 'react';
import { db } from '../data/FireBase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import CardPdf from '../components/CardPdf';
import SpinnerPdf from '../components/SpinnerPdf';

const Biblioteca = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "PDF"));
    const sel = onSnapshot(q, (QuerySnapshot) => {
      let todosArray = [];
      QuerySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });

      setDatos(todosArray);
      setLoading(false);
    });
    return () => sel();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <SpinnerPdf />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center -mx-3">
          {datos.map((documento) => (
            <CardPdf key={documento.id} documento={documento} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Biblioteca;

