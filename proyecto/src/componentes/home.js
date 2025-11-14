import '../style.css'; // Asegúrate de que la ruta sea correcta

export default async function mostrarHome() {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = "<h2>Cargando personajes...</h2>";

  try {
    const response = await fetch("https://thronesapi.com/api/v2/Characters");
    const personajes = await response.json();

    appContainer.innerHTML = ""; // Limpiar contenido

    personajes.forEach((personaje) => {
      const card = document.createElement("div");
      card.classList.add("personaje-card");

      card.innerHTML = `
        <img src="${personaje.imageUrl}" alt="Imagen de ${personaje.fullName}" />
        <div class="personaje-info">
          <h2>${personaje.fullName}</h2>
          <p><strong>Título:</strong> ${personaje.title}</p>
          <p><strong>Familia:</strong> ${personaje.family}</p>
        </div>
      `;

      appContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar los personajes:", error);
    appContainer.innerHTML = "<p>Error al cargar los personajes 😢</p>";
  }
}