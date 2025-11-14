import { db } from '../firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';

export default function mostrarOriginal() {
  const contenedor = document.getElementById("app");
  contenedor.innerHTML = "<h2>Registro de personaje + datos del proyecto</h2>";

  const form = document.createElement("div");
  const resultado = document.createElement("pre");
  resultado.textContent = "Cargando personajes...";

  // 🔧 Objeto base del profe
  let app = {
    nombreapp: "Nombre de la app",
    descripcion: "Aquí agregamos una descripción de 30 palabras",
    icono: "https://cdn-icons-png.flaticon.com/512/2909/2909765.png",
    integrantes: ["javier", "maria", "matt"],
    actividad: "Capacitor Firebase",
    url: "https://drive.google.com/file/d/1Kl97mmRESu2GWPztzK2XdMvNR68vMQ00/view?usp=drive_link"
  };

  // Campos editables del objeto base
  const campos = [
    { key: "nombreapp", label: "Nombre de la app" },
    { key: "descripcion", label: "Descripción" },
    { key: "icono", label: "URL del ícono" },
    { key: "actividad", label: "Actividad" },
    { key: "url", label: "URL del proyecto" }
  ];

  campos.forEach(({ key, label }) => {
    const p = document.createElement("p");
    p.textContent = label;
    const input = document.createElement("input");
    input.placeholder = label;
    input.value = app[key];
    input.oninput = () => {
      app[key] = input.value;
      resultado.textContent = JSON.stringify(app, null, 2);
    };
    form.appendChild(p);
    form.appendChild(input);
  });

  // Campo especial: integrantes
  const pIntegrantes = document.createElement("p");
  pIntegrantes.textContent = "Integrantes (separados por coma):";
  const integrantesInput = document.createElement("input");
  integrantesInput.value = app.integrantes.join(", ");
  integrantesInput.placeholder = "Integrantes (separados por coma):";
  integrantesInput.oninput = () => {
    app.integrantes = integrantesInput.value.split(",").map(i => i.trim());
    resultado.textContent = JSON.stringify(app, null, 2);
  };
  form.appendChild(pIntegrantes);
  form.appendChild(integrantesInput);

  // 🔄 Campos personalizados para el personaje
  const jugadorInput = document.createElement("input");
  jugadorInput.placeholder = "Nombre del jugador";

  const puntuacionInput = document.createElement("input");
  puntuacionInput.type = "number";
  puntuacionInput.placeholder = "Puntuación";

  const personajeSelect = document.createElement("select");
  personajeSelect.innerHTML = "<option disabled selected>Selecciona un personaje</option>";

  fetch("https://thronesapi.com/api/v2/Characters")
    .then(res => res.json())
    .then(personajes => {
      personajes.forEach(p => {
        const option = document.createElement("option");
        option.value = JSON.stringify(p);
        option.textContent = p.fullName;
        personajeSelect.appendChild(option);
      });
      resultado.textContent = "Personajes cargados. Completa el formulario.";
    })
    .catch(error => {
      console.error("Error al cargar personajes:", error);
      resultado.textContent = "❌ Error al cargar personajes.";
    });

  // 🔘 Botón para guardar todo en Firebase
  const botonGuardar = document.createElement("button");
  botonGuardar.textContent = "Guardar en Firebase";

  botonGuardar.onclick = async () => {
    const jugador = jugadorInput.value.trim();
    const puntuacion = parseInt(puntuacionInput.value);
    const personajeData = personajeSelect.value;

    if (!jugador || isNaN(puntuacion) || !personajeData) {
      alert("Completa todos los campos correctamente.");
      return;
    }

    const personaje = JSON.parse(personajeData);

    const objetoFinal = {
      ...app,
      jugador,
      puntuacion,
      personaje: {
        nombre: personaje.fullName,
        titulo: personaje.title,
        familia: personaje.family,
        imagen: personaje.imageUrl
      }
    };

    resultado.textContent = JSON.stringify(objetoFinal, null, 2);

    try {
      await addDoc(collection(db, "proyectos"), objetoFinal);
      alert("✅ Datos guardados correctamente en Firebase!");
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
      alert("❌ Ocurrió un error al guardar.");
    }
  };

  // Agregar campos personalizados al formulario
  form.appendChild(jugadorInput);
  form.appendChild(puntuacionInput);
  form.appendChild(personajeSelect);
  form.appendChild(botonGuardar);

  contenedor.appendChild(form);
  contenedor.appendChild(resultado);
}