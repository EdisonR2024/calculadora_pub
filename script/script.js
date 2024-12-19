let divBotones = document.querySelector("#botones");
let pantalla = document.querySelector("#pantalla");
let pantalla_operaciones = document.querySelector("#pantalla_operaciones");

let primerNumero = true;
let punto_activado = false;
let limite_caracteres_pantalla = 20;
let boton_igual_disponible = false;
let boton_negativo_disponible = false;
let boton_porcentaje_disponible = false;
let boton_borrar_disponible = false;
let botones_operadores_disponible = true;
let habilitar_borrar_pantalla_operaciones = false;
let habilitar_calculo_operadores = false;

let numeroActual = NaN;
let numeroAnterior = NaN;
let operadorSeleccionado = '';

//Mensajes error
let mensajeErrorDivCero = 'No se puede dividir para 0';

//Se agrega el evento click a todo el contenedor de botones y se controla cada caso por boton
divBotones.addEventListener('click', (event) => {
    let elemento_btn = event.target;

    switch (true) {
        case elemento_btn.classList.contains('numero'):
            accionNumeros(elemento_btn.innerText);
            break;
        case (elemento_btn.classList.contains('operadores') && botones_operadores_disponible):
            accionOperadores(elemento_btn.innerText);
            break;
        case (elemento_btn.innerText === '=' && boton_igual_disponible):
            accionBtnIgual();
            break;
        case (elemento_btn.innerText === '+/-' && boton_negativo_disponible):
            accionBtnNegativo();
            break;
        case (elemento_btn.innerText === '%' && boton_porcentaje_disponible):
            accionBtnPorcentaje();
            break;
        case (elemento_btn.innerText === '.'):
            accionBtnPunto();
            break;
        case (elemento_btn.innerText === 'AC'):
            reseteoTotal();
            break;
        case (elemento_btn.id === 'borrar' && boton_borrar_disponible):
            accionBtnBorrar();
            break;
        default:
            console.log('No ha dado click en ningun boton');
            break;
    }
});

function accionNumeros(texto) {
    if (pantalla.innerText.length < limite_caracteres_pantalla) {
        if (primerNumero) {
            imprimirPantallaPrincipal(texto);
            numeroActual = texto;
            // console.log('anterior: ' + numeroAnterior);
            // console.log('actual: ' + numeroActual);
            if (texto != '0') {
                primerNumero = false;
                boton_negativo_disponible = true;
                boton_porcentaje_disponible = true;
                boton_borrar_disponible = true;
            }

            if (boton_igual_disponible === false) {
                resetearPantallaOperaciones();
            }
        } else {
            imprimirPantallaPrincipal(pantalla.innerText + texto);
            numeroActual = pantalla.innerText;
            // console.log('anterior: ' + numeroAnterior);
            // console.log('actual: ' + numeroActual);
        }

        //Para activar la función de calcular con los btn de operadores
        if (!Number.isNaN(numeroAnterior)) {
            habilitar_calculo_operadores = true;
        }

    }
}

function accionOperadores(operador) {
    try {
        //Se realiza la función de calcular usando los botones de operadores
        if (habilitar_calculo_operadores) {
            // console.log(`Se habilta calcOpe: ${numeroAnterior}${operadorSeleccionado}${numeroActual}`);
            let resultado = realizarOperacion(numeroAnterior, numeroActual, operadorSeleccionado);
            numeroActual = resultado;
            numeroAnterior = resultado;
            console.log(resultado);
            pantalla_operaciones.innerText = resultado + " " + operador;
            operadorSeleccionado = operador;
            imprimirPantallaPrincipal(resultado);
        } else {
            operadorSeleccionado = operador;
            pantalla_operaciones.innerText = pantalla.innerText + " " + operadorSeleccionado;
            pantalla_operaciones.classList.remove('po_color');
            numeroAnterior = numeroActual;
        }

        resetearValoresPantallaPrincipal();
        boton_igual_disponible = true;
        habilitar_borrar_pantalla_operaciones = false;

        habilitar_calculo_operadores = false;
    } catch (error) {
        if (error.message.startsWith("DivisionError")) {
            manejarErrorDivisionCero(mensajeErrorDivCero);
        }
    }
}

function accionBtnIgual() {
    try {
        if (Number.isNaN(numeroAnterior)) {
            numeroAnterior = 0;
        }
        console.log('anterior: ' + numeroAnterior);
        console.log('actual: ' + numeroActual);
        pantalla_operaciones.innerText = pantalla_operaciones.innerText + ' ' + numeroActual + ' =';
        let resultado = realizarOperacion(numeroAnterior, numeroActual, operadorSeleccionado);
        imprimirPantallaPrincipal(resultado);
        numeroActual = resultado;
        habilitar_borrar_pantalla_operaciones = true;
        boton_igual_disponible = false;
        boton_porcentaje_disponible = false;
        habilitar_calculo_operadores = false;

        resetearValoresPantallaPrincipal();
    } catch (error) {
        if (error.message.startsWith("DivisionError")) {
            manejarErrorDivisionCero(mensajeErrorDivCero);
        }
    }

}

function accionBtnNegativo() {
    let primer_caracter = pantalla.innerText.slice(0, 1);
    if (primer_caracter === '-') {
        imprimirPantallaPrincipal(pantalla.innerText.slice(1, pantalla.innerText.length));
    } else {
        imprimirPantallaPrincipal('-' + pantalla.innerText);
        numeroActual = pantalla.innerText;
    }
}

function accionBtnPorcentaje() {
    try {

        if (pantalla_operaciones.innerText === "#") {
            reseteoTotal();
        } else {
            let numero_pantalla = pantalla.innerText;
            let numero_para_porcentaje = numero_pantalla / 100;
            pantalla_operaciones.innerText = pantalla_operaciones.innerText + " " + numero_pantalla + "%=";
            let resultado = 0;
            switch (operadorSeleccionado) {
                case 'x':
                case '÷':
                    resultado = realizarOperacion(numeroAnterior, numero_para_porcentaje, operadorSeleccionado);
                    break;
                case '+':
                case '-':
                    resultado = realizarOperacion(numeroAnterior, numeroAnterior * numero_para_porcentaje, operadorSeleccionado);
                    break;
                default:
                    console.log('No ha seleccionado un operador para el calculo del %')
                    break;
            }

            imprimirPantallaPrincipal(resultado);
            numeroActual = resultado;
            habilitar_borrar_pantalla_operaciones = true;
            boton_igual_disponible = false;
            boton_porcentaje_disponible = false;
            habilitar_calculo_operadores = false;

            resetearValoresPantallaPrincipal();

        }

    } catch (error) {
        if (error.message.startsWith("DivisionError")) {
            manejarErrorDivisionCero(mensajeErrorDivCero);
        }
    }


}

function accionBtnPunto() {
    if (punto_activado === false) {
        if (primerNumero) {
            accionNumeros('0.');
        } else {
            accionNumeros('.');
        }
    }
    punto_activado = true;
}

function accionBtnBorrar() {
    if (habilitar_borrar_pantalla_operaciones) {
        resetearPantallaOperaciones();
        habilitar_borrar_pantalla_operaciones = false;
        boton_borrar_disponible = false;
    } else if (pantalla.innerText.length > 1) {
        let caracterBorrar = pantalla.innerText.slice(-1);
        imprimirPantallaPrincipal(pantalla.innerText.slice(0, -1));
        if (caracterBorrar === '.') {
            punto_activado = false;
        }
    } else {
        resetearPantallaPrincipal();
    }
}

function reseteoTotal() {
    resetearPantallas();
    resetearValoresIniciales();
}

function resetearPantallas() {
    resetearPantallaPrincipal();
    resetearPantallaOperaciones();
}

function resetearPantallaOperaciones() {
    pantalla_operaciones.innerText = '0';
    pantalla_operaciones.classList.add('po_color');
    habilitar_borrar_pantalla_operaciones;
}

function resetearPantallaPrincipal() {
    imprimirPantallaPrincipal('0');
    resetearValoresPantallaPrincipal();
}

function resetearValoresPantallaPrincipal() {
    primerNumero = true;
    punto_activado = false;
}

function resetearValoresIniciales() {
    numeroActual = NaN;
    numeroAnterior = NaN;
    operadorSeleccionado = '';
    boton_negativo_disponible = false;
    habilitar_calculo_operadores = false;

    boton_igual_disponible = false;
    boton_porcentaje_disponible = false;
    boton_borrar_disponible = false;

    botones_operadores_disponible = true;

}

function realizarOperacion(numero1, numero2, operador) {

    switch (operador) {
        case "+":
            return Number(numero1) + Number(numero2);
        case "-":
            return Number(numero1) - Number(numero2);
        case "x":
            return Number(numero1) * Number(numero2);
        case "÷":
            if (Number(numero2) === 0) {
                throw new Error("DivisionError: No se puede dividir para 0");
            } else {
                return Number(numero1) / Number(numero2);
            }

        default:
            console.log('Hubo algún error al realizar la operación');
            return 0;
    }

}

//Todo lo que se imprima en pantalla principal debe ser llamado a esta funcion para controlar el tamaño del texto con CSS
function imprimirPantallaPrincipal(texto) {

    if (texto.toString().length >= 1 && texto.toString().length <= 10) {
        pantalla.classList.remove('tam2_texto_pant');
        pantalla.classList.remove('tam3_texto_pant');
        pantalla.classList.add('tam1_texto_pant');
    } else if (texto.toString().length > 10 && texto.toString().length <= 15) {
        pantalla.classList.remove('tam1_texto_pant');
        pantalla.classList.remove('tam3_texto_pant');
        pantalla.classList.add('tam2_texto_pant');
    }
    else if (texto.toString().length > 15) {
        pantalla.classList.remove('tam1_texto_pant');
        pantalla.classList.remove('tam2_texto_pant');
        pantalla.classList.add('tam3_texto_pant');
    }

    pantalla.innerText = texto;

}

function manejarErrorDivisionCero(mensajeError) {
    // console.error("Error de división:", error.message); // Manejo específico para DivisionError
    imprimirPantallaPrincipal(mensajeError);
    resetearValoresIniciales();
    botones_operadores_disponible = false;
}






