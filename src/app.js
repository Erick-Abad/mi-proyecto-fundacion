document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const planificacionBtn = document.getElementById('planificacion-btn');
    let currentLang = 'es'; // Establecemos por defecto español

    // Abre el menú hamburguesa
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        if (nav.classList.contains('nav-active')) {
            document.body.style.overflow = 'hidden';  // Evita el scroll en la vista móvil
        } else {
            document.body.style.overflow = 'auto';  // Restaura el scroll
        }
    });

    // Cierra el menú al hacer clic en una opción
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            document.body.style.overflow = 'auto';  // Restaura el scroll
        });
    });

    // Cierra el menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            nav.classList.remove('nav-active');
            document.body.style.overflow = 'auto';  // Restaura el scroll
        }
    });

    // Cambio de imagen al presionar el botón de planificación
    planificacionBtn.addEventListener('click', function () {
        const aboutSection = document.getElementById('about');

        // Cambia el fondo dependiendo del idioma seleccionado
        if (currentLang === 'en') {
            aboutSection.innerHTML = `
                <div class="hero" style="background: url('public/MVVen.jpg') no-repeat center center/cover; height: 100vh; position: relative;">
                    <div class="hero-overlay1"></div>
                    <div class="hero-content">
                    
                    </div>
                </div>
            `;
        } else {
            aboutSection.innerHTML = `
                <div class="hero1" style="background: url('public/MVV.jpg') no-repeat center center/cover; height: 100vh; position: relative;">
                    <div class="hero-overlay1"></div>
                    <div class="hero-content">
                    
                    </div>
                </div>
            `;
        }
    });

    // Abre el modal de video
    window.openVideoModal = function (videoSrc) {  // Hacemos la función accesible globalmente
        const modal = document.getElementById('videoModal');
        const videoSource = document.getElementById('videoSource');
        const videoElement = document.getElementById('programVideo');

        videoSource.src = `public/video/${videoSrc}`;
        videoElement.load();  // Carga el nuevo video
        modal.style.display = 'flex';
        videoElement.play();  // Reproduce el video
    }

    // Cierra el modal de video
    window.closeVideoModal = function () {  // Hacemos la función accesible globalmente
        const modal = document.getElementById('videoModal');
        const videoElement = document.getElementById('programVideo');

        modal.style.display = 'none';
        videoElement.pause();  // Pausa el video
        videoElement.currentTime = 0;  // Reinicia el video
    }

    // Función para cambiar el idioma
    window.changeLang = function (lang) {  // Hacemos la función accesible globalmente
        currentLang = lang; // Actualizamos el idioma actual
        const elements = document.querySelectorAll('[data-es], [data-en]');

        elements.forEach(el => {
            const textEs = el.getAttribute('data-es');
            const textEn = el.getAttribute('data-en');

            if (lang === 'es') {
                el.textContent = textEs;
            } else if (lang === 'en') {
                el.textContent = textEn;
            }
        });
    }

    // Funciones para cambiar el idioma desde los botones
    document.querySelector('.lang-toggle button:nth-child(1)').addEventListener('click', function() {
        changeLang('es');
    });
    document.querySelector('.lang-toggle button:nth-child(2)').addEventListener('click', function() {
        changeLang('en');
    });

    // Función para enviar formulario de contacto mediante POST al backend
    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Usar fetch para enviar los datos al servidor
        fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
            }),
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
    });

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
