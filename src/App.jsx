import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DataContext } from "./context/Provider";
import { Dashboard } from "./layouts/Dashboard";
import AcercaDe from "./pages/AcercaDe";
import Login from "./pages/Login";
import Signup from "./pages/Singup";
import NotFound from "./pages/NotFound";
import FormularioPDF from "./components/FormularioPdf";
import Biblioteca from "./pages/Biblioteca";
import Seleccion from "./pages/Seleccion";
import Calculadora from "./pages/Calculadora";
import Reportes from "./pages/Reportes";
import DetalleReporte from "./components/DetalleReporte";


function App() {
  const {
    authUser,
    setDataAuth,
    setIsLoggedIn,
    isLoggedIn,
    validToken,
    setValidToken,
  } = useContext(DataContext);

  const ValidateRedir = ({ auth, validate, redirecTo, children }) => {
    if (auth && validate) {
      return <Navigate to={redirecTo} />;
    }
    if (!auth) return children;
  };

  const ProtectedRoute = ({ auth, validate, children }) => {
    if (auth && validate) {
      return children;
    }
    return <Navigate to={"/"} />;
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ValidateRedir
              auth={authUser.user}
              validate={validToken}
              redirecTo="/dashboard"
            >
              <Login />
            </ValidateRedir>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute auth={isLoggedIn} validate={validToken}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="seleccion" element={<Seleccion />} />
          <Route path="public" element={<FormularioPDF />} />
          <Route path="biblioteca" element={<Biblioteca />} />
          <Route path="acercade" element={<AcercaDe />} />
          <Route path="calc" element={<Calculadora />}/>
          <Route path="reporte" element={<Reportes />}/>
          <Route path="detalle-reporte/:id" element={<DetalleReporte />}/>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Singup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
