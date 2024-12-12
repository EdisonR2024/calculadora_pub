let divBotones = document.querySelector("#botones");
// console.log(divBotones);
let pantalla = document.querySelector("#pantalla");
let pantalla_operaciones = document.querySelector("#pantalla_operaciones");

// let boton_resetear = document.querySelector("#resetear");

let boton_punto = document.querySelector("#punto");

let boton_borrar = document.querySelector("#borrar");

// let boton_operadores= document.querySelectorAll('.operadores');

let primerNumero = true;
let punto_activado = false;
let limite_caracteres_pantalla = 10;
let boton_igual_disponible = false;

let numeroActual = 0;
let numeroAnterior = 0;
let operadorSeleccionado = '';


divBotones.addEventListener('click', (event) => {
    let elemento_btn = event.target;
    if (elemento_btn.classList.contains('numero')) {
        accionNumeros(elemento_btn.innerText);
    } else if (elemento_btn.classList.contains('operadores')) {
        operadorSeleccionado = elemento_btn.innerText;
        pantalla_operaciones.innerText = pantalla.innerText + " " + operadorSeleccionado;
        pantalla_operaciones.classList.remove('po_color');
        numeroAnterior = numeroActual;
        resetearValoresPantallaPrincipal();
        boton_igual_disponible = true;
    } else if (elemento_btn.innerHTML === '=' && boton_igual_disponible === true) {
        console.log('anterior: ' + numeroAnterior);
        console.log('actual: ' + numeroActual);
        // let resultado = Number(numeroAnterior) + Number(numeroActual);
        let resultado = realizarOperacion(numeroAnterior, numeroActual, operadorSeleccionado);
        pantalla_operaciones.innerText = pantalla_operaciones.innerText + ' ' + numeroActual + ' =';
        pantalla.innerText = resultado;
        numeroActual = resultado;
        boton_igual_disponible=false;
    } else if (elemento_btn.innerHTML === 'AC') {
        reseteoTotal();
    }
});

/* boton_resetear.addEventListener('click', () => {
    reseteoTotal();
}); */

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
                numeroActual = pantalla.innerText;
                console.log('anterior: ' + numeroAnterior);
                console.log('actual: ' + numeroActual);

            }
        } else {
            pantalla.innerText = pantalla.innerText + texto;
            numeroActual = pantalla.innerText;
            console.log('anterior: ' + numeroAnterior);
            console.log('actual: ' + numeroActual);
        }
    }
}

function reseteoTotal() {
    resetearPantallas();
    resetearValoresPantallaPrincipal();
    resetearValoresIniciales();
}

function resetearPantallas() {
    pantalla.innerHTML = '0';
    pantalla_operaciones.innerText = '0';
    pantalla_operaciones.classList.add('po_color');
}

function resetearValoresPantallaPrincipal() {
    primerNumero = true;
    punto_activado = false;
}

function resetearValoresIniciales() {
    numeroActual = 0;
    numeroAnterior = 0;
    operadorSeleccionado = '';
}

function realizarOperacion(numero1, numero2, operador) {

    switch (operador) {
        case "+":
            return Number(numero1) + Number(numero2);
        case "-":
            return resultado = Number(numero1) - Number(numero2);
        case "x":
            return resultado = Number(numero1) * Number(numero2);
        case "÷":
            return resultado = Number(numero1) / Number(numero2);
        default:
            console.log('Hubo algun error al realizar la operación')
            return 0;
    }

}




