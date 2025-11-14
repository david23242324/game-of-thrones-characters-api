import { db } from './firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';
import '../style.css'; // ✅ Estilos globales

export default function mostrarOriginal() {
  const app = document.getElementById("app");

  // 🔘 Contenedor principal con clase para estilos
  app.innerHTML = `
    <div class="original-container">
      <h2>Registro de personaje de Game of Thrones</h2>
      <div id="formulario-original"></div>
      <pre id="resultado-original">Cargando personajes...</pre>
    </div>
  `;

  const form = document.getElementById("formulario-original");
  const resultado = document.getElementById("resultado-original");

  // Inputs personalizados
  const jugadorInput = document.createElement("input");
  jugadorInput.placeholder = "Nombre del jugador";

  const puntuacionInput = document.createElement("input");
  puntuacionInput.type = "number";
  puntuacionInput.placeholder = "Puntuación";

  const personajeSelect = document.createElement("select");
  personajeSelect.innerHTML = "<option disabled selected>Selecciona un personaje</option>";

  // 🔄 Cargar personajes desde la API
  fetch("https://thronesapi.com/api/v2/Characters")
    .then(res => res.json())
    .then(personajes => {
      personajes.forEach(p => {
        const option = document.createElement("option");
        option.value = JSON.stringify(p);
        option.textContent = `${p.fullName} (${p.family})`;
        personajeSelect.appendChild(option);
      });
      resultado.textContent = "Personajes cargados. Completa el formulario.";
    })
    .catch(error => {
      console.error("Error al cargar personajes:", error);
      resultado.textContent = "❌ Error al cargar personajes.";
    });

  // 🔘 Botón para guardar en Firebase
  const botonGuardar = document.createElement("button");
  botonGuardar.textContent = "Guardar personaje";

  botonGuardar.onclick = async () => {
    const jugador = jugadorInput.value.trim();
    const puntuacion = parseInt(puntuacionInput.value);
    const personajeData = personajeSelect.value;

    if (!jugador || isNaN(puntuacion) || !personajeData) {
      alert("Completa todos los campos correctamente.");
      return;
    }

    const personaje = JSON.parse(personajeData);

    const registro = {
      jugador,
      puntuacion,
      personaje: {
        nombre: personaje.fullName,
        titulo: personaje.title,
        familia: personaje.family,
        imagen: personaje.imageUrl
      },
      fecha: new Date().toISOString()
    };

    resultado.textContent = JSON.stringify(registro, null, 2);

    try {
      await addDoc(collection(db, "personajesGoT"), registro);
      alert("✅ Personaje guardado correctamente en Firebase!");
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("❌ Ocurrió un error al guardar.");
    }
  };

  // Agregar elementos al formulario
  form.appendChild(jugadorInput);
  form.appendChild(puntuacionInput);
  form.appendChild(personajeSelect);
  form.appendChild(botonGuardar);
}