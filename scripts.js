document.addEventListener('DOMContentLoaded', function () {
    // Funcionalidad de navegación por secciones
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const carouselSection = document.getElementById('carousel-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
            carouselSection.classList.add('hidden');
        });
    });

    // Funcionalidad del formulario de contacto
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        fetch('url_de_tu_backend_o_servicio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            alert('Mensaje enviado correctamente');
        })
        .catch(error => {
            console.error('Error al enviar el mensaje:', error);
            alert('Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
        });
    });

    // Funcionalidad del carrusel
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel-image');
    const nextButton = document.querySelector('.carousel-nav.next');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let interval;

    
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }


    function showImage(index) {
        images.forEach((image, i) => {
            image.classList.toggle('active', i === index);
        });
        currentIndex = index;
        updateIndicators();
    }

    function showNextImage() {
        let nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex);
    }

    function showPrevImage() {
        let prevIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(prevIndex);
    }

    function startInterval() {
        interval = setInterval(showNextImage, 3000); // Cambia la imagen cada 3 segundos
    }

    function resetInterval() {
        clearInterval(interval);
        startInterval();
    }

    nextButton.addEventListener('click', () => {
        showNextImage();
        resetInterval();
    });

    prevButton.addEventListener('click', () => {
        showPrevImage();
        resetInterval();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showImage(index);
            resetInterval();
        });
    });

    startInterval();
    updateIndicators();


    // Mostrar el carrusel y ocultar las secciones al hacer clic en el logo de la institución
    const institutionLogo = document.getElementById('institution-logo');
    institutionLogo.addEventListener('click', function () {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        carouselSection.classList.toggle('hidden');
    });
});
