let divBotones = document.querySelector("#botones");
// console.log(divBotones);
let pantalla = document.querySelector("#pantalla");

let boton_resetear = document.querySelector("#resetear");

let boton_punto = document.querySelector("#punto");

let boton_borrar = document.querySelector("#borrar");

let primerNumero = true;
let punto_activado = false;
let limite_caracteres_pantalla = 10;


divBotones.addEventListener('click', (event) => {
    let elemento_btn = event.target;
    if (elemento_btn.classList.contains('numero')) {
        accionNumeros(elemento_btn.innerText);
    }
});

boton_resetear.addEventListener('click', () => {
    resetear();
});

boton_punto.addEventListener('click', () => {
    if (punto_activado === false) {
        if (primerNumero) {
            accionNumeros('0.');
        } else {
            accionNumeros('.');
        }
    }
    punto_activado = true;
});

function accionNumeros(texto) {
    // alert('Haz dado click en el número ' + texto);
    if (pantalla.innerText.length < limite_caracteres_pantalla) {
        if (primerNumero) {
            if (texto != '0') {
                pantalla.innerText = texto;
                primerNumero = false;
            }
        } else {
            pantalla.innerText = pantalla.innerText + texto;
        }
    }
}

function resetear() {
    pantalla.innerHTML = '0';
    primerNumero = true;
    punto_activado = false;
}

boton_borrar.addEventListener('click', () => {
    if (pantalla.innerText.length > 1) {
        pantalla.innerText = pantalla.innerText.slice(0, -1);
        let caracterBorrar = pantalla.innerText.slice(-1);
        if (caracterBorrar === '.') {
            punto_activado = false;
        }
    } else {
        resetear();
    }
});



