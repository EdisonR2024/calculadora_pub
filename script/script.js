let divBotones = document.querySelector("#botones");
console.log(divBotones);

let pantalla = document.querySelector("#pantalla");

let primerNumero = true;
let limite_caracteres_pantalla = 10;

divBotones.addEventListener('click', (event) => {
    let elemento_btn = event.target;
    if (elemento_btn.classList.contains('numero')) {
        accionNumeros(elemento_btn.innerText);
    }
});

function accionNumeros(texto) {
    // alert('Haz dado click en el número ' + texto);
    if (pantalla.innerText.length < limite_caracteres_pantalla) {
        if (primerNumero) {
            pantalla.innerText = texto;
            primerNumero = false;
        } else {
            pantalla.innerText = pantalla.innerText + texto;
        }
    }
}




