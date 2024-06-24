import { db } from "./FireBase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const conexion = collection(db, "PDF");

export async function InsertarPDF(p) {
  try {
    const data = await addDoc(conexion, p);
    const id = data.id;
    return id;
  } catch (error) {
    console.log(error);
  }
}

export async function SubirPDFStorage(id, file) {
  const storage = getStorage();
  const nombre = ref(storage, `PDF/${id}.pdf`);
  await uploadBytes(nombre, file);
  const url = await getDownloadURL(nombre);
  console.log(url);
  return url;
}

export async function EditarUrlPDF(id, url, fileName) {
  await updateDoc(doc(db, "PDF", id), { pdf: url, fileName: fileName });
}