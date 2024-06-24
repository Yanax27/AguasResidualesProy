import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const CardPdf = ({ documento }) => {
  // Truncate the PDF name if it's longer than 30 characters
  const truncateName = (name) => {
    return name.length > 30 ? name.substring(0, 30) + '...' : name;
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-6">
      <div className="relative flex flex-col break-words min-w-0 bg-clip-border rounded-lg border border-dashed border-gray-200 bg-white overflow-hidden hover:shadow-xl transition duration-300">
        <a href={documento.pdf} target="_blank" rel="noopener noreferrer">
          <div className="flex items-center justify-center h-40 bg-gray-200">
            <FontAwesomeIcon icon={faFilePdf} className="text-5xl text-red-500" title="Abrir PDF" />
          </div>
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base">Nombre: {truncateName(documento.fileName)}</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default CardPdf;

