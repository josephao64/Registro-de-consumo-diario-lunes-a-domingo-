// Carga SDKs Firebase v9 (modular) desde CDN
import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import {
  getFirestore, collection, addDoc, serverTimestamp,
  getDocs, query, orderBy
} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

// ---- Configuración de TU proyecto ----
const firebaseConfig = {
  apiKey: "AIzaSyDrgMmtjCTNtVRdv2uO-_T6YGWABfvXxoo",
  authDomain: "formm-4e355.firebaseapp.com",
  projectId: "formm-4e355",
  storageBucket: "formm-4e355.firebasestorage.app",
  messagingSenderId: "523001700745",
  appId: "1:523001700745:web:a966cdd10a2929d12cc158"
};

// Inicializa (o reutiliza) la app y Firestore
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Helpers Firestore para que app.js los use sin reescribir lógica
export async function saveConsumption(payload) {
  const docData = { ...payload, created_at: serverTimestamp(), source: 'web-consumo-diario' };
  await addDoc(collection(db, 'consumos_semanales'), docData);
}

export async function fetchConsumptions() {
  const q = query(collection(db, 'consumos_semanales'), orderBy('created_at', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ _id: d.id, ...d.data() }));
}
