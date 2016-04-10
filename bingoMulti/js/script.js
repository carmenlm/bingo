/**
 * Created by Carmen on 03/04/2016.
 */

//array donde se almacenan los numero que ya han salido
var numeroUsados = new Array(76);
//init
window.onload = initAll;

/**
 * funcion que inicia cada celda, asignando un num aleatorio
 * @param celda -- posicion de una celda
 */
function iniciarCelda(celda) {
    //variable de la id de cada celda (html)
    var celdaActual = "celda" + celda;

    //array con 24 posiciones para determinar cada columna
    var columna = new Array(0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4);

    //variable para calcular la el rango de cada columna
    var baseCol = columna[celda] * 15;

    //variable para numero aleatorio
    var nuevoNum;

    //repetir el proceso mientras que el numero este repetido en numerosusados
    do {
        //sumando el rango calculado al numero aleatorio
        nuevoNum = baseCol + getNuevoNumero() + 1;
    } while (numeroUsados[nuevoNum]);

    //la posicion del array de ese numero se pone a true
    numeroUsados[nuevoNum] = true;

    //se pinta el numero en la celda
    document.getElementById(celdaActual).innerHTML = nuevoNum;

    //se inicia la clase css
    document.getElementById(celdaActual).className = "";

    //cuando se pulsa se cambia de color
    document.getElementById(celdaActual).onmousedown = cambiarColor;


}
/**
 * funcion que devuelve un numero aleatorio
 * @returns {number}
 */
function getNuevoNumero() {
    return Math.floor(Math.random() * 15);
}
/**
 * funcion que calcula si hay una combinacion ganadora en el carton
 */
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

            //aritmetica bitwise ¿?  para poner el setceldas a un numero
            //basado en cada estado del carton
            //la barra hace el bitwise "OR" de 2 valores
            //setceldas y y el valor de 2 elevado a i
            setCeldas = setCeldas | Math.pow(2, i);
        }

    }
    for (var i = 0; i < ganadores.length; i++) {

        //comprueba que cada posicion de ganadores y set celdas sea igual a la posicion de ganadores ¿?
        if ((ganadores[i] & setCeldas) == ganadores[i]) {

            //si se cumple la opcion ganadora se cambia
            //a la posicion del array ganadores que sea
            opcionGanadora = i;
        }
    }

    //si la opcionganadora es mayor que -1 (default)
    if (opcionGanadora > -1) {
        //bucle por todas las celdas
        for (var i = 0; i < 24; i++) {
            //si la opcionganadora y la potencia de 2 elevado a 1
            if (ganadores[opcionGanadora] & Math.pow(2, i)) {
                //id de la celda
                celdaActual = "celda" + i;
                //se cambia el color css de las celdas ganadoras
                document.getElementById(celdaActual).className = "ganador";
            }

        }
    }

}
/**
 * funcion que cambia el color de una celda cuando es pulsada
 * @param evt --celda pulsada (evento)
 */
function cambiarColor(evt) {
    //distingue entre ie y mozilla/chrome

    if (evt) {
        var celda = evt.target;
    } else {
        var celda = window.event.srcElement;
    }

    //si la celda vacia
    if (celda.className == "") {
        //se cambia a .elegido
        celda.className = "elegido";

    }
    //sino se cambia a vacio
    else {
        celda.className = "";
    }
    comprobarGanador();
}
/**
 * funcion para iniciar el nuevoCarton
 */
function nuevoCarton() {
    for (var i = 0; i < 24; i++) {
        iniciarCelda(i);
    }
}

/**
 * funcion para recargar el carton
 * @returns {boolean}
 */
function otroCarton() {
    for (var i = 0; i < numeroUsados.length; i++) {
        //se resetea el array de numeros usados
        numeroUsados[i] = false;
    }
    nuevoCarton();
    return false;
}
/**
 * funcion init
 */
function initAll() {

    //si existe el objeto
    if (document.getElementById) {
        document.getElementById('reload').onclick = otroCarton;
        nuevoCarton();

    } else {
        alert("Lo siento, el navegador no soporta este script")
    }


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


