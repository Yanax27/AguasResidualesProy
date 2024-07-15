import React, { useState } from 'react';
import LineaAplicable from '../data/LineaAplicable.json';
import DataEficienciaRemocion from '../data/DataEficienciaRemocion.json';
import { Alert } from '@mui/material';

const Calculadora = () => {
  const [poblacionHorizonte, setPoblacionHorizonte] = useState('');
  const [zonaEcologica, setZonaEcologica] = useState('');
  const [solidosSuspension, setSolidosSuspension] = useState('');
  const [dbo5, setDbo5] = useState('');
  const [dqo, setDqo] = useState('');
  const [nt, setNt] = useState('');
  const [pt, setPt] = useState('');
  const [coliformes, setColiformes] = useState('');
  const [open, setOpen] = useState(false);

  const ss = 60.0;
  const dbo5Constant = 80.0;
  const dqoConstant = 250.0;

  const ss1 = 100;
  const dbo1 = 30;
  const dqo1 = 60;
  const nt1 = 12;
  const pt1 = 1;
  const coliformes1 = 5000;


  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  // Mapeo de zona ecológica completa a su inicial
  const zonaMap = {
    Altiplano: 'A',
    Valles: 'V',
    Llanos: 'LL'
  };

  // Convertir la zona ecológica proporcionada a su inicial correspondiente
  const zonaInicial = zonaMap[zonaEcologica] || '';

  // Filtrar las líneas de tratamiento basadas en las condiciones proporcionadas
  const applicableLines = LineaAplicable.filter(line =>
    poblacionHorizonte >= line.rangoInferior &&
    poblacionHorizonte <= line.rangoSuperior &&
    line.zonaEcologica.includes(zonaInicial)
  );

  // Filtrar los datos de eficiencia de remoción que coinciden con las líneas aplicables
  const applicableEficiencia = DataEficienciaRemocion.filter(line =>
    applicableLines.some(applicableLine => applicableLine.lineaTratamiento === line.linea_tratamiento)
  );

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

  const checkCompliance = (value, target) => {
    return parseFloat(value) >= parseFloat(target) - 5 && parseFloat(value) <= parseFloat(target) + 5;
  };

  //Generacion de alertas para parametros
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
//Para solidos en suspension
const getAlertForPoblacionHorizonte = () => {
  const poblacionHorizonteValue = parseFloat(poblacionHorizonte);
  if (isNaN(poblacionHorizonteValue)) {
    return null;
  }

  if (poblacionHorizonteValue <= 50000 && poblacionHorizonteValue>=1000) {
    return (
      <Alert severity="success">
       El rango de aplicación es correcto entre 1,000 a 50,000 habitantes
      </Alert>
    );
  }
  if (poblacionHorizonteValue > 50000 || poblacionHorizonteValue<1000) {
    return (
      <Alert severity="warning">
       El rango de aplicación no es válido, debe ser entre 1,000 a 50,000 habitantes
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

//para coliformes totales
const getAlertForColiformesTotales = () => {
  const coliformesValue = parseFloat(coliformes);
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

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 dadrk:text-white mb-4">
        Calculadora de Línea de Tratamiento
      </h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="poblacionHorizonte" className="block text-gray-700 dark:text-gray-300 font-semibold">
            Población Horizonte:
          </label>
          <input
            type="number"
            id="poblacionHorizonte"
            placeholder="Ingresa poblacion horizonte"
            value={poblacionHorizonte}
            onChange={(e) => setPoblacionHorizonte(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {getAlertForPoblacionHorizonte()}
        <div className="mb-4">
          <label htmlFor="zonaEcologica" className="block text-gray-700 dark:text-gray-300 font-semibold">
            Zona Ecológica:
          </label>
          <select
            id="zonaEcologica"
            value={zonaEcologica}
            onChange={(e) => setZonaEcologica(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="Altiplano">Altiplano</option>
            <option value="Valles">Valles</option>
            <option value="Llanos">Llanos</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="solidosSuspension" className="block text-gray-700 dark:text-gray-300 font-semibold">
            Sólidos en suspensión:  valores usuales (100 - 350) mg/L
          </label>
          <input
            type="number"
            id="solidosSuspension"
            value={solidosSuspension}
            placeholder="Ingresa solidos en suspensión"
            onChange={(e) => setSolidosSuspension(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {getAlertForSolidosSuspension()}
        <div className="mb-4">
          <label htmlFor="dbo5" className="block text-gray-700 dark:text-gray-300 font-semibold">
            DBO5:  valores usuales (110 - 400) mg/L
          </label>
          <input
            type="number"
            id="dbo5"
            value={dbo5}
            placeholder="Ingresa DBO5"
            onChange={(e) => setDbo5(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {getAlertForDbo5()}
        <div className="mb-4">
          <label htmlFor="dqo" className="block text-gray-700 dark:text-gray-300 font-semibold">
            DQO:  valores usuales (250 - 1000) mg/L
          </label>
          <input
            type="number"
            id="dqo"
            value={dqo}
            placeholder="Ingresa DQO"
            onChange={(e) => setDqo(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {getAlertForDqo()}
        <div className="mb-4">
          <label htmlFor="coliformes" className="block text-gray-700 dark:text-gray-300 font-semibold">
            Coliformes:  valores usuales (10^6 - 10^9) mg/L
          </label>
          <input
            type="number"
            id="coliformes"
            value={coliformes}
            placeholder="Ingresa coliformes"
            onChange={(e) => setColiformes(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {getAlertForColiformesTotales()}
        <div className="mb-4">
          <label htmlFor="nt" className="block text-gray-700 dark:text-gray-300 font-semibold">
            NT:  valores usuales (20 - 85) mg/L
          </label>
          <input
            type="number"
            id="nt"
            value={nt}
            placeholder="Ingresa NT"
            onChange={(e) => setNt(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {getAlertForNt()}
        <div className="mb-4">
          <label htmlFor="pt" className="block text-gray-700 dark:text-gray-300 font-semibold">
            PT:  valores usuales(4 - 15) mg/L
          </label>
          <input
            type="number"
            id="pt"
            value={pt}
            placeholder="Ingresa PT"
            onChange={(e) => setPt(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {getAlertForPt()}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Calcular
        </button>
      </form>

      {open && (
        <div>
          <div className="overflow-x-auto shadow-md sm:rounded-lg mb-4">
            <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
              <thead className="bg-blue-400 text-white">
                <tr>
                  <th className="border border-gray-200 px-4 py-2">Línea de tratamiento</th>
                  <th className="border border-gray-200 px-4 py-2">Rango (habitantes)</th>
                  <th className="border border-gray-200 px-4 py-2">Zona ecológica</th>
                  <th className="border border-gray-200 px-4 py-2">Línea de Agua</th>
                  <th className="border border-gray-200 px-4 py-2">Línea de Lodos</th>
                </tr>
              </thead>
              <tbody>
                {applicableLines.length > 0 ? (
                  applicableLines.map(line => (
                    <tr key={line.id}>
                      <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">{line.lineaTratamiento}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">{line.rangoInferior} - {line.rangoSuperior}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">{line.zonaEcologica.join(", ")}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">{line.lineaAgua}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">{line.lineaLodos}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200" colSpan="5">
                      No hay líneas de tratamiento aplicables.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        
          <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6 text-center">Anexo-1</h3>

          <div className="overflow-x-auto shadow-md sm:rounded-lg mt-4 mb-4 max-w-md mx-auto">
            <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
              <thead className="bg-red-400 text-white">
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
                  <td className="px-2 py-2 text-sm text-gray-500 border border-gray-200">{ss1Porcentaje}%</td>
                </tr>
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
          <h3 className=" text-lg font-semibold text-gray-800 dark:text-white pr-6 text-center" >Anexo-2</h3>
          <div className="overflow-x-auto shadow-md sm:rounded-lg mt-4 mb-4 max-w-md mx-auto">
            <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
              <thead className="bg-red-400 text-white">
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
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto shadow-md sm:rounded-lg mb-4">
            <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
              <thead className="bg-green-400 text-white">
                <tr>
                  <th className="border border-gray-200 px-4 py-2">Línea de tratamiento</th>
                  <th className="border border-gray-200 px-4 py-2">SS (%)</th>
                  <th className="border border-gray-200 px-4 py-2">DBO5 (%)</th>
                  <th className="border border-gray-200 px-4 py-2">DQO (%)</th>
                  <th className="border border-gray-200 px-4 py-2">NT (%)</th>
                  <th className="border border-gray-200 px-4 py-2">PT (%)</th>
                  <th className="border border-gray-200 px-4 py-2">Coliformes (%)</th>
                </tr>
              </thead>
              <tbody>
                {applicableEficiencia.length > 0 ? (
                  applicableEficiencia.map(line => (
                    <tr key={line.id} className={checkCompliance(ssPorcentaje, line.SS.split(" ")[0]) && checkCompliance(dbo5Porcentaje, line.DBO5.split(" ")[0]) && checkCompliance(dqoPorcentaje, line.DQO.split(" ")[0]) ? 'bg-green-100' : ''}>
                      <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">{line.linea_tratamiento}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200 text-center">{line.SS}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200 text-center">{line.DBO5}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200 text-center">{line.DQO}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200 text-center">{line.NT}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200 text-center">{line.PT}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200 text-center">{line.Coliformes_fecales}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200" colSpan="4">
                      No hay datos de eficiencia de remoción aplicables.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
};

export default Calculadora;
