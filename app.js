let amigos = [];

/**
 * 🌓 GESTIÓN DE TEMAS (DARK/LIGHT MODE)
 * Este bloque se encarga de alternar entre el modo claro y oscuro.
 */
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

// 1. Verificar si hay un tema guardado en el navegador (localStorage)
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', currentTheme);
updateIcons(currentTheme);

// 2. Escuchar el clic en el botón de cambio de tema
themeToggle.addEventListener('click', () => {
    // Obtenemos el tema actual
    const theme = document.body.getAttribute('data-theme');
    // Si es light lo pasamos a dark, y viceversa
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Aplicamos el nuevo tema al atributo 'data-theme' del body
    document.body.setAttribute('data-theme', newTheme);
    // Guardamos la preferencia para que se mantenga al recargar la página
    localStorage.setItem('theme', newTheme);
    
    // Actualizamos los iconos visualmente
    updateIcons(newTheme);
});

// Función para mostrar el icono correcto según el tema
function updateIcons(theme) {
    if (theme === 'dark') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
}

/**
 * 📝 LÓGICA DE LA APLICACIÓN
 */

/**
 * Adds a friend to the list
 */
function agregarAmigo() {
    const input = document.getElementById("amigo");
    const errorDiv = document.getElementById("error-message");
    const nombre = input.value.trim();

    // Clear previous error
    errorDiv.textContent = "";

    if (nombre === "") {
        showError("Please enter a valid name.");
        return;
    }

    if (amigos.includes(nombre)) {
        showError("This name is already in the list.");
        return;
    }

    amigos.push(nombre);
    input.value = "";
    input.focus();
    mostrarLista();
}

/**
 * Shows a visual error message
 */
function showError(message) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = message;
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        errorDiv.textContent = "";
    }, 3000);
}

/**
 * Allows adding names with the Enter key
 */
function handleKeyPress(event) {
    if (event.key === "Enter") {
        agregarAmigo();
    }
}

/**
 * Updates the list in the DOM
 */
function mostrarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        
        // Optional delete button (improves UX)
        li.style.cursor = "pointer";
        li.title = "Click to remove";
        li.onclick = () => eliminarAmigo(index);
        
        lista.appendChild(li);
    });
}

/**
 * Removes a friend from the list
 */
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    mostrarLista();
}

/**
 * Draws a secret friend
 */
function sortearAmigo() {
    const resultadoUl = document.getElementById("resultado");
    
    if (amigos.length < 2) {
        showError("You need at least 2 names for the draw.");
        return;
    }

    // "Loading" effect for excitement
    resultadoUl.innerHTML = "<li>Drawing...</li>";
    
    setTimeout(() => {
        const indiceAleatorio = Math.floor(Math.random() * amigos.length);
        const amigoSorteado = amigos[indiceAleatorio];

        resultadoUl.innerHTML = `
            <li class="reveal-animation">
                🎉 The secret friend is: <strong>${amigoSorteado}</strong>
            </li>
        `;
    }, 800);
}
