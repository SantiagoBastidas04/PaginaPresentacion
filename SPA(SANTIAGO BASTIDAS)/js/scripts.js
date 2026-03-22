// ===== CARRUSEL =====
const estadoCarruseles = {};

function moverCarrusel(id, direccion) {
    const carrusel = document.getElementById(id);
    const track = carrusel.querySelector('.mi-carrusel-track');
    const total = track.querySelectorAll('img').length;
    if (!estadoCarruseles[id]) estadoCarruseles[id] = 0;
    estadoCarruseles[id] = (estadoCarruseles[id] + direccion + total) % total;
    track.style.transform = `translateX(-${estadoCarruseles[id] * 100}%)`;
}

// ===== ANIMACIONES SCROLL =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.animar, .animar-izq, .animar-der').forEach(el => {
    observer.observe(el);
});

// ===== FORMULARIO =====
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let valido = true;

    const nombre = document.getElementById("name");
    if (nombre.value.trim().length < 2) { mostrarError(nombre); valido = false; }
    else { ocultarError(nombre); }

    const email = document.getElementById("email");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { mostrarError(email); valido = false; }
    else { ocultarError(email); }

    const telefono = document.getElementById("phone");
    if (!/^\+?[\d\s\-]{7,15}$/.test(telefono.value.trim())) { mostrarError(telefono); valido = false; }
    else { ocultarError(telefono); }

    const motivo = document.getElementById("motivo");
    if (!motivo.value) { mostrarError(motivo); valido = false; }
    else { ocultarError(motivo); }

    const mensaje = document.getElementById("message");
    if (mensaje.value.trim().length < 10) { mostrarError(mensaje); valido = false; }
    else { ocultarError(mensaje); }

    const preferencia = document.querySelector('input[name="preferencia"]:checked');
    const errorPref = document.getElementById("error-preferencia");
    if (!preferencia) { errorPref.style.display = "block"; valido = false; }
    else { errorPref.style.display = "none"; }

    const terminos = document.getElementById("terminos");
    const errorTerm = document.getElementById("error-terminos");
    if (!terminos.checked) { errorTerm.style.display = "block"; valido = false; }
    else { errorTerm.style.display = "none"; }

    if (valido) {
        document.getElementById("submitSuccessMessage").classList.remove("oculto");
        document.getElementById("submitErrorMessage").classList.add("oculto");
        this.reset();
    } else {
        document.getElementById("submitErrorMessage").classList.remove("oculto");
        document.getElementById("submitSuccessMessage").classList.add("oculto");
    }
});

function mostrarError(campo) {
    campo.closest(".campo-flotante").querySelector(".campo-error").style.display = "block";
    campo.style.borderColor = "#c0392b";
}

function ocultarError(campo) {
    campo.closest(".campo-flotante").querySelector(".campo-error").style.display = "none";
    campo.style.borderColor = "";
}