const topoBtn = document.querySelector('.topo-btn');

window.addEventListener('scroll', function() {
    if(window.scrollY > 300) {
        topoBtn.style.display = 'block'; // mostra o botão
    } else {
        topoBtn.style.display = 'none'; // esconde o botão
    }
});
