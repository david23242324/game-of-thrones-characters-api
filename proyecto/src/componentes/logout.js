import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig.js';
import mostrarLogin from './login.js';
import '../style.css'; 

export default function mostrarLogout() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="logout-container">
      <div class="logout-message">
        <h2>Cerrando sesión...</h2>
        <p>Que los Siete te protejan en tu regreso.</p>
      </div>
    </div>
  `;

  signOut(auth)
    .then(() => {
      mostrarLogin();
    })
    .catch((error) => {
      alert("Error al cerrar sesión: " + error.message);
      mostrarLogin();
    });
}