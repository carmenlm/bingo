/**
 * Created by Carmen on 04/04/2016.
 */

//array de palabras
var palabras = new Array("Aggregate", "Ajax", "API", "Bandwidth", "Beta", "Bleeding edge", "Convergence", "Design pattern", "Disruptive", "DRM", "Enterprise", "Facilitate", "Folksonomy", "Framework", "Impact", "Innovate", "Long tail", "Mashup", "Microformats", "Mobile", "Monetize", "Open social", "Paradigm", "Podcast", "Proactive", "Rails", "Scalable", "Social bookmarks", "Social graph", "Social software", "Spam", "Synergy", "Tagging", "Tipping point", "Truthiness", "User-generated", "Vlog", "Webinar", "Wiki", "Workflow");

var palabrasUsadas = new Array(palabras.length);

window.onload = initAll;

function initAll() {
    //si existe el objeto
    if (document.getElementById) {
        document.getElementById('reload').onclick = otroCarton;
        nuevoCarton();
    } else {
        alert('Lo siento, tu navegador no soporta este script');
    }
}

function nuevoCarton() {

    //bucle para crear todas las celdas
    for (var i = 0; i < 24; i++) {
        iniciaCelda(i);
    }
    ;

}

function iniciaCelda(celda) {

    //mientras que el numero alatorio no este en el array de palabras aleatorias
    do {
        //saco un numero aleatorio, de rango longitud array palabras
        var palabraAleatoria = Math.floor((Math.random() * palabras.length));

    } while (palabrasUsadas[palabraAleatoria]);

    //asigno la posicion (numero aleatorio), en el array de palabras usadas a true
    palabrasUsadas[palabraAleatoria] = true;

    //id de la celda
    var celdaActual = "celda" + celda;

    //pinto la palabra aleatoria en el html
    document.getElementById(celdaActual).innerHTML = palabras[palabraAleatoria];
    //le asigno una class (css)
    document.getElementById(celdaActual).className = "";
    //si pulso la celda se cambia el color
    document.getElementById(celdaActual).onmousedown = cambiaColor;

}

function otroCarton() {
    //bucle que reseta el array de palabras usadas
    for (var i = 0; i < palabras.length; i++) {
        palabrasUsadas[i] = false;

    }
    ;
    nuevoCarton();
    return false;

}

function cambiaColor(evt) {

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
    ;

    comprobarGanador();

}

function comprobarGanador() {
    //inicia la opcion a -1
    //alamcena cual de las posibles opciones ganadoras ha pulsado el usuario
    var opcionGanadora = -1;

    //inicia las celdas a 0
    //almacena las celdas que han sido pulsadas
    var setCeldas = 0;

    //array con valores que una posible linea ganadora
    var ganadores = new Array(31, 992, 15360, 507904, 541729, 557328, 1083458, 2162820, 4329736, 8519745, 8659472, 16252928);

    for (var i = 0; i < 24; i++) {
        var celdaActual = "celda" + i;
        //si la celda actual tiene clase distinto de vacio
        if (document.getElementById(celdaActual).className != "") {
            //se pone la clase a elegido (redundante)
            document.getElementById(celdaActual).className = "elegido";
            //aritmetica bitwise para poner el setceldas a un numero
            //basado en cada estado del carton
            //la barra hace el bitwise "OR" de 2 valores
            //setceldas y y el valor de 2 elevado a i
            setCeldas = setCeldas | Math.pow(2, i);
        }
        ;
    }
    ;

    for (var i = 0; i < ganadores.length; i++) {
        //comprueba que cada posicion de ganadores y set celdas sea igual a la posicion de ganadores
        if ((ganadores[i] & setCeldas) == ganadores[i]) {
            //si se cumple la opcion ganadora se cambia
            //a la posicion del array ganadores que sea
            opcionGanadora = i;
        }
        ;
    }
    ;

    //si la opcionganadora es mayor que -1 (default)
    if (opcionGanadora > -1) {
        //bucle por todas las celdas
        for (var i = 0; i < 24; i++) {
            //si la opcionganadora y la potencia de 2 elevado a 1
            if (ganadores[opcionGanadora] & Math.pow(2, i)) {

                celdaActual = "celda" + i;
                //se cambia el color css de las celdas ganadoras
                document.getElementById(celdaActual).className = "ganador";
            }
            ;

        }
        ;
    }
    ;

}

function pintarCarton() {

    var cadenaHtml = '<table>' +
        '<tr>' +
        '<th>B</th>' +
        '<th>I</th>' +
        '<th>N</th>' +
        '<th>G</th>' +
        '<th>O</th>' +
        '</tr>' +
        '<tr>' +
        '<td id="celda0"></td>' +
        '<td id="celda5"></td>' +
        '<tdid="celda10"></td>' +
        '<td id="celda14"></td>' +
        '<td id="celda19"></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="celda1"></td>' +
        '<td id="celda6"></td>' +
        '<td id="celda11"></td>' +
        '<tdid="celda15"></td>' +
        '<td id="celda20"></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="celda2"></td>' +
        '<td id="celda7"></td>	' +
        '<td id="libre">LIBRE</td>	' +
        '<td id="celda16"></td>	' +
        '<tdid="celda21"></td>' +
        '</tr>' +
        '<tr>' +
        '<td id="celda3"></td>	' +
        '<td id="celda8"></td>	' +
        '<td id="celda12"></td>	' +
        '<td id="celda17"></td>	' +
        '<td id="celda22"></td>	' +
        '</tr>	' +
        '<tr>	' +
        '<td id="celda4"></td>' +
        '<td id="celda9"></td>	' +
        '<td id="celda13"></td>	' +
        '<td id="celda18"></td>	' +
        '<td id="celda23"></td>	' +
        '</tr>	' +
        '</table>';


}

