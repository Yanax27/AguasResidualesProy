import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [authUser, setAuth] = useState({
    user: null
  });
  const [uid, setUid] = useState(""); // Agregar estado para almacenar el UID del usuario

  useEffect(() => {
    const uidFromStorage = localStorage.getItem("uid");
    if (uidFromStorage) {
      setUid(uidFromStorage); 
    }
   // console.log("SE INICIA EL PROVIDER:"+ uid)
  }, [uid]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [validToken, setValidToken] = useState(false);

  const setDataAuth = (data) => {
    setAuth({
      ...authUser,
      user: data,
    });
   // console.log("Provider uid: "+uid)
  };

  const outhSession = async () => {
    // Reiniciar estados
    setUid("");
    setValidToken(false);
    setIsLoggedIn(false);
    setDataAuth(null); 
  
    // Limpiar el UID de localStorage
    localStorage.removeItem("uid");
  
    // Limpiar todos los valores guardados en localStorage
    const keysToRemove = [
      'poblacion_horizonte',
      'presupuesto',
      'area_terreno',
      'zonaEcologica',
      'solidosSuspension',
      'dbo5',
      'dqo',
      'nt',
      'pt',
      'coliformesTotales',
      'temperaturaAgua',
      'temperaturaAire',
      'aporteAguasResiduales',
      'caudalMedio',
      'ph',
      'conductividad',
      'aceitesGrasas',
      'selectedLines',
      'criteriosSeleccionados'
    ];
  
    keysToRemove.forEach(key => localStorage.removeItem(key));
  };

  const STATES_MODIFIC = {
    authUser,
    setDataAuth,
    isLoggedIn,
    setIsLoggedIn,
    validToken,
    setValidToken,
    outhSession,
    uid, // Agregar el UID del usuario al objeto de estado compartido
  };

  return (
    <DataContext.Provider value={STATES_MODIFIC}>
      {children}
    </DataContext.Provider>
  );
};
