import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LineaAplicable from '../data/LineaAplicable.json';

const TablaLineaAplicable = ({ poblacion_horizonte, zonaEcologica, open, onClose }) => {
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
    poblacion_horizonte >= line.rangoInferior && 
    poblacion_horizonte <= line.rangoSuperior && 
    line.zonaEcologica.includes(zonaInicial)
  );
  //*console.log(applicableLines)

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      autoHideDuration={null}
      onClose={onClose}
      message={
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
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
      }
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

TablaLineaAplicable.propTypes = {
  poblacion_horizonte: PropTypes.number.isRequired,
  zonaEcologica: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default TablaLineaAplicable;