import React, { useEffect, useState } from "react";
import { getDataAltiplano, getDataValles, getDataLlanos, getTemperatura } from "../services/firestoreService";
import linea12 from "../data/LineasTratamiento.json";

const AddDatosGuia = () => {
    const [dataAltiplano, setDataAltiplano] = useState([]);
    const [dataValles, setDataValles] = useState([]);
    const [dataLlanos, setDataLlanos] = useState([]);
    const [temperatura, setTemperatura] = useState([]);
    const [loading, setLoading] = useState(true);
    const [line, setLine] = useState([])
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [altiplano, valles, llanos, temp] = await Promise.all([
            getDataAltiplano(),
            getDataValles(),
            getDataLlanos(),
            getTemperatura()
          ]);
  
          setDataAltiplano(altiplano);
          setDataValles(valles);
          setDataLlanos(llanos);
          setTemperatura(temp);
          setLoading(false);
          setLine(linea12)
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
  
      fetchData();
    }, []);
  

//console.log("datos json line ",linea12)

  return (
    <div>prueba1</div>
  )
};

export default AddDatosGuia;