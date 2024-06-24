import React from "react";
import fondo from "../assets/fondo1.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-900 to-blue-900 h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={
            "https://img.freepik.com/fotos-premium/planta-tratamiento-aguas-residuales-o-centro-reciclaje-agua_1048944-6663549.jpg?w=740"
          }
          alt="Background Image"
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-5xl font-bold leading-tight mb-4">
          Bienvenido a la Herramienta de Selección de Lineas de Tratamiento de Aguas Residuales
        </h1>
        <p className="text-lg text-gray-300 mb-8">
         Comienza a utilizar la Herramienta de Selección.
        </p>
       
        <Link to={"/dashboard/seleccion"}>
          <a
          href="#"
          className="bg-green-700 text-white-900 hover:bg-green-600 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          Iniciar Selección
        </a>
        </Link>
        <p className="text-lg text-gray-200 mb-8">
        <b></b>
        <b></b>
         <b>¡Para el uso eficaz y eficiente de la presente herramienta, es necesario tener previo
           conocimiento de la "guia tecnica de seleccion de lineas de tratamiento de agua residual!</b>
        </p>
      </div>
    </div>
  );
};
export default LandingPage;
