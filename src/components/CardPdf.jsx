import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const CardPdf = ({ documento }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
      <div className="relative flex flex-col break-words min-w-0 bg-clip-border rounded-lg border border-dashed border-gray-200 bg-white overflow-hidden hover:shadow-xl transition duration-300">
        <a href={documento.pdf} target="_blank" rel="noopener noreferrer">
          <div className="flex items-center justify-center h-40 bg-gray-200">
            <FontAwesomeIcon icon={faFilePdf} className="text-5xl text-red-500" title="Abrir PDF" />
          </div>
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base">Nombre: {documento.fileName}</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default CardPdf;
