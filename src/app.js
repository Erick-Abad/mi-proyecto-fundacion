document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container'); // Contenedor completo del menú
    const navLinks = document.querySelectorAll('nav ul li a');
    const planificacionBtn = document.getElementById('planificacion-btn');
    let currentLang = 'es'; // Establecemos por defecto español
    let selectedVideoSrc = ''; // Variable para guardar el video seleccionado
    let instagramLink = ''; // Variable para guardar el enlace de Instagram

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navContainer.classList.remove('nav-active'); // Cierra el menú
            hamburger.classList.remove('active'); // Quita la animación de la hamburguesa
            document.body.style.overflow = 'auto'; // Restaura el scroll
        });
    });

    // Abre o cierra el menú hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navContainer.classList.toggle('nav-active'); // Muestra/oculta el menú
            hamburger.classList.toggle('active'); // Anima el ícono de la hamburguesa

            // Cambiar imagen de fondo del menú hamburguesa activo
            if (navContainer.classList.contains('nav-active')) {
                navContainer.style.backgroundImage = "url('public/favicon/LogoPrincipal.png')";
                navContainer.style.backgroundSize = 'cover';
                navContainer.style.backgroundPosition = 'center';
                document.body.style.overflow = 'hidden'; // Evita el scroll
            } else {
                navContainer.style.backgroundImage = 'none';
                document.body.style.overflow = 'auto'; // Restaura el scroll
            }
        });
    }

    // Cierra el menú al hacer clic en una opción
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navContainer) {
                navContainer.classList.remove('nav-active');
                hamburger.classList.remove('active');
                navContainer.style.backgroundImage = 'none'; // Elimina la imagen de fondo
                document.body.style.overflow = 'auto';  // Restaura el scroll
            }
        });
    });

    // Cierra el menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (navContainer && !navContainer.contains(e.target) && !hamburger.contains(e.target)) {
            navContainer.classList.remove('nav-active');
            hamburger.classList.remove('active');
            navContainer.style.backgroundImage = 'none'; // Elimina la imagen de fondo
            document.body.style.overflow = 'auto';  // Restaura el scroll
        }
    });

    // Cambio de imagen al presionar el botón de planificación
    if (planificacionBtn) {
        planificacionBtn.addEventListener('click', function () {
            const aboutSection = document.getElementById('about');

            // Cambia el fondo dependiendo del idioma seleccionado
            if (aboutSection) {
                if (currentLang === 'en') {
                    aboutSection.innerHTML = `
                        <div class="hero" style="background: url('public/MVVen.jpg') no-repeat center center/cover; height: 100vh; position: relative;">
                            <div class="hero-overlay1"></div>
                            <div class="hero-content"></div>
                        </div>
                    `;
                } else {
                    aboutSection.innerHTML = `
                        <div class="hero1" style="background: url('public/MVV.jpg') no-repeat center center/cover; height: 100vh; position: relative;">
                            <div class="hero-overlay1"></div>
                            <div class="hero-content"></div>
                        </div>
                    `;
                }
            }
        });
    }

    // Abre el modal de opciones y guarda el video y enlace de Instagram
    window.openVideoModal = function (videoSrc, link) {
        const optionModal = document.getElementById('optionModal');
        const instagramButton = document.getElementById('instagramLink');

        selectedVideoSrc = videoSrc; // Guarda el video seleccionado
        instagramLink = link; // Guarda el enlace de Instagram
        if (instagramButton) {
            instagramButton.href = instagramLink; // Actualiza el enlace del botón
        }

        if (optionModal) {
            optionModal.style.display = 'flex'; // Muestra el modal de opciones
        }
    };

    // Función para abrir el video modal desde el modal de opciones
    window.openVideo = function () {
        const videoModal = document.getElementById('videoModal');
        const videoSource = document.getElementById('videoSource');
        const videoElement = document.getElementById('programVideo');

        if (videoSource && videoElement) {
            videoSource.src = `public/video/${selectedVideoSrc}`;
            videoElement.load();  // Carga el video seleccionado
            if (videoModal) {
                videoModal.style.display = 'flex'; // Muestra el modal de video
            }
            videoElement.play();  // Reproduce el video
        }
        closeOptionModal();  // Cierra el modal de opciones
    };

    // Cierra el modal de opciones
    window.closeOptionModal = function () {
        const optionModal = document.getElementById('optionModal');
        if (optionModal) {
            optionModal.style.display = 'none';
        }
    };

    // Cierra el modal de video
    window.closeVideoModal = function () {
        const videoModal = document.getElementById('videoModal');
        const videoElement = document.getElementById('programVideo');

        if (videoModal && videoElement) {
            videoModal.style.display = 'none';
            videoElement.pause();  // Pausa el video
            videoElement.currentTime = 0;  // Reinicia el video
        }
    };

    // Función para cambiar el idioma
    window.changeLang = function (lang) {
        currentLang = lang; // Actualiza el idioma actual
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
    };

    // Funciones para cambiar el idioma desde los botones
    const langButtons = document.querySelectorAll('.lang-toggle button');
    if (langButtons.length) {
        langButtons[0].addEventListener('click', function() {
            changeLang('es');
        });
        langButtons[1].addEventListener('click', function() {
            changeLang('en');
        });
    }

    // Función para enviar formulario de contacto mediante POST al backend
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
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
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error al enviar el mensaje:', error);
                alert('Hubo un problema al enviar el mensaje. Inténtalo nuevamente.');
            });
        });
    }

    // Ajuste para cerrar el modal de video desde el botón de cerrar dentro del contenedor
    const closeBtns = document.querySelectorAll('.close-btn');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            closeVideoModal();  // Cerrar el modal cuando se haga clic en el botón
        });
    });
});
