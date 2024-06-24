// src/services/firestoreService.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/FireBase"; // Asegúrate de tener configurado Firebase en tu proyecto

// Función genérica para obtener datos de cualquier colección
const getCollectionData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}: `, error);
    throw error;
  }
};

// Funciones específicas para cada colección
export const getDataAltiplano = async () => getCollectionData("data_altiplano");
export const getDataValles = async () => getCollectionData("data_valles");
export const getDataLlanos = async () => getCollectionData("data_llanos");
export const getTemperatura = async () => getCollectionData("temperatura");
