import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { InsertarPDF, SubirPDFStorage, EditarUrlPDF } from "../data/AddPdf";

const FormularioPDF = () => {
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState(null);
  const [estadoImg, setEstadoImg] = useState(false);
  const [fileName, setFileName] = useState(""); // Nuevo estado para el nombre del archivo
  const ref = useRef(null);

  const subirPDFStorage = (e) => {
    const pdfFile = e.target.files[0];
    setFile(pdfFile);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(pdfFile);
    fileReader.onload = () => {
      setFileUrl(fileReader.result);
    };
    setFileName(pdfFile.name); // Establecer el nombre del archivo seleccionado
  };

  const abrirSeleccionadorPDF = () => {
    ref.current.click();
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setEstadoImg(false);
  
    const id = await InsertarPDF({ ...data, fileName }); // Pasar el nombre del archivo al método InsertarPDF
    const pdfUrl = await SubirPDFStorage(id, file);
  
    await EditarUrlPDF(id, pdfUrl, fileName); // Pasar el nombre del archivo al método EditarUrlPDF
  
    setLoading(false);
    setFileUrl("");
    setFileName("");
    swal({
      title: "PDF Insertado",
      text: "El PDF se ha cargado correctamente.",
      icon: "success",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto mt-8 p-4 bg-white rounded shadow-md"
    >
      <input
        type="file"
        className="hidden"
        ref={ref}
        onChange={subirPDFStorage}
      />
      <button
        type="button"
        onClick={abrirSeleccionadorPDF}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Seleccionar PDF
      </button>
      {fileUrl && <p className="mt-2">PDF Seleccionado: {fileName}</p>}
      {estadoImg && (
        <p className="text-red-500 mt-2">Por favor, selecciona un PDF.</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Cargar PDF
      </button>
    </form>
  );
};

export default FormularioPDF;
