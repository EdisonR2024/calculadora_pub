let divBotones = document.querySelector("#botones");
// console.log(divBotones);
let pantalla = document.querySelector("#pantalla");
let pantalla_operaciones = document.querySelector("#pantalla_operaciones");

let boton_resetear = document.querySelector("#resetear");

let boton_punto = document.querySelector("#punto");

let boton_borrar = document.querySelector("#borrar");

// let boton_operadores= document.querySelectorAll('.operadores');

let primerNumero = true;
let punto_activado = false;
let limite_caracteres_pantalla = 10;

let numeroActual=0;
let numeroAnterior=0;
let operadorSeleccionado='';


divBotones.addEventListener('click', (event) => {
    let elemento_btn = event.target;
    if (elemento_btn.classList.contains('numero')) {
        accionNumeros(elemento_btn.innerText);
    }else if(elemento_btn.classList.contains('operadores')){
        // alert('Click en Operadores');
        // console.log(elemento_btn.innerText);
        let operador=elemento_btn.innerText;
        pantalla_operaciones.innerText=pantalla.innerText+operador;
        pantalla_operaciones.classList.remove('po_color');
        numeroAnterior=numeroActual;

        resetearValores();
    }
});

boton_resetear.addEventListener('click', () => {
    reseteoTotal();
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
                numeroActual=pantalla.innerText;
                console.log(numeroActual);
            }
        } else {
            pantalla.innerText = pantalla.innerText + texto;
            numeroActual=pantalla.innerText;
            console.log(numeroActual);
        }
    }
}

function reseteoTotal(){
    resetearPantalla();
    resetearValores();
}

function resetearPantalla() {
    pantalla.innerHTML = '0';
    pantalla_operaciones.innerText='0';
    pantalla_operaciones.classList.add('po_color');
}

function resetearValores(){
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
        reseteoTotal();
    }
});

// boton_operadores.forEach.addEventListener('click',()=>{
//     alert('Click en Operadores');
// });



