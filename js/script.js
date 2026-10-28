let indiceActual = 0;

function mostrarDiapositiva(n) {
    const diapositivas = document.querySelectorAll('.diapositiva');
    
    if (diapositivas.length === 0) return;

    // Control de límites circular
    if (n >= diapositivas.length) {
        indiceActual = 0;
    } else if (n < 0) {
        indiceActual = diapositivas.length - 1;
    } else {
        indiceActual = n;
    }

    // Ocultar todas y remover la clase activa
    diapositivas.forEach(diapositiva => {
        diapositiva.classList.remove('activa');
    });

    // Mostrar la diapositiva actual
    diapositivas[indiceActual].classList.add('activa');
}

function cambiarDiapositiva(n) {
    mostrarDiapositiva(indiceActual + n);
}