let divBotones=document.querySelector("#botones");
console.log(divBotones);

let pantalla=document.querySelector("#pantalla");

divBotones.addEventListener('click', (event)=>{
    let elemento_btn = event.target;
    if (elemento_btn.classList.contains('numero')) {
        accionNumeros(elemento_btn.innerText);
    }
});

function accionNumeros(texto){
    // alert('Haz dado click en el número ' + texto);
    pantalla.innerText=texto;
}




