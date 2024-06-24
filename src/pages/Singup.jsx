import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";
import { auth, db } from "../data/FireBase";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    addDoc,
    updateDoc,
  } from "firebase/firestore";
  import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [button, setButton] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });
const navigate = useNavigate();
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      setButton(true);
      const { correo, password, nombre } = data;
      // Registrar usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        correo,
        password
      );
      const user = userCredential.user;
      // Agregar detalles del usuario a la colección /usuarios en Firestore
      await addDoc(collection(db, "usuarios"), {
        Correo:correo,
        Nombre: nombre,
        Uid: user.uid,
      });
      setButton(false);
      reset(); // Limpiar el formulario
      toast.success("Usuario registrado correctamente");
      swal({
        icon: 'success',
        title: 'Exitoso',
        text: 'Registro Exitoso',
      }).then(()=>{navigate("/login")});
     
    } catch (error) {
      setButton(false);
      console.error(error);
      toast.error("Error al registrar usuario");
      swal({
        icon: 'error',
        title: 'Error',
        text: 'Correo o contraseña invalidos',
      });
    }
  };

  return (
    <section className="back-img-login w-full bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="mb-3 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Registrarse
        </h1>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
              Crear una cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="nombre"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Juan Pérez"
                  {...register("nombre", {
                    required: "Nombre es requerido",
                    minLength: {
                      value: 2,
                      message: "Nombre debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message: "Nombre debe tener máximo 50 caracteres",
                    },
                  })}
                />
                {errors.nombre && (
                  <Alert severity="error">{errors.nombre.message}</Alert>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Correo
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="juan@gmail.com"
                  {...register("correo", {
                    required: "Correo es requerido",
                    minLength: {
                      value: 4,
                      message: "Correo debe tener al menos 4 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message: "Correo debe tener máximo 50 caracteres",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Ingrese un correo válido",
                    },
                  })}
                />
                {errors.correo && (
                  <Alert severity="error">{errors.correo.message}</Alert>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <div className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("password", {
                      required: "Password es requerido",
                      minLength: {
                        value: 4,
                        message: "Password debe tener al menos 4 caracteres",
                      },
                      maxLength: {
                        value: 30,
                        message: "Password debe tener máximo 30 caracteres",
                      },
                    })}
                  />
                  <span
                    className="cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>
              </div>
              {errors.password && (
                <Alert severity="error">{errors.password.message}</Alert>
              )}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Registrarse
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
               ¿Ya tienes una cuenta?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Inicia Sesion
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
