// --- Menu mobile toggle ---
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

// --- Dropdown mobile ---
const dropdowns = document.querySelectorAll('.nav-links li.dropdown');
dropdowns.forEach(drop => {
    drop.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.stopPropagation();
            this.classList.toggle('active');
        }
    });
});

// --- Filiais - mudar iframe ---
linksFiliais.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        // Esconde site com fade
        header.style.opacity = 0;
        mainContent.style.opacity = 0;
        footer.style.opacity = 0;

        setTimeout(() => {
            header.style.display = "none";
            mainContent.style.display = "none";
            footer.style.display = "none";

            filialContainer.style.display = "block";
            filialIframe.src = link.href;
            filialContainer.style.opacity = 0;
            setTimeout(() => {
                filialContainer.style.opacity = 1;
            }, 50);
        }, 300);
    });
});

voltarBtn.addEventListener('click', () => {
    filialContainer.style.opacity = 0;
    setTimeout(() => {
        filialContainer.style.display = "none";
        filialIframe.src = "";

        header.style.display = "block";
        mainContent.style.display = "block";
        footer.style.display = "block";

        setTimeout(() => {
            header.style.opacity = 1;
            mainContent.style.opacity = 1;
            footer.style.opacity = 1;
        }, 50);
    }, 300);
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
document.getElementById('formOracao') ? .addEventListener('submit', function(e) {
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

            function showSlide(i) {
                slides.forEach((slide, n) => {
                    slide.classList.toggle('active', n === i);
                    dots[n].classList.toggle('active', n === i);

                    // Remove e adiciona a classe para reiniciar animação
                    const elements = slide.querySelectorAll('h2, h3, p, .btn-slide');
                    elements.forEach(el => {
                        el.style.animation = 'none';
                        void el.offsetWidth; // força reflow
                        el.style.animation = '';
                    });
                });
                index = i;

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

        // Partículas animadas
        const canvas = document.getElementById('particulas');
        const ctx = canvas.getContext('2d'); canvas.width = window.innerWidth; canvas.height = window.innerHeight;

        let particulasArray = [];

        class Particula {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.opacity = Math.random() * 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticulas() {
            particulasArray = [];
            for (let i = 0; i < 100; i++) {
                particulasArray.push(new Particula());
            }
        }

        function animateParticulas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particulasArray.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticulas);
        }

        initParticulas(); animateParticulas();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticulas();
        });



        /* sessao unidades*/
        const cards = document.querySelectorAll('.unidade-card');
        const modais = document.querySelectorAll('.modal');
        const closeBtns = document.querySelectorAll('.modal .close');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const modalID = card.getAttribute('data-modal');
                document.getElementById(modalID).style.display = 'block';
            });
        });

        closeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        window.addEventListener('click', (e) => {
            modais.forEach(modal => {
                if (e.target == modal) {
                    modal.style.display = 'none';
                }
            });
        });

        /* sessao unidades fecha a sessao*/