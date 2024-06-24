import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCheckCircle,
  faFileAlt,
  faBook,
  faCalculator,
  faInfoCircle,
  faSignOutAlt,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../context/Provider";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const SidebarDashboard = ({ isSidebarOpen, toggleSidebar }) => {
  const { outhSession } = useContext(DataContext);
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleOuthSession = () => {
    // Mostrar SweetAlert para confirmación
    swal({
      title: "¿Estás seguro?",
      text: "¿Quieres cerrar sesión?",
      icon: "warning",
      buttons: ["Cancelar", "Cerrar sesión"],
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        // Si el usuario confirma, cerrar sesión
        outhSession();
        navigate("/login");
      }
    });
  };

  return (
    <aside
      className={`w-64 h-screen transition-all duration-300 ${isSidebarOpen ? "" : "-ml-64"
        } bg-gray-900 text-white`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <Link to="/dashboard" className="text-xl font-semibold">
          PTAR
        </Link>
      </div>

      {/* Sidebar Body */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <ul className="space-y-2 font-medium">
          <Link to={"/dashboard"}>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-900 group"
              >
                <FontAwesomeIcon
                  icon={faThLarge}
                  className="w-5 h-5 text-gray-100 transition duration-75 group-hover:text-gray-900"
                />
                <span className="ms-3">Inicio</span>
              </a>
            </li>
          </Link>
          <Link to={"/dashboard/seleccion"}>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-900 group"
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="w-5 h-5 text-gray-100 transition duration-75 group-hover:text-gray-900"
                  />
                  <span className="ms-3">Seleccion</span>
                </a>
              </li>
            </Link>
            <Link to={"/dashboard/reporte"}>
              <li>
                <a
                  href=""
                  className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-900 group"
                >
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    className="w-5 h-5 text-gray-100 transition duration-75 group-hover:text-gray-900"
                  />
                  <span className="ms-3">Reportes</span>
                </a>
              </li>
            </Link>
            <Link to={"/dashboard/biblioteca"}>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-900 group"
                >
                  <FontAwesomeIcon
                    icon={faBook}
                    className="w-5 h-5 text-gray-100 transition duration-75 group-hover:text-gray-900"
                  />
                  <span className="ms-3">Biblioteca</span>
                </a>
              </li>
            </Link>
            <Link to={"/dashboard/calc"}>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-900 group"
                >
                  <FontAwesomeIcon
                    icon={faCalculator}
                    className="w-5 h-5 text-gray-100 transition duration-75 group-hover:text-gray-900"
                  />
                  <span className="ms-3">Calculadora</span>
                </a>
              </li>
            </Link>
          <Link to={"/dashboard/acercade"}>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-900 group"
                >
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="w-5 h-5 text-gray-100 transition duration-75 group-hover:text-gray-900"
                  />
                  <span className="ms-3">Acerca De</span>
                </a>
              </li>
            </Link>
        </ul>

        {/* Logout Button */}
        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-300">
          {/* Opción para cerrar sesión */}
          <li onClick={handleOuthSession}>
            <a className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-900 group">
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="w-5 h-5 text-gray-100 transition duration-75 group-hover:text-gray-900"
              />
              <span className="ms-3">Cerrar Sesión</span>
            </a>
          </li>
        </ul>

      </div>
    </aside>
  );
};

export default SidebarDashboard;



/**
 *  <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon icon={faThLarge} className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Inicio</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Seleccion</span>
              </a>
            </li>
            <Link to={"/dashboard/formulariopdf"} >
              <li>
                <a
                  href=""
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Reportes</span>
                </a>
              </li>
            </Link>
            <Link to={"/dashboard/biblioteca"}>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={faBook} className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Biblioteca</span>
                </a>
              </li>

            </Link>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FontAwesomeIcon icon={faCalculator} className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Calculadora</span>
              </a>
            </li>
            <Link to={"/dashboard/acercade"} >
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Acerca De</span>
                </a>
              </li>
            </Link>
 */
