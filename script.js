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