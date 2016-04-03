/**
 * Created by Carmen on 03/04/2016.
 */

var numeroUsados = new Array(76);
window.onload = initAll;


function iniciarCelda(celda) {
    var celdaActual = "celda" + celda;


    var columna = new Array(0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4);

    var baseCol = columna[celda] * 15;

    var nuevoNum;

    do {
        nuevoNum = baseCol + getNuevoNumero() + 1;
    } while (numeroUsados[nuevoNum]);

    numeroUsados[nuevoNum] = true;
    document.getElementById(celdaActual).innerHTML = nuevoNum;
    document.getElementById(celdaActual).className = "";
    document.getElementById(celdaActual).onmousedown = cambiarColor;


}
function getNuevoNumero() {
    return Math.floor(Math.random() * 15);
}
function comprobarGanador() {

    var opcionGanadora = -1;
    var setCeldas = 0;
    var ganadores = new Array(31, 992, 15360, 507904, 541729, 557328, 1083458, 2162820, 4329736, 8519745, 8659472, 16252928);

    for (var i = 0; i < 24; i++) {
        var celdaActual = "celda " + i;
        if (document.getElementById(celdaActual).className != "") {
            document.getElementById(celdaActual).className = "elegido";
            setCeldas = setCeldas | Math.pow(2, i);
        }

    }
    for (var i = 0; i < ganadores.length; i++) {
        if ((ganadores[i] & setCeldas) == ganadores[i]) {
            opcionGanadora = i;
        }
    }

    if (opcionGanadora > -1) {
        for (var i = 0; i < 24; i++) {
            if (ganadores[opcionGanadora] & Math.pow(2, i)) {
                celdaActual = "celda" + i;
                document.getElementById(celdaActual).className = "ganador";
            }

        }
    }

}
function cambiarColor(evt) {
    if (evt) {
        var celda = evt.target;
    } else {
        var celda = window.event.srcElement;
    }

    if (celda.className == "") {
        celda.className = "elegido";
    } else {
        celda.className = "";
    }
    comprobarGanador();
}
function nuevoCarton() {
    for (var i = 0; i < 24; i++) {
        iniciarCelda(i);
    }
}

function otroCarton() {
    for (var i = 0; i < numeroUsados.length; i++) {
        numeroUsados[i] = false;
    }
    nuevoCarton();
    return false;
}
function initAll() {

    //si existe el objeto
    if (document.getElementById) {
        document.getElementById('reload').onclick = otroCarton;
        nuevoCarton();

    } else {
        alert("Lo siento, el navegador no soporta este script")
    }


}

