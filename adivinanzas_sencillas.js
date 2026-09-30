/*-----------------------------------------*/
/*--|funcionalidad_adivinanzas_sencillas|--*/
/*-----------------------------------------*/
const textoAdivinanza = document.getElementById("textoAdivinanza");
const campoRespuesta = document.getElementById("campoRespuesta");
const botonComprobar = document.getElementById("botonComprobar");
const botonNueva = document.getElementById("botonNueva");
const botonRestablecer = document.getElementById("botonRestablecer");
const resultado = document.getElementById("resultado");
const contadorAciertos = document.getElementById("contadorAciertos");
const numeroAdivinanza = document.getElementById("numeroAdivinanza");
/*------------------------------*/
/*--|datos_de_las_adivinanzas|--*/
/*------------------------------*/
const adivinanzas = [
    {
        pregunta: "Tengo agujas y no sé coser,\ntengo números y no sé leer.\n¿Qué soy?",
        respuesta: "reloj"
    },
    {
        pregunta: "Vuelo sin alas,\nlloro sin ojos.\n¿Qué soy?",
        respuesta: "nube"
    },
    {
        pregunta: "Tiene dientes y no puede comer.\n¿Qué es?",
        respuesta: "peine"
    },
    {
        pregunta: "Cuanto más le quitas,\nmás grande se vuelve.\n¿Qué es?",
        respuesta: "agujero"
    }
];
/*---------------------------------------------------*/
/*--|configuracion_adivinanzas_usando_localstorage|--*/
/*---------------------------------------------------*/
const claveAciertos = "adivinanzas_aciertos";
const claveIndice = "adivinanzas_indice";
const claveRespuesta = "adivinanzas_respuesta";
let aciertos = Number(localStorage.getItem(claveAciertos)) || 0;
let indice = Number(localStorage.getItem(claveIndice)) || 0;
/*----------------------------*/
/*--|mostrar_las_adivinanza|--*/
/*----------------------------*/
function mostrarAdivinanza() {
    const adivinanza = adivinanzas[indice];
    textoAdivinanza.textContent = adivinanza.pregunta;
    numeroAdivinanza.textContent = indice + 1;
    campoRespuesta.value = "";
    resultado.className = "resultado";
    resultado.innerHTML = `
        <i class="fa-solid fa-question"></i>
        <span>Escribe una respuesta para comenzar.</span>
    `;
}
/*--------------------------*/
/*--|mostrar_los_aciertos|--*/
/*--------------------------*/
function mostrarAciertos() {
    contadorAciertos.textContent = aciertos;
}
/*------------------------------*/
/*--|normalizar_las_respuesta|--*/
/*------------------------------*/
function normalizarRespuesta(respuesta) {
    return respuesta .toLowerCase() .trim() .normalize("NFD") .replace(/[\u0300-\u036f]/g, "");
}
/*-----------------------------*/
/*--|comprobar_las_respuesta|--*/
/*-----------------------------*/
function comprobarRespuesta() {
    const respuestaUsuario = normalizarRespuesta(campoRespuesta.value);
    const respuestaCorrecta = normalizarRespuesta(adivinanzas[indice].respuesta);
    if (respuestaUsuario === "") {
        mostrarResultado("Escribe una respuesta antes de comprobar.", "incorrecto", "fa-circle-exclamation");
        return;
    }
    localStorage.setItem(claveRespuesta, respuestaUsuario);
    if (respuestaUsuario === respuestaCorrecta) {
        aciertos++;
        localStorage.setItem(claveAciertos, aciertos);
        mostrarAciertos();
        mostrarResultado("¡Correcto! Has acertado la adivinanza.", "correcto", "fa-circle-check");
    } else {
        mostrarResultado("Respuesta incorrecta. Inténtalo nuevamente.", "incorrecto", "fa-circle-xmark");
    }
}
/*---------------------------*/
/*--|mostrar_los_resultado|--*/
/*---------------------------*/
function mostrarResultado(texto, clase, icono) {
    resultado.className = `resultado ${clase}`;
    resultado.innerHTML = `
        <i class="fa-solid ${icono}"></i>
        <span>${texto}</span>
    `;
}
/*---------------------------*/
/*--|las_nuevas_adivinanza|--*/
/*---------------------------*/
function nuevaAdivinanza() {
    indice++;
    if (indice >= adivinanzas.length) {
        indice = 0;
    }
    localStorage.setItem(claveIndice, indice);
    localStorage.removeItem(claveRespuesta);
    mostrarAdivinanza();
}
/*-------------------------------------------*/
/*--|restablecer_juego_usando_localstorage|--*/
/*-------------------------------------------*/
function restablecerJuego() {
    const confirmar = confirm("¿Quieres restablecer la puntuación y comenzar nuevamente?");
    if (!confirmar) {
        return;
    }
    aciertos = 0;
    indice = 0;
    localStorage.removeItem(claveAciertos);
    localStorage.removeItem(claveIndice);
    localStorage.removeItem(claveRespuesta);
    mostrarAciertos();
    mostrarAdivinanza();
}
/*---------------------------*/
/*--|eventos_click_a_enter|--*/
/*---------------------------*/
botonComprobar.addEventListener("click", comprobarRespuesta);
botonNueva.addEventListener("click", nuevaAdivinanza);
botonRestablecer.addEventListener("click", restablecerJuego);
campoRespuesta.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        comprobarRespuesta();
    }
});
/*----------------------*/
/*--|cargar_los_datos|--*/
/*----------------------*/
function cargarDatos() {
    mostrarAciertos();
    mostrarAdivinanza();
}
cargarDatos();