// --- Menu mobile toggle ---
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

// --- Dropdown mobile ---
const dropdowns = document.querySelectorAll('.nav-links li.dropdown');
dropdowns.forEach(drop => {
    drop.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            e.stopPropagation();
            this.classList.toggle('active');
        }
    });
});

// --- Filiais - mudar iframe ---
const filialLinks = document.querySelectorAll('.dropdown-menu li a');
const iframe = document.querySelector('iframe[name="iframe-content"]');
filialLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const url = this.getAttribute('href');
        iframe.setAttribute('src', url);
    });
});

// --- Scroll fade-in ---
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// --- Formulário EmailJS ---
document.getElementById('formOracao')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const formMessage = document.getElementById('formMessage');
    const recaptcha = grecaptcha.getResponse();
    if (recaptcha.length === 0) {
        formMessage.textContent = "Por favor, confirme que você não é um robô.";
        formMessage.style.color = 'red';
        return;
    }
    emailjs.sendForm('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', this)
        .then(() => {
            formMessage.textContent = "Pedido enviado com sucesso! 🙏";
            formMessage.style.color = 'green';
            this.reset();
            grecaptcha.reset();
        }, (error) => {
            formMessage.textContent = "Erro ao enviar, tente novamente.";
            formMessage.style.color = 'red';
            console.log(error);
        });
});

// --- Carrossel ---
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let current = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) slide.classList.add('active');
        });
    }

    // Próximo slide
    next.addEventListener('click', () => {
        current = (current + 1) % slides.length;
        showSlide(current);
    });

    // Slide anterior
    prev.addEventListener('click', () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    });

    // Troca automática a cada 5 segundos
    setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
    }, 5000);
});