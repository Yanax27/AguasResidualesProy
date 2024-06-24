import { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/Provider";
import { db } from "../data/FireBase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import '../styles/Dashboard.css'

const NavbarDashboard = ({ toggleSidebar, isSidebarOpen }) => {
  const [menuProfile, setMenuProfile] = useState(false);
  const [userName, setUserName] = useState("");
  const uid = localStorage.getItem('uid');
  const { outhSession } = useContext(DataContext);
  const navigate = useNavigate();

  const handleOuthSession = () => {
    swal({
      title: "¿Estás seguro?",
      text: "¿Quieres cerrar sesión?",
      icon: "warning",
      buttons: ["Cancelar", "Cerrar sesión"],
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        outhSession();
        navigate("/login");
      }
    });
  };

  useEffect(() => {

    const fetchUserName = async () => {
      if (uid) {
        try {
          const usersRef = collection(db, "usuarios");
          const q = query(usersRef, where("Uid", "==", uid));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUserName(doc.data().Nombre);
          });
        } catch (error) {
          console.error("Error obteniendo documentos: ", error);
        }
      }
    };

    //console.log("INICIA EL NAVBAR: " + userName + " ; " + uid);
    fetchUserName();
  }, [uid, userName]);

  return (
    <nav className="fondo-nav bg-white-800 margin border border-b-gray-300">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-0">
        <div className="relative flex h-16 items-center justify-end">
          <button
            onClick={toggleSidebar}
            type="button"
            className="text-gray-500 border-r bg-gray-200 border-gray-300 px-4 focus:outline-none focus:bg-gray-300 hover:bg-gray-300 rounded-l"
          >
            {/* Cambio del icono dependiendo de si el sidebar está abierto o cerrado */}
            {isSidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            ) : (

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          <div className="ml-auto">
            <div className="flex items-center">
              <span className="text-gray-900 mr-2">Usuario:{" " + userName}</span>
              <button
                type="button"
                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                onClick={() => setMenuProfile(!menuProfile)}
              >

                <FontAwesomeIcon icon={faUser} className="text-white w-auto h-4 rounded-full px-1.5 py-1" />
              </button>
            </div>

            {menuProfile && (
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                <p href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Perfil</p>
                <p href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Configuración</p>
                <p onClick={handleOuthSession} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Cerrar Sesión</p>
              </div>
            )}
          </div>

        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link to={"/dashboard"}>
            <a
              href="#"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </a>
          </Link>
          <Link to={"/dashboard/biblioteca"}>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Biblioteca
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
