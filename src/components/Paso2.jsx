import React, { useEffect, useState } from "react";
import { getDataAltiplano, getDataValles, getDataLlanos, getTemperatura } from "../services/firestoreService";
import Tabla1 from './Tabla1';
import Alert from '@mui/material/Alert';
import TablaLineaAplicable from "./TablaLineaAplicable";



const Paso2 = () => {
  //declaramos variables para manejo de errores y validaciones
  const [error, setError] = useState('');
  //funcion de manejo de errores para poblacion
  const handleChange = (e) => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (numericValue >= 1000 && numericValue <= 50000) {
      setError('');
    } else {
      setError('La población horizonte debe estar entre 1000 y 50000');
    }

    setPoblacion_horizonte(value);
  };


  // Declara las variables de entrada
  const [poblacion_horizonte, setPoblacion_horizonte] = useState(() => localStorage.getItem('poblacion_horizonte') || '');
  const [presupuesto, setPresupuesto] = useState(() => localStorage.getItem('presupuesto') || '');
  const [area_terreno, setArea_terreno] = useState(() => localStorage.getItem('area_terreno') || '');
  const [zonaEcologica, setZonaEcologica] = useState(() => localStorage.getItem('zonaEcologica') || 'Altiplano');


  //delcaramos variables de datos de tablas 5.2 y 5.4
  const [dataAltiplano, setDataAltiplano] = useState([]);
  const [dataValles, setDataValles] = useState([]);
  const [dataLlanos, setDataLlanos] = useState([]);
  const [temperatura, setTemperatura] = useState([]);
  const [checked, setChecked] = useState(false);

  //dealcaramos variables de la tabla apartado 2.9.2
  const [solidosSuspension, setSolidosSuspension] = useState(() => localStorage.getItem('solidosSuspension') || '');
  const [dbo5, setDbo5] = useState(() => localStorage.getItem('dbo5') || '');
  const [dqo, setDqo] = useState(() => localStorage.getItem('dqo') || '');
  const [nt, setNt] = useState(() => localStorage.getItem('nt') || '');
  const [pt, setPt] = useState(() => localStorage.getItem('pt') || '');
  const [coliformesTotales, setColiformesTotales] = useState(() => localStorage.getItem('coliformesTotales') || '');
  const [temperaturaAgua, setTemperaturaAgua] = useState(() => localStorage.getItem('temperaturaAgua') || '');
  const [temperaturaAire, setTemperaturaAire] = useState(() => localStorage.getItem('temperaturaAire') || '');
  const [aporteAguasResiduales, setAporteAguasResiduales] = useState(() => localStorage.getItem('aporteAguasResiduales') || '');
  const [caudalMedio, setCaudalMedio] = useState(() => localStorage.getItem('caudalMedio') || '');
  const [ph, setPh] = useState(() => localStorage.getItem('ph') || '');
  const [conductividad, setConductividad] = useState(() => localStorage.getItem('conductividad') || '');
  const [aceitesGrasas, setAceitesGrasas] = useState(() => localStorage.getItem('aceitesGrasas') || '');
  //variable para mostrar tabla tecnologia linea aplicable
  const [showTabla, setShowTabla] = useState(false);

  //inicializa  y llama a los datos guardandolos en las variables
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
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();

  }, [poblacion_horizonte, zonaEcologica]);


  //cargar automaticamente los parametros que indica la guia en sus tablas
  const handleCheckboxChange = (event) => {
    //cambiar de falso a verdarero para que muestre como chekeado
    setChecked(event.target.checked);

    //declaramos un condicional if
    if (event.target.checked) {
      //vaiables auxiliares
      let selectedData;
      let auxData1;
      let auxData2;

      //condiiconal de eleleccion  para ddatos de zona ecologica
      switch (zonaEcologica) {
        case "Altiplano":
          selectedData = dataAltiplano;
          break;
        case "Valles":
          selectedData = dataValles;
          break;
        case "Llanos":
          selectedData = dataLlanos;
          break;
        default:
          selectedData = [];
      }

      // Buscar datos de temperatura
      const tempData = temperatura.find(item => item.tipo === zonaEcologica);
      if (tempData) {
        setTemperaturaAgua(tempData.temp_agua || "");
        setTemperaturaAire(tempData.temp_aire || "");
      }

      // Buscar datos de población
      const matchingPopulationData = selectedData.find(item => item.poblacion === poblacion_horizonte);

      //
      if (matchingPopulationData) {
        setSolidosSuspension(matchingPopulationData.sst || "");
        setDbo5(matchingPopulationData.dbo5 || "");
        setDqo(matchingPopulationData.dqo || "");
        setNt(matchingPopulationData.n || "");
        setPt(matchingPopulationData.p || "");
        setColiformesTotales(matchingPopulationData.coliformesTotales || "1E+07");
        setAporteAguasResiduales(matchingPopulationData.dotaciones || "")

        // Calcular el Caudal Medio
        const dota = parseFloat(matchingPopulationData.dotaciones) || 0;
        const caudalMed = (dota * poblacion_horizonte) / 1000;
        setCaudalMedio(caudalMed);
      } else {
        // Buscar límites de población más cercanos
        const valPobla = [1000, 2000, 5000, 10000, 25000, 50000];
        let poblacion1 = -Infinity;
        let poblacion2 = Infinity;
        selectedData.forEach(dato => {
          //recorrer valores
          for (let i = 0; i < valPobla.length; i++) {
            if (valPobla[i] <= parseFloat(poblacion_horizonte)) {
              poblacion1 = valPobla[i];
            } else {
              poblacion2 = valPobla[i];
              break;
            }
          }
        })

        // Buscar datos correspondientes a los límites de población
        selectedData.forEach(dato => {
          if (parseFloat(dato.poblacion) === poblacion1) {
            auxData1 = dato;
          }
          if (parseFloat(dato.poblacion) === poblacion2) {
            auxData2 = dato;
          }
        });

        // Interpolación lineal
        if (auxData1 && auxData2) {
          setSolidosSuspension(Math.round(interpolate(poblacion_horizonte, poblacion1, auxData1.sst, poblacion2, auxData2.sst)));
          setDbo5(Math.round(interpolate(poblacion_horizonte, poblacion1, auxData1.dbo5, poblacion2, auxData2.dbo5)));
          setDqo(Math.round(interpolate(poblacion_horizonte, poblacion1, auxData1.dqo, poblacion2, auxData2.dqo)));
          setNt(Math.round(interpolate(poblacion_horizonte, poblacion1, auxData1.n, poblacion2, auxData2.n)));
          setPt(interpolate(poblacion_horizonte, poblacion1, auxData1.p, poblacion2, auxData2.p).toFixed(1));
          setAporteAguasResiduales(Math.round(interpolate(poblacion_horizonte, poblacion1, auxData1.dotaciones, poblacion2, auxData2.dotaciones)));
          setColiformesTotales("1E+07");

          const dot = Math.round(interpolate(poblacion_horizonte, poblacion1, auxData1.dotaciones, poblacion2, auxData2.dotaciones));
          const caudalMed = (dot * poblacion_horizonte) / 1000;
          setCaudalMedio(caudalMed);
        }
      }
    } else {
      // Si el checkbox está deseleccionado, restablecer los valores a un valor predeterminado
      setSolidosSuspension("");
      setDbo5("");
      setDqo("");
      setNt("");
      setPt("");
      setColiformesTotales("");
      setTemperaturaAgua("");
      setTemperaturaAire("");
      setAporteAguasResiduales("");
      setCaudalMedio("");
    }
  };

  function interpolate(x, x1, y1, x2, y2) {
    x = parseFloat(x);
    x1 = parseFloat(x1);
    y1 = parseFloat(y1);
    x2 = parseFloat(x2);
    y2 = parseFloat(y2);
    //console.log(x, x1, y1, x2, y2)

    if (x1 === x2) {
      throw new Error("x1 y x2 no pueden ser iguales");
    }
    const y = y1 + ((y2 - y1) / (x2 - x1)) * (x - x1);
    return y;
  }

  //handle para mostrar la tabla sobre tecnologias aplicables en la zona de de estudio
  const handleButtonClick = () => {
    setShowTabla(true);
  };
  const handleClose = () => {
    setShowTabla(false);
  };
  //guardar
  const handleGuardarClick = () => {
    localStorage.setItem('poblacion_horizonte', poblacion_horizonte);
    localStorage.setItem('presupuesto', presupuesto);
    localStorage.setItem('area_terreno', area_terreno);
    localStorage.setItem('zonaEcologica', zonaEcologica);
    localStorage.setItem('solidosSuspension', solidosSuspension);
    localStorage.setItem('dbo5', dbo5);
    localStorage.setItem('dqo', dqo);
    localStorage.setItem('nt', nt);
    localStorage.setItem('pt', pt);
    localStorage.setItem('coliformesTotales', coliformesTotales);
    localStorage.setItem('temperaturaAgua', temperaturaAgua);
    localStorage.setItem('temperaturaAire', temperaturaAire);
    localStorage.setItem('aporteAguasResiduales', aporteAguasResiduales);
    localStorage.setItem('caudalMedio', caudalMedio);
    localStorage.setItem('ph', ph);
    localStorage.setItem('conductividad', conductividad);
    localStorage.setItem('aceitesGrasas', aceitesGrasas);
    const selectedLines = JSON.parse(localStorage.getItem('selectedLines') || '[]');
    localStorage.setItem('selectedLines', JSON.stringify(selectedLines));

    alert("Valores guardados correctamente");
  };

  const getAlertForPh = () => {
    const phValue = parseFloat(ph);
    if (isNaN(phValue)) {
      return null;
    }

    if (phValue < 6.5) {
      return (
        <Alert severity="warning">
          Valor de pH={ph} fuera del rango de valores típicos de aguas residuales urbanas, posibles vertidos industriales.
        </Alert>
      );
    }

    if (phValue >= 6.5 && phValue <= 8.5) {
      return (
        <Alert severity="success">
          Valor del pH={ph} es típico de aguas residuales urbanas.
        </Alert>
      );
    }

    if (phValue > 8.5) {
      return (
        <Alert severity="warning">
          Valor de pH={ph} fuera del rango de valores típicos de aguas residuales urbanas, posibles vertidos industriales.
        </Alert>
      );
    }

    return null;
  };
  const getAlertForConductividad = () => {
    const conductividadValue = parseFloat(conductividad);
    if (isNaN(conductividadValue)) {
      return null;
    }

    if (conductividadValue < 500) {
      return (
        <Alert severity="warning">
          Valor de conductividad Cond. = {conductividad} µS/cm por debajo de los límites típicos en aguas residuales urbanas.
        </Alert>
      );
    }

    if (conductividadValue >= 500 && conductividadValue <= 1500) {
      return (
        <Alert severity="success">
          Valor de conductividad Cond. = {conductividad} µS/cm es característico de aguas residuales urbanas.
        </Alert>
      );
    }

    if (conductividadValue > 1500) {
      return (
        <Alert severity="warning">
          Valor de Conductividad Cond. = {conductividad} µS/cm es elevado, posibles vertidos de origen industrial.
        </Alert>
      );
    }

    return null;
  };
  //para temperatura del agua
  const getAlertForTempAgua = () => {
    const tempAguaValue = parseFloat(temperaturaAgua);
    if (isNaN(tempAguaValue)) {
      return null;
    }

    if (tempAguaValue < 10) {
      return (
        <Alert severity="warning">
          La temperatura {tempAguaValue}°C está fuera del rango de valores típicos de aguas residuales urbanas.
        </Alert>
      );
    }

    if (tempAguaValue >= 10 && tempAguaValue <= 30) {
      return (
        <Alert severity="success">
          La temperatura {tempAguaValue}°C es típica en aguas residuales urbanas.
        </Alert>
      );
    }

    if (tempAguaValue > 30) {
      return (
        <Alert severity="warning">
          La temperatura {tempAguaValue}°C está fuera del rango de valores típicos de aguas residuales urbanas.
        </Alert>
      );
    }

    return null;
  };
  // Para aceites y grasas:
  const getAlertForAceitesGrasas = () => {
    const aceitesGrasasValue = parseFloat(aceitesGrasas);
    if (isNaN(aceitesGrasasValue)) {
      return null;
    }

    if (aceitesGrasasValue < 100) {
      return (
        <Alert severity="warning">
          La concentración de aceites y grasas {aceitesGrasasValue} mg/L está fuera del rango de valores típicos de aguas residuales urbanas.
        </Alert>
      );
    }

    if (aceitesGrasasValue >= 100 && aceitesGrasasValue <= 150) {
      return (
        <Alert severity="success">
          La concentración de aceites y grasas {aceitesGrasasValue} mg/L es típica de aguas residuales urbanas.
        </Alert>
      );
    }

    if (aceitesGrasasValue > 150) {
      return (
        <Alert severity="warning">
          La concentración de aceites y grasas {aceitesGrasasValue} mg/L está fuera del rango de valores típicos de aguas residuales urbanas.
        </Alert>
      );
    }

    return null;
  };
  //Para solidos en suspension
  const getAlertForSolidosSuspension = () => {
    const solidosSuspensionValue = parseFloat(solidosSuspension);
    if (isNaN(solidosSuspensionValue)) {
      return null;
    }

    if (solidosSuspensionValue < 100) {
      return (
        <Alert severity="warning">
          La concentración de sólidos en suspensión {solidosSuspensionValue} mg/L está fuera del rango de valores típicos de aguas residuales urbanas.
        </Alert>
      );
    }

    if (solidosSuspensionValue >= 100 && solidosSuspensionValue <= 350) {
      return (
        <Alert severity="success">
          La concentración de sólidos en suspensión {solidosSuspensionValue} mg/L es típica de aguas residuales urbanas.
        </Alert>
      );
    }

    if (solidosSuspensionValue > 350) {
      return (
        <Alert severity="warning">
          La concentración de sólidos en suspensión {solidosSuspensionValue} mg/L está fuera del rango de valores típicos de aguas residuales urbanas.
        </Alert>
      );
    }

    return null;
  };
  //para dqo
  const getAlertForDqo = () => {
    const dqoValue = parseFloat(dqo);
    if (isNaN(dqoValue)) {
      return null;
    }

    if (dqoValue < 250) {
      return (
        <Alert severity="warning">
          La concentración de DQO {dqoValue} mg/L está fuera del rango de valores típicos de aguas residuales urbanas.
        </Alert>
      );
    }

    if (dqoValue >= 250 && dqoValue <= 1000) {
      return (
        <Alert severity="success">
          La concentración de DQO {dqoValue} mg/L es típica de aguas residuales urbanas.
        </Alert>
      );
    }

    if (dqoValue > 1000) {
      return (
        <Alert severity="warning">
          La concentración de DQO {dqoValue} mg/L está fuera del rango de valores típicos de aguas residuales urbanas.
        </Alert>
      );
    }

    return null;
  };
  //para nitrogeno
  const getAlertForNt = () => {
    const ntValue = parseFloat(nt);
    if (isNaN(ntValue)) {
      return null;
    }

    if (ntValue < 20) {
      return (
        <Alert severity="warning">
          El valor de contenido de nitrógeno total {ntValue} mg/L está fuera del rango de valores típicos de aguas residuales urbanas.
        </Alert>
      );
    }

    if (ntValue >= 20 && ntValue <= 85) {
      return (
        <Alert severity="success">
          El valor de contenido de nitrógeno total {ntValue} mg/L es típico de aguas residuales urbanas.
        </Alert>
      );
    }

    if (ntValue > 85) {
      return (
        <Alert severity="warning">
          El valor de contenido de nitrógeno total {ntValue} mg/L está fuera del rango de valores típicos de aguas residuales urbanas.
        </Alert>
      );
    }

    return null;
  };
  //para Fosforo
  const getAlertForPt = () => {
    const ptValue = parseFloat(pt);
    if (isNaN(ptValue)) {
      return null;
    }

    if (ptValue < 4) {
      return (
        <Alert severity="warning">
          El valor contenido de fósforo total {ptValue} mg/L está fuera del rango de valores típicos de aguas residuales urbanas.
        </Alert>
      );
    }

    if (ptValue >= 4 && ptValue <= 15) {
      return (
        <Alert severity="success">
          El valor de contenido de fósforo total {ptValue} mg/L es típico de aguas residuales urbanas.
        </Alert>
      );
    }

    if (ptValue > 15) {
      return (
        <Alert severity="warning">
          El valor contenido de fósforo total {ptValue} mg/L está fuera del rango de valores típicos de aguas residuales urbanas.
        </Alert>
      );
    }

    return null;
  };
  //para DQO5
  const getAlertForDbo5 = () => {
    const dbo5Value = parseFloat(dbo5);
    if (isNaN(dbo5Value)) {
      return null;
    }

    if (dbo5Value < 110) {
      return (
        <Alert severity="warning">
          La concentración de DBO(5) {dbo5Value} mg/L está fuera del rango de valores típicos de aguas residuales urbanas.
        </Alert>
      );
    }

    if (dbo5Value >= 110 && dbo5Value <= 400) {
      return (
        <Alert severity="success">
          La concentración de DBO(5) {dbo5Value} mg/L es típica de aguas residuales urbanas.
        </Alert>
      );
    }

    if (dbo5Value > 400) {
      return (
        <Alert severity="warning">
          La concentración de DBO(5) {dbo5Value} mg/L está fuera del rango de valores típicos de aguas residuales urbanas.
        </Alert>
      );
    }

    return null;
  };
  //para coliformes totales
  const getAlertForColiformesTotales = () => {
    const coliformesValue = parseFloat(coliformesTotales);
    if (isNaN(coliformesValue)) {
      return null;
    }

    const lowerLimit = Math.pow(10, 6); // 10^6
    const upperLimit = Math.pow(10, 9); // 10^9

    if (coliformesValue < lowerLimit) {
      return (
        <Alert severity="warning">
          La concentración de Coliformes Totales {coliformesValue} NMP/100 mL está fuera del rango de valores típicos de aguas residuales urbanas.
        </Alert>
      );
    }

    if (coliformesValue >= lowerLimit && coliformesValue <= upperLimit) {
      return (
        <Alert severity="success">
          La concentración de Coliformes Totales {coliformesValue} NMP/100 mL es típica de aguas residuales urbanas.
        </Alert>
      );
    }

    if (coliformesValue > upperLimit) {
      return (
        <Alert severity="warning">
          La concentración de Coliformes Totales {coliformesValue} NMP/100 mL está fuera del rango de valores típicos de aguas residuales urbanas.
        </Alert>
      );
    }

    return null;
  };
  //para relacion dbo5/dqo
  const getAlertForDBO5DQO = () => {
    const dbo5Value = parseFloat(dbo5);
    const dqoValue = parseFloat(dqo);
  
    if (isNaN(dbo5Value) || isNaN(dqoValue) || dqoValue === 0) {
      return null;
    }
  
    const ratio = dbo5Value / dqoValue;
  
    if (ratio < 0.2) {
      return (
        <Alert severity="warning">
          Relación DBO(5)/DQO = {ratio.toFixed(2)}, es característica de aguas muy poco biodegradables, procesos biológicos no aptos, se recomienda procesos fisicoquímicos.
        </Alert>
      );
    }
  
    if (ratio >= 0.2 && ratio <= 0.4) {
      return (
        <Alert severity="success">
          Las aguas residuales presentan una relación DBO(5)/DQO = {ratio.toFixed(2)}, es característica de aguas biodegradables, apto para tratamiento biológico.
        </Alert>
      );
    }
  
    if (ratio > 0.4) {
      return (
        <Alert severity="success">
          Relación DBO(5)/DQO = {ratio.toFixed(2)}, es característica de aguas muy biodegradables, típico en aguas residuales urbanas, apto para tratamiento biológico.
        </Alert>
      );
    }
  
    return null;
  };
  

  return (
    <div className="p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Selección y Dimensionamiento de la Línea de Tratamiento</h2>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-4">
        La selección y dimensionamiento de la Línea de Tratamiento que mejor se adecúe a las condiciones locales del entorno y a las características de las aguas a tratar, requiere de la recolección de información sobre los factores que condicionan e influyen en el desempeño de la PTAR. Los factores que mínimamente deben considerarse se detallan en el Capítulo 4 de la Guía, y se indican a continuación:
      </p>
      <span className="flex items-center">
        <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6">2.1. Normas Técnicas Existentes</h3>
        <span className="h-px flex-1 bg-black"></span>
      </span>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-4">
        Tanto la selección de la Línea de Tratamiento, como la redacción del proyecto de la PTAR, deben realizarse respetando la normativa técnica aplicable de nuestro medio, la misma se encuentra detallada en el apartado 4.1 de la Guía.
      </p>
      <span className="flex items-center">
        <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6">2.2. Información de Carácter Administrativo</h3>
        <span className="h-px flex-1 bg-black"></span>
      </span>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
        De forma previa al inicio de la redacción del proyecto de la PTAR, se debe recopilar toda la información de carácter administrativo y legal, que pueda condicionar la ejecución de las obras. De forma referencial se debe considerar:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>- Autorizaciones necesarias para la construcción</li>
        <li>- Autorizaciones necesarias para la operación de las instalaciones de tratamiento</li>
        <li>- Autorizaciones y normas de calidad sobre los vertidos</li>
        <li>- El proyecto debe enmarcarse en la Planificación Sectorial y/o Planes Maestros</li>
      </ul>

      <span className="flex items-center">
        <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6">2.3. Población servida y población horizonte del proyecto	</h3>
        <span className="h-px flex-1 bg-black"></span>
      </span>
      <p className="text-gray-600 text-justify dark:text-gray-300 mb-2">
        La Población Servida hace referencia al número de habitantes dentro del área de servicio de la PTAR, la misma debe determinarse a través de los censos oficiales y/o estudio socioeconómico.
      </p>
      <p className="text-gray-600 text-justify dark:text-gray-300 mb-6">
        La Población Horizonte del proyecto que hace referencia al número de habitantes dentro del área de servicio de la PTAR para el periodo de diseño de la PTAR, debe determinarse en base a la población servida y de acuerdo a los métodos establecidos en la norma NB 688.
      </p>
      <p className="text-gray-600 dark:text-gray-300 font-black mb-2">
        {/* input de poblacion horizonte */}
        Población Horizonte del Proyecto:
        <input
          className="font-semibold text-center bg-yellow-300 rounded-s"
          placeholder="0"
          type="number"
          value={poblacion_horizonte}
          onChange={handleChange}
        >
        </input> hab.
        {error && (
          <Alert severity="error">{error}</Alert>
        )}
      </p>

      <p className="text-blue-600 dark:text-gray-300">
        Nota: El rango de aplicación de la herramienta es de 1,000 a 50,000 habitantes.
      </p>
      <span className="flex items-center">
        <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-4">2.4. Instalaciones Existentes de Abastecimiento, Alcantarillado y Tratamiento de Aguas Residuales</h3>
        <span className="h-px flex-1 bg-black"></span>
      </span>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
        Se debe recopilar información sobre las características de los sistemas de abastecimiento de agua potable y alcantarillado sanitario existentes en la zona del proyecto.
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-2">
        De manera referencial para el Sistema de Alcantarillado Sanitario se debe recabar la siguiente información:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>- Tipo de alcantarillado existente (Unitario o Combinado)</li>
        <li>- Grado de cobertura actual del sistema de alcantarillado</li>
        <li>- Porcentaje de conexión de las viviendas existentes a la red de alcantarillado</li>
        <li>- Estado de la red de alcantarillado, materiales empleados y su antigüedad</li>
        <li>- Volumen de infiltraciones a la red</li>
        <li>- Conexiones erradas que pueda presentar el alcantarillado</li>
        <li>- Estaciones de bombeo</li>
        <li>- Planos de la infraestructura existente (redes, conexiones domiciliarias, estaciones de bombeo, etc)</li>
      </ul>

      <span className="flex items-center">
        <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6">2.5. Gestión de los sistemas de abastecimiento y saneamiento</h3>
        <span className="h-px flex-1 bg-black"></span>
      </span>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
        Con la finalidad de asegurar la sostenibilidad de la PTAR a lo largo de su vida útil, el proyecto debe contar con la siguiente información:
      </p>
      <ul className="list-disc pl-6 mb-2">
        <li>- Costos de construcción y de operación y mantenimiento de la línea de tratamiento seleccionada.</li>
        <li>- Establecer tarifas/subvenciones que permitan financiar los costos</li>
        <li>- La forma de gestión de los subproductos generados en la PTAR, principalmente los lodos.</li>
        <li>- Establecer la capacidad de gestión, técnica y económica de la EPSA o entidad a cargo de la PTAR.</li>
      </ul>
      <p className="text-blue-600 dark:text-gray-300">
        Nota.- En caso de existir y conocerse el límite de presupuesto del proyecto se constituye en un criterio limitante que debe introducirse a continuación:
      </p>
      <p className="text-gray-600 dark:text-gray-300 font-black mb-2">
        {/*input de presupuesto disponible*/}
        Presupuesto disponible
        <input
          className="font-semibold text-center bg-yellow-300 rounded-s"
          placeholder='0'
          type="number"
          value={presupuesto}
          onChange={(e) => setPresupuesto(e.target.value)}
        >
        </input> Bs.
      </p>
      <span className="flex items-center">
        <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6">2.6. Condicionantes para la selección del terreno en el que se ubicará la PTAR</h3>
        <span className="h-px flex-1 bg-black"></span>
      </span>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
        La selección del terreno en el que se construirá la PTAR constituye un aspecto de suma importancia, dado que una buena elección de la ubicación conlleva a una
        disminución de los costos de inversión y, principalmente, de los costos de operación (en el caso, por ejemplo, de terrenos que permiten que las aguas a tratar
        lleguen por gravedad y/o posibiliten la implantación de tecnologías de carácter extensivo).
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
        Los factores principales que deben considerarse y por tanto recolectar información son:
      </p>
      <ul className="list-disc pl-6 mb-2">
        <li>- Superficie disponible
          <p className="text-gray-600 dark:text-gray-300 font-black mb-2">
            {/*input de area de terreno disponible */}
            Área de terreno Disponible:
            <input
              className="font-semibold text-center bg-yellow-300 rounded-s"
              placeholder='0'
              type="number"
              value={area_terreno}
              onChange={(e) => setArea_terreno(e.target.value)}
            >
            </input> m²
          </p>
        </li>
        <li>- Costos de los terrenos disponibles</li>
        <li>- Distancia de los terrenos elegidos para la PTAR a la red de emisarios existentes</li>
        <li>- Distancia de estos terrenos hasta los posibles puntos de vertido de las aguas tratadas</li>
        <li>- Topografía de la zona de actuación</li>
        <li>- Identificación de las vías de acceso</li>
        <li>- Identificación de los puntos de conexión a la red eléctrica y a la red de abastecimiento de agua potable</li>
        <li>- Características geotécnicas y topográficas </li>
        <li>- Determinación del nivel freático</li>
        <li>- Determinación de los niveles esperados de crecida</li>
        <li>- Afecciones ambientales en el entorno</li>
      </ul>
      <span className="flex items-center">
        <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6">2.7. Condicionantes climáticas y geográficas de la zona de actuación </h3>
        <span className="h-px flex-1 bg-black"></span>
      </span>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
        Las características climáticas de la zona de emplazamiento de la PTAR influyen sobre el comportamiento de las diferentes tecnologías de tratamiento disponibles, y pueden llegar a ser un factor limitante para la implantación de algunas de ellas. Esto justifica la recopilación, con carácter previo, de la información de las características climatológicas de la zona de actuación. La información básica que debe recopilarse a este respecto es la siguiente:
      </p>
      <ul className="list-disc pl-6 mb-2">
        <li>- Temperaturas medias, máximas y mínimas mensuales</li>
        <li>- Precipitación media mensual y anual</li>
        <li>- Horas de sol mensuales</li>
        <li>- Radiación solar incidente</li>
        <li>- Humedad relativa ambiente mensual</li>
        <li>- Evaporación mensual</li>
        <li>- Caracterización de las tormentas (intensidad-duración) y de sus períodos de retorno</li>
        <li>- Altitud y relieve topográfico</li>
      </ul>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">Para el proceso de selección de alternativas, se debe establecer la Zona Ecológica de la implantación de la PTAR.</p>

      <label htmlFor="zonaEcologica" className="text-gray-600 dark:text-gray-300 font-black mb-2">Zona/Piso Ecológico: </label>
      {/*select de zoa/piso ecologico */}
      <select
        id="zonaEcologica"
        name="zonaEcologica"
        className="font-semibold text-center  rounded-s border border-indigo-500 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm mb-4"
        value={zonaEcologica}
        onChange={(e) => setZonaEcologica(e.target.value)}
      >
        <option value="Altiplano">Altiplano</option>
        <option value="Valles">Valles</option>
        <option value="Llanos">Llanos</option>
      </select>
      <span className="flex items-center">
        <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6">2.8. Gestión de las aguas de lluvia</h3>
        <span className="h-px flex-1 bg-black"></span>
      </span>

      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">En sistemas de alcantarillado sanitario combinado, durante la ocurrencia de picos de precipitación las aguas conducidas a la PTAR pueden ocasionar problemas en la operación, dado que se incrementan de forma súbita los caudales de aguas a tratar. Entonces, la correcta gestión de las aguas de lluvia constituye un aspecto de suma importancia a la hora de reducir al máximo el impacto que provocan sobre los medios receptores los caudales en exceso, provocados por las precipitaciones, y que no pueden ser tratados en las PTAR al superarse su capacidad de diseño.</p>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">Las actuaciones ante esta problemática se pueden aplicar en el sistema de alcantarillado sanitario como en el ingreso a la PTAR, a continuación se describen estrategias que pueden adoptarse para el ingreso a la PTAR:</p>
      <ul className="list-disc pl-6 mb-2 text-justify">
        <li className='text-justify mb-2'>- Para instalaciones de tamaño mediano/grande, la obra de llegada a la PTAR debe tener la capacidad de derivar parte de las aguas del influente por el aliviadero (by pass) cuando los caudales de estas aguas superen en 4-6 veces el caudal medio horario de diseño de la PTAR.</li>
        <li className='text-justify mb-2'>- Como alternativa se recomienda dejar pasar un caudal superior al caudal punta en tiempo seco, para evitar el vertido al cauce receptor de una parte importante de sólidos, arenas y grasas. En este caso, se diseña el pretratamiento con capacidad para 5 ó 6 veces el caudal medio y se construye un aliviadero a la salida del mismo, de forma que al tratamiento sólo pase un caudal equivalente al punta en tiempo seco.</li>
        <li className='text-justify mb-2'>- Otras opciones pasan por implantar en cabecera de las PTAR tanques de tormenta, o tanques ecualizadores, que permitan almacenar los caudales excedentes generados en los primeros 20-30 minutos de lluvia para, una vez finalizado el periodo de precipitaciones intensas, proceder al tratamiento paulatino de estas aguas en la PTAR.</li>
      </ul>
      <span className="flex items-center">
        <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6">2.9. Características del agua residual a tratar</h3>
        <span className="h-px flex-1 bg-black"></span>
      </span>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">Para el adecuado dimensionamiento de la PTAR se requiere
        cuantificar los caudales y características de las aguas a tratar, sus oscilaciones diarias y estacionales y sus posibles
        perspectivas de crecimiento.
      </p>
      <h4 className="text-justify mb-2">
        2.9.1 Campaña de aforo y Tomo de muestras
      </h4>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
        Cuando la situación es de implantar una nueva PTAR, y ya se cuenta con el emisario
        (emisarios) que transportará las aguas residuales hasta la futura planta de tratamiento, será
        necesario proceder a la realización de campañas de aforo y toma de muestras,
      </p>
      <p className="text-blue-600 dark:text-gray-300">
        ¡Para la campaña de aforo y toma de muestras recuerde seguir las recomendaciones indicadas en el apartado 4.9.1 de la Guía!
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
        A continuación ingrese los resultados de la campaña realizada:
      </p>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
  <thead className="bg-blue-400 text-white">
    <tr>
      <th className="border border-gray-200 px-4 py-2">DESCRIPCIÓN</th>
      <th className="border border-gray-200 px-4 py-2">UNIDAD</th>
      <th className="border border-gray-200 px-4 py-2">VALOR</th>
      <th className="border border-gray-200 px-4 py-2">VALORES USUALES*</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border border-gray-200 px-4 py-2">Caudal Medio</td>
      <td className="border border-gray-200 px-4 py-2">m3/d</td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        <input
          type="text"
          placeholder="0"
          value={caudalMedio}
          onChange={(e) => setCaudalMedio(e.target.value)}
          className="border border-gray-300 px-2 py-1"
        />
      </td>
      <td className="border border-gray-200 px-4 py-2"></td>
    </tr>
    <tr>
      <td className="border border-gray-200 px-4 py-2">pH</td>
      <td className="border border-gray-200 px-4 py-2">unid. pH</td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        <input
          type="text"
          placeholder="0"
          value={ph}
          onChange={(e) => setPh(e.target.value)}
          className="border border-gray-300 px-2 py-1"
        />
      </td>
      <td className="border border-gray-200 px-4 py-2">6.5 - 8.5</td>
    </tr>
    <tr>
      <td colSpan="4">{getAlertForPh()}</td>
    </tr>
    <tr>
      <td className="border border-gray-200 px-4 py-2">Conductividad</td>
      <td className="border border-gray-200 px-4 py-2">mS/cm</td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        <input
          type="text"
          placeholder="0"
          value={conductividad}
          onChange={(e) => setConductividad(e.target.value)}
          className="border border-gray-300 px-2 py-1"
        />
      </td>
      <td className="border border-gray-200 px-4 py-2">500 - 1,500</td>
    </tr>
    <tr>
      <td colSpan="4">{getAlertForConductividad()}</td>
    </tr>
    <tr>
      <td className="border border-gray-200 px-4 py-2">Temperatura del agua</td>
      <td className="border border-gray-200 px-4 py-2">°C</td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        <input
          type="text"
          placeholder="0"
          value={temperaturaAgua}
          onChange={(e) => setTemperaturaAgua(e.target.value)}
          className="border border-gray-300 px-2 py-1"
        />
      </td>
      <td className="border border-gray-200 px-4 py-2">10 - 30</td>
    </tr>
    <tr>
      <td colSpan="4">{getAlertForTempAgua()}</td>
    </tr>
    <tr>
      <td className="border border-gray-200 px-4 py-2">Aceites y grasas</td>
      <td className="border border-gray-200 px-4 py-2">mg/L</td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        <input
          type="text"
          placeholder="0"
          value={aceitesGrasas}
          onChange={(e) => setAceitesGrasas(e.target.value)}
          className="border border-gray-300 px-2 py-1"
        />
      </td>
      <td className="border border-gray-200 px-4 py-2">100 - 150</td>
    </tr>
    <tr>
      <td colSpan="4">{getAlertForAceitesGrasas()}</td>
    </tr>
    <tr>
      <td className="border border-gray-200 px-4 py-2">Sólidos en Suspensión</td>
      <td className="border border-gray-200 px-4 py-2">mg/L</td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        <input
          type="text"
          placeholder="0"
          value={solidosSuspension}
          onChange={(e) => setSolidosSuspension(e.target.value)}
          className="border border-gray-300 px-2 py-1"
        />
      </td>
      <td className="border border-gray-200 px-4 py-2">100 - 350</td>
    </tr>
    <tr>
      <td colSpan="4">{getAlertForSolidosSuspension()}</td>
    </tr>
    <tr>
      <td className="border border-gray-200 px-4 py-2">DBO5</td>
      <td className="border border-gray-200 px-4 py-2">mg/L</td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        <input
          type="text"
          placeholder="0"
          value={dbo5}
          onChange={(e) => setDbo5(e.target.value)}
          className="border border-gray-300 px-2 py-1"
        />
      </td>
      <td className="border border-gray-200 px-4 py-2">110 - 400</td>
    </tr>
    <tr>
      <td colSpan="4">{getAlertForDbo5()}</td>
    </tr>
    <tr>
      <td className="border border-gray-200 px-4 py-2">DQO</td>
      <td className="border border-gray-200 px-4 py-2">mg/L</td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        <input
          type="text"
          placeholder="0"
          value={dqo}
          onChange={(e) => setDqo(e.target.value)}
          className="border border-gray-300 px-2 py-1"
        />
      </td>
      <td className="border border-gray-200 px-4 py-2">250 - 1000</td>
    </tr>
    <tr>
      <td colSpan="4">{getAlertForDqo()}</td>
    </tr>
    <tr>
      <td className="border border-gray-200 px-4 py-2">NT</td>
      <td className="border border-gray-200 px-4 py-2">mg/L</td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        <input
          type="text"
          placeholder="0"
          value={nt}
          onChange={(e) => setNt(e.target.value)}
          className="border border-gray-300 px-2 py-1"
        />
      </td>
      <td className="border border-gray-200 px-4 py-2">20 - 85</td>
    </tr>
    <tr>
      <td colSpan="4">{getAlertForNt()}</td>
    </tr>
    <tr>
      <td className="border border-gray-200 px-4 py-2">PT</td>
      <td className="border border-gray-200 px-4 py-2">mg/L</td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        <input
          type="text"
          placeholder="0"
          value={pt}
          onChange={(e) => setPt(e.target.value)}
          className="border border-gray-300 px-2 py-1"
        />
      </td>
      <td className="border border-gray-200 px-4 py-2">4 - 15</td>
    </tr>
    <tr>
      <td colSpan="4">{getAlertForPt()}</td>
    </tr>
    <tr>
      <td className="border border-gray-200 px-4 py-2">Coliformes Totales</td>
      <td className="border border-gray-200 px-4 py-2">NMP/100 mL</td>
      <td className="border border-gray-200 px-4 py-2 text-center">
        <input
          type="text"
          placeholder="0"
          value={coliformesTotales}
          onChange={(e) => setColiformesTotales(e.target.value)}
          className="border border-gray-300 px-2 py-1"
        />
      </td>
      <td className="border border-gray-200 px-4 py-2">10^6 - 10^9</td>
    </tr>
    <tr>
      <td colSpan="4">{getAlertForColiformesTotales()}</td>
    </tr>
  </tbody>
</table>

      </div>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
        (*) Valores usuales para aguas residuales urbanas, el límite inferior hace referencia a una contaminación débil y el límite superior a una contaminación fuerte.
      </p>
      <h4 className="text-justify mb-2">
        2.9.2 Estimacion de Caudales y Caracteristicas de las Aguas a Tratar
      </h4>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
        Cuando no sea factible proceder a la realización de campañas de aforo y muestreo
        para la caracterización de las aguas a tratar en la futura PTAR, porque aún no
        existe la red de alcantarillado, o porque no se dispone de medios para ello, puede procederse
        a una estimación de los caudales y de la composición de estas aguas en base a la información
        de las tablas 5.2 y 5.4 del apartado 5.5.1 de la Guía.
      </p>
      {/*aqui va el check para habilitar tablas  */}
      <p className="text-blue-600 dark:text-gray-300 flex items-center">
        ¡En caso de utilizar datos estimados en la Guía, marque la casilla!
        <input
          type="checkbox"
          id="auto-fill"
          className="ml-2 form-checkbox h-4 w-4 text-blue-600 dark:text-gray-300"
          checked={checked}
          onChange={handleCheckboxChange}
        />
      </p>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th scope="col" className="border border-gray-200 px-4 py-2">DESCRIPCIÓN</th>
              <th scope="col" className="border border-gray-200 px-4 py-2">UNIDAD</th>
              <th scope="col" className="border border-gray-200 px-4 py-2">VALOR</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900">
            <tr>
              <td className="border border-gray-200 px-4 py-2">Sólidos en Suspensión</td>
              <td className="border border-gray-200 px-4 py-2">mg/L</td>
              <td className="border border-gray-200 px-4 py-2">
                <input
                  type="text"
                  placeholder="0"
                  className="border border-gray-300 p-1 rounded-md"
                  value={solidosSuspension}
                  onChange={(e) => setSolidosSuspension(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">DBO5</td>
              <td className="border border-gray-200 px-4 py-2">mg/L</td>
              <td className="border border-gray-200 px-4 py-2">
                <input
                  type="text"
                  placeholder="0"
                  className="border border-gray-300 p-1 rounded-md"
                  value={dbo5}
                  onChange={(e) => setDbo5(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">DQO</td>
              <td className="border border-gray-200 px-4 py-2">mg/L</td>
              <td className="border border-gray-200 px-4 py-2">
                <input
                  type="text"
                  placeholder="0"
                  className="border border-gray-300 p-1 rounded-md"
                  value={dqo}
                  onChange={(e) => setDqo(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">NT</td>
              <td className="border border-gray-200 px-4 py-2">mg/L</td>
              <td className="border border-gray-200 px-4 py-2">
                <input
                  type="text"
                  placeholder="0"
                  className="border border-gray-300 p-1 rounded-md"
                  value={nt}
                  onChange={(e) => setNt(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">PT</td>
              <td className="border border-gray-200 px-4 py-2">mg/L</td>
              <td className="border border-gray-200 px-4 py-2">
                <input
                  type="text"
                  placeholder="0"
                  className="border border-gray-300 p-1 rounded-md"
                  value={pt}
                  onChange={(e) => setPt(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Coliformes Totales</td>
              <td className="border border-gray-200 px-4 py-2">NMP/100 mL</td>
              <td className="border border-gray-200 px-4 py-2">
                <input
                  type="text"
                  placeholder="0"
                  className="border border-gray-300 p-1 rounded-md"
                  value={coliformesTotales}
                  onChange={(e) => setColiformesTotales(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Temperatura del agua</td>
              <td className="border border-gray-200 px-4 py-2">°C</td>
              <td className="border border-gray-200 px-4 py-2">
                <input
                  type="text"
                  placeholder="0"
                  className="border border-gray-300 p-1 rounded-md"
                  value={temperaturaAgua}
                  onChange={(e) => setTemperaturaAgua(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Temperatura del aire</td>
              <td className="border border-gray-200 px-4 py-2">°C</td>
              <td className="border border-gray-200 px-4 py-2">
                <input
                  type="text"
                  placeholder="0"
                  className="border border-gray-300 p-1 rounded-md"
                  value={temperaturaAire}
                  onChange={(e) => setTemperaturaAire(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Aporte unitario de aguas residuales</td>
              <td className="border border-gray-200 px-4 py-2">L/hab/d</td>
              <td className="border border-gray-200 px-4 py-2">
                <input
                  type="text"
                  placeholder="0"
                  className="border border-gray-300 p-1 rounded-md"
                  value={aporteAguasResiduales}
                  onChange={(e) => setAporteAguasResiduales(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Caudal Medio</td>
              <td className="border border-gray-200 px-4 py-2">m3/d</td>
              <td className="border border-gray-200 px-4 py-2">
                <input
                  type="text"
                  placeholder="0"
                  className="border border-gray-300 p-1 rounded-md"
                  value={caudalMedio}
                  onChange={(e) => setCaudalMedio(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
        (**) La estimación de las características y caudal de las aguas a tratar se realiza en base a la Población Horizonte del proyecto, la Zona Ecológica y la información establecida en el capítulo 5 de la Guía.
      </p>
      <span className="flex items-center">
        <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6">2.10. Calidad exigida al efluente tratado </h3>
        <span className="h-px flex-1 bg-black"></span>
      </span>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
        Los requisitos exigibles en Bolivia a los efluentes tratados en la PTAR se establecen
        en el Reglamento en Materia de Contaminación Hídrica (RMCH), que reglamenta la Ley de Medio
        Ambiente Nº 1333 de 27 de abril de 1992, en lo referente a la prevención y control de la contaminación
        hídrica en el marco del Desarrollo Sostenible.
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
        Las concentraciones máximas admisibles indicadas en el Anexo 1 del Reglamento en Materia de Contaminación Hídrica se establecen considerando la
        clasificación del cuerpo receptor según su aptitud de uso (Clase A, B, C y D). En caso que la clasificación del cuerpo receptor de la PTAR no
        haya sido definida, se debe cumplir con los límites permisibles indicados en el Anexo 2 del RMCH, mismos que se indican a continuación:
      </p>
      <div className='overflow-x-auto shadow-md sm:rounded-lg mb-2'>
        <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="border border-gray-200 px-4 py-2">Parámetro</th>
              <th className="border border-gray-200 px-4 py-2">DIARIO</th>
              <th className="border border-gray-200 px-4 py-2">MES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Sólidos en suspensión (mg/L)</td>
              <td className="border border-gray-200 px-4 py-2 text-center">60</td>
              <td className="border border-gray-200 px-4 py-2"></td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">DBO5 (mg/L)</td>
              <td className="border border-gray-200 px-4 py-2 text-center">80</td>
              <td className="border border-gray-200 px-4 py-2"></td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">DQO (mg/L)</td>
              <td className="border border-gray-200 px-4 py-2 text-center">250</td>
              <td className="border border-gray-200 px-4 py-2"></td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Amonio (mg N/L)</td>
              <td className="border border-gray-200 px-4 py-2 text-center">4</td>
              <td className="border border-gray-200 px-4 py-2  text-center">2</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Coliformes fecales (NMP/100 ml)</td>
              <td className="border border-gray-200 px-4 py-2 text-center">1000</td>
              <td className="border border-gray-200 px-4 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <span className="flex items-center">
        <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6">2.11. Posible reúso de los efluentes tratados</h3>
        <span className="h-px flex-1 bg-black"></span>
      </span>
      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
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
      <span className="flex items-center">
        <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6">2.12. Seleccion Preliminar</h3>
        <span className="h-px flex-1 bg-black"></span>
      </span>

      <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
        Una vez que se conocen las Líneas de Tratamiento a evaluar y las condiciones locales del sitio donde se emplazará la PTAR,
        se procede con la 'selección preliminar' de tecnologías aplicables de acuerdo a la experiencia y criterio del proyectista.
        Elija aquellas Líneas de Tratamiento que considere apropiadas a la zona de estudio. Como primera aproximación puede considerar
        las tecnologías aplicables según población horizonte y Zona Ecológica en la tabla 11.14 de a guía y detallados en la tabla de la derecha.
      </p>
      <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75" onClick={handleButtonClick}>Lineas Aplicables</button>

      <TablaLineaAplicable
        poblacion_horizonte={poblacion_horizonte}
        zonaEcologica={zonaEcologica}
        open={showTabla}
        onClose={handleClose}
      />
      <Tabla1 />
      <div className="flex justify-center mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleGuardarClick}
        >
          Guardar Valores
        </button>
      </div >
    </div >
  );
};
export default Paso2;
