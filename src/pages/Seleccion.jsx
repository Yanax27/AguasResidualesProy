import React, { useState } from 'react';
import Paso1 from '../components/Paso1';
import Paso2 from '../components/Paso2';
import Paso3 from '../components/Paso3';
import Paso4 from '../components/Paso4';
import Paso5 from '../components/Paso5';
import Paso6 from '../components/Paso6';
import Paso7 from '../components/Paso7';
import Paso8 from '../components/Paso8';
import Paso9 from '../components/Paso9';

const Seleccion = () => {
  const [progress, setProgress] = useState(11.11); // Inicializamos el progreso en 11.11%
  const [selectedPill, setSelectedPill] = useState(1); // Inicializamos el pill seleccionado en 1

  // Títulos de los pills
  const pillTitles = [
    'CONOCIMIENTO TÉCNICO',
    'ESTUDIOS PREVIOS',
    'CRITERIOS DE SELECCIÓN',
    'CRITERIOS LIMITANTES',
    'ELIMINACION DE TRATAMIENTOS',
    'PONDERACION DE LOS CRITERIOS DE SELECCIÓN',
    'VALORACION DE CADA ALTERNATIVA',
    'MATRIZ DE DECISIÓN',
    'SELECCIÓN FINAL'
  ];

  // Función para manejar el cambio de pill
  const handlePillChange = (pillNumber) => {
    setSelectedPill(pillNumber);
    setProgress((pillNumber / 9) * 100); // Calculamos el progreso basado en el número de pill seleccionado
  };

  const handlePrevious = () => {
    if (selectedPill > 1) {
      handlePillChange(selectedPill - 1);
    }
  };

  const handleNext = () => {
    if (selectedPill < pillTitles.length) {
      handlePillChange(selectedPill + 1);
    }
  };

  return (
    <div className='mb-8 mr-2'>
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-2 ">
        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Pills  */}
      <div className="flex justify-center mb-0.5 shadow border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        {pillTitles.map((title, index) => (
          <button
            key={index}
            className={`mx-1 my-2 px-2 py-2 rounded-md border ${selectedPill === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
            onClick={() => handlePillChange(index + 1)}
          >
            <div className="text-center">
              <div>{index + 1}</div>
              <div className="text-xs">{title}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Contenedor de componentes */}
      <div>
        {/* Aquí podrías renderizar el componente correspondiente al pill seleccionado */}
        {selectedPill === 1 && <Paso1 />}
        {selectedPill === 2 && <Paso2 />}
        {selectedPill === 3 && <Paso3 />}
        {selectedPill === 4 && <Paso4 />}
        {selectedPill === 5 && <Paso5 />}
        {selectedPill === 6 && <Paso6 />}
        {selectedPill === 7 && <Paso7 />}
        {selectedPill === 8 && <Paso8 />}
        {selectedPill === 9 && <Paso9 />}
        {/* Agrega más condiciones para renderizar otros componentes según el pill seleccionado */}
      </div>

      {/* Botones de navegación */}
      <div className="flex justify-center mt-4">
        <button onClick={handlePrevious} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Anterior</button>
        <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Siguiente</button>
      </div>
    </div>
  );
};

export default Seleccion;
