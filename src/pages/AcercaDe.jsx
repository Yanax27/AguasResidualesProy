import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function ContactCard({ name, email }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-4">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="flex items-center text-gray-700 dark:text-gray-300">
        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
        <a href={`mailto:${email}`}>{email}</a>
      </p>
    </div>
  );
}

function AcercaDe() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Herramienta para la selección y diseño de líneas de tratamiento de aguas residuales.
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-justify">
          La presente herramienta fue desarrollada para un proyecto de grado titulado “Creación de
          una página web basada en la guía técnica para selección y diseño de líneas de tratamiento
          de aguas residuales. Aplicación practica: Comunidad de Yunchara” por el estudiante Jose
          Alex Rojas Rodríguez, presentado a consideración de la UNIVERSIDAD AUTÓNOMA
          “JUAN MISAEL SARACHO”, como requisito para optar al grado académico de
          Licenciatura en Ingeniería Civil.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify">
          Dicho proyecto de grado tiene como objetivo general diseñar y desarrollar una plataforma
          web interactiva basada en una guía de selección de plantas de tratamiento de aguas
          residuales, con el propósito de proporcionar a profesionales del campo de la ingeniería civil
          y a técnicos especializados una herramienta integral que facilite la selección de sistemas de
          tratamiento de aguas residuales, contribuyendo así a la gestión sostenible de recursos
          hídricos y a la preservación del medio ambiente.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Objetivos Especícos</h2>
        <p className="text-gray-700 dark:text-gray-300 text-justify">
          • Crear una interfaz de usuario que sea fácil de navegar y que proporcione acceso
          intuitivo a la guía y herramientas de selección, garantizando una experiencia
          positiva para los usuarios.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify">
          • Conducir pruebas exhaustivas para verificar la funcionalidad y precisión de la
          plataforma, corrigiendo cualquier error o anomalía identificada durante las pruebas.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify">
          • Implementar calculadoras, formularios y otras herramientas interactivas que
          permitan a los usuarios ingresar datos específicos y recibir recomendaciones
          personalizadas.
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-justify">
          • Seleccionar una plataforma de alojamiento y configurar un dominio para que la
          plataforma esté disponible públicamente y accesible para los usuarios objetivo.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Términos y uso</h2>
        <p className="text-gray-700 dark:text-gray-300 text-justify">
          Una cantidad considerable de tiempo y esfuerzo fueron invertidos en el desarrollo de esta
          herramienta, la cual también fue debidamente probada con datos reales para su posterior
          publicación. Sin embargo, el desarrollador hace conocer que la precisión y el buen uso de
          esta herramienta dependerá del conocimiento previo del usuario referido al tema de plantas
          de agua residual. La herramienta debe usarse en conjunto con la Guía de Selección y el
          Diseño de Líneas de Tratamiento de Aguas Residuales, publicada por el Ministerio de
          Medio Ambiente y Agua."
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-1">Contacto</h2>
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ContactCard name="Sr. Jose Alex Rojas Rodriguez" email="alexitusrojaz@gmail.com" />
          </div>
        </div>

      </section>
    </div>
  );
}

export default AcercaDe;

