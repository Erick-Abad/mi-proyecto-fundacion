let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000);
}

// Función para cambiar de diapositiva con flechas
function changeSlide(n) {
    showSlides((slideIndex += n));
}

// Función para cambiar el idioma
function changeLang(lang) {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(el => {
        if (el.getAttribute('data-lang') === lang) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });
}

// Función para alternar el menú hamburguesa en móviles
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('nav-active');
}

// Función para enviar formulario de contacto mediante POST al backend
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Usar fetch para enviar los datos al servidor
    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message,
        })
    })
    .then(response => response.text())
    .then(data => {
        alert('Mensaje enviado correctamente');
        document.getElementById('contact-form').reset();
    })
    .catch(error => {
        console.error('Error al enviar el mensaje:', error);
        alert('Hubo un problema al enviar el mensaje. Inténtalo nuevamente.');
    });
    // Selecciona la hamburguesa
const hamburger = document.querySelector('.hamburger');

// Variables para almacenar las posiciones del toque
let isDragging = false;
let startX, startY, initialX, initialY;

// Inicia el arrastre
hamburger.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    initialX = hamburger.offsetLeft;
    initialY = hamburger.offsetTop;
});

// Movimiento de arrastre
document.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;

        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        // Actualiza la posición de la hamburguesa
        hamburger.style.left = `${initialX + deltaX}px`;
        hamburger.style.top = `${initialY + deltaY}px`;
    }
});

// Termina el arrastre
document.addEventListener('touchend', () => {
    isDragging = false;
});

});