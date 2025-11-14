import { auth } from './componentes/firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';

import mostrarLogin from './componentes/login.js';
import mostrarRegistro from './componentes/registro.js';
import mostrarHome from './componentes/home.js';
import mostrarOriginal from './componentes/original.js';
import mostrarLogout from './componentes/logout.js';

import './style.css'; // Asegúrate de importar los estilos

onAuthStateChanged(auth, (user) => {
  const menu = document.getElementById("menu");

  if (user) {
    menu.innerHTML = `
      <nav class="nav-bar">
        <button class="nav-btn" id="menuHome">🏠 Home</button>
        <button class="nav-btn" id="menuOriginal">📜 Original</button>
        <button class="nav-btn" id="menuLogout">🚪 Logout</button>
      </nav>
    `;

    document.getElementById("menuHome").addEventListener("click", mostrarHome);
    document.getElementById("menuOriginal").addEventListener("click", mostrarOriginal);
    document.getElementById("menuLogout").addEventListener("click", mostrarLogout);

    mostrarHome();
  } else {
    menu.innerHTML = `
      <nav class="nav-bar">
        <button class="nav-btn" id="menuLogin">🔐 Login</button>
        <button class="nav-btn" id="menuRegistro">📝 Registro</button>
      </nav>
    `;

    document.getElementById("menuLogin").addEventListener("click", mostrarLogin);
    document.getElementById("menuRegistro").addEventListener("click", mostrarRegistro);

    mostrarLogin();
  }
});

console.log("main.js cargado");
console.log("mostrarLogin ejecutado");