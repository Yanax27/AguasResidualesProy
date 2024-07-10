import React, { useState } from 'react';
import LineaAplicable from '../data/LineaAplicable.json';
import DataEficienciaRemocion from '../data/DataEficienciaRemocion.json';

const Calculadora = () => {
  const [poblacionHorizonte, setPoblacionHorizonte] = useState('');
  const [zonaEcologica, setZonaEcologica] = useState('');
  const [solidosSuspension, setSolidosSuspension] = useState('');
  const [dbo5, setDbo5] = useState('');
  const [dqo, setDqo] = useState('');
  const [open, setOpen] = useState(false);

  const ss = 60.0;
  const dbo5Constant = 80.0;
  const dqoConstant = 250.0;

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

  const checkCompliance = (value, target) => {
    return parseFloat(value) >= parseFloat(target) - 5 && parseFloat(value) <= parseFloat(target) + 5;
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
            Sólidos en suspensión:
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
        <div className="mb-4">
          <label htmlFor="dbo5" className="block text-gray-700 dark:text-gray-300 font-semibold">
            DBO5:
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
        <div className="mb-4">
          <label htmlFor="dqo" className="block text-gray-700 dark:text-gray-300 font-semibold">
            DQO:
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

          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
              <thead className="bg-green-400 text-white">
                <tr>
                  <th className="border border-gray-200 px-4 py-2">Línea de tratamiento</th>
                  <th className="border border-gray-200 px-4 py-2">SS (%)</th>
                  <th className="border border-gray-200 px-4 py-2">DBO5 (%)</th>
                  <th className="border border-gray-200 px-4 py-2">DQO (%)</th>
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
