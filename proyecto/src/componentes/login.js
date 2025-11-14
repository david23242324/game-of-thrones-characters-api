import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig.js';
import '../style.css'; // Importa los estilos globales

export default function mostrarLogin() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="login-container">
      <div class="login-box">
        <h2>Iniciar Sesión</h2>
        <input type="email" id="correo" placeholder="Correo electrónico" />
        <input type="password" id="contrasena" placeholder="Contraseña" />
        <button id="btnLogin">Ingresar</button>
      </div>
    </div>
  `;

  document.getElementById("btnLogin").addEventListener("click", async () => {
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    if (!correo || !contrasena) {
      alert("Por favor completa ambos campos.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
      window.location.reload();
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  });
}