import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig.js';
import mostrarLogin from './login.js'; // ✅ Import necesario
import '../style.css'; // ✅ Estilos globales

export default function mostrarRegistro() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="registro-container">
      <div class="registro-box">
        <h2>Registro</h2>
        <input type="text" id="nombre" placeholder="Nombre" />
        <input type="email" id="correo" placeholder="Correo electrónico" />
        <input type="password" id="contrasena" placeholder="Contraseña" />
        <input type="text" id="fecha" placeholder="Fecha de nacimiento" />
        <input type="tel" id="telefono" placeholder="Teléfono" />
        <button id="btnRegistro">Registrarse</button>
      </div>
    </div>
  `;

  document.getElementById("btnRegistro").addEventListener("click", async () => {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const fecha = document.getElementById("fecha").value;
    const telefono = document.getElementById("telefono").value;
    let ganados = 0;
    let perdidos = 0;

    if (!nombre || !correo || !contrasena || !fecha || !telefono) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        uid: user.uid,
        nombre,
        correo,
        fecha,
        telefono,
        ganados,
        perdidos
      });

      alert('✅ Usuario registrado correctamente');
      mostrarLogin();
    } catch (error) {
      alert('❌ Error al registrarse: ' + error.message);
    }
  });
}