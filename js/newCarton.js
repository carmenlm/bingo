/** Created by carmen on 30/03/16. */

//todo hacer marcado de celdas automaticamente ¿?
//todo añadir combinaciones ganadoras
//todo poner boton para reiniciar
//todo poner div con los numero que van saliendo
/**
 * init
 */
function init() {
    nuevoCarton();
    pintarNumeros();
    marcarNumeros();
    sacarBola();

}
/**
 * funcion para ir marcando los numeros ganadores que tengo en mi carton
 */
function marcarNumeros() {
    //capturo todos los botones
    var botones = document.getElementsByClassName('botonesBingo');

    //array numero marcados iniciado a 24 posicion (0)
    var marcados = new Array();

    for (var i = 0; i < 25; i++) {
        //la casilla 12 es el comodin, siempre esta a 1
        if (i == 12) {
            marcados[i] = 1;
        } else {
            marcados[i] = 0;
        }
    }


    //bucle para recorrer todos los botones
    for (var i = 0; i < botones.length; i++) {


        //le pongo el event listener, click -- desactivo boton
        botones[i].addEventListener('click', function () {
            //selecciono el id de la celda pulsada
            var id = this.id;
            //capturo la celda con la id pulsada
            var celda = document.getElementById(id);
            //desactivo el boton pulsada
            celda.setAttribute('disabled', 'disabled');
            //lo cambio de color
            celda.setAttribute('class', 'btn btn-success botonesBingo');

            //variable con la posicion de la celda
            var pos = id.slice(5);

            //cambio a 1 la posicion de la celda en el array para comprobar cuando gana
            marcados[pos] = 1;


            //compruebo si el array es ganador
            comprobarCarton(marcados);
        });

    }


}

/**
 * funcion que va a comprobar posicion a posicion si el array pasado es igual a los
 * tengo almacendos como ganadores
 * si son los dos arrays iguales, el usuario gana el juego
 * @param array -- numeros marcados por el usuario
 */
function comprobarCarton(array) {

    //carton ganador 1
    var ganador1 = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var ganador2 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var ganador3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var ganador4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
    var ganador5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1];


    //array con todos los cartones ganadores
    var ganadores = [ganador1, ganador2, ganador3, ganador4, ganador5];

    //bucle que recorre todas las combinaciones
    for (var i = 0; i < ganadores.length; i++) {

        //alamceno cada array ganador
        var ganador = ganadores[i];

        //compruebo si son iguales (misma longitud, y cada par iguales en la misma posicion
        var iguales = ganador.length == array.length && ganador.every(function (element, index) {
                return element === array[index];
            });


        if (iguales) {
            //imprimo un mensaje en el div
            document.getElementById('ganador').innerHTML = "Has ganado";

            //TODO cerrar la aplicacion
        }


    }


}

/**
 * funcion que va a sacar los numeros ganadores de bingo y lo va a mostrar en pantalla (ultimo)
 * @returns {Array} -- almancenados todos los numeros gandarores
 */
function sacarBola() {

    //capturo el boton de sacar bola
    var boton = document.getElementById('btnLanzar');

    //array donde almaceno los numero que ya han salido
    var guardados = new Array();

    //inicio el numero aleatorio
    var numero = 0;

    //evento click
    boton.addEventListener('click', function () {

        //saco un numero aleatorio 1-75

        //saco numero mientras no este duplicado
        do {
            //numero aleatorio del 1 - 75
            numero = Math.floor(Math.random() * 75) + 1;

        } while (comprobarNumeroDuplicado(numero, guardados))

        guardados.push(numero);
        console.log(guardados);

        document.getElementById('numero').innerHTML = numero;

    });


    //devuelvo el array completo de numeros guardados
    return guardados;

}


/**
 * Funcion para crear el carton
 */
function nuevoCarton() {
    //variable para poner el numero de la celda
    var celda = 0;

    //variable id contador para la celda
    var id = 0;

    //bucle para crear las 5 columnas
    for (var i = 0; i < 5; i++) {

        //div1 para cada fila (bootstrap)
        var divFila1 = document.createElement('div');
        divFila1.setAttribute('class', 'btn-group btn-group-justified');
        divFila1.setAttribute('role', 'group');

        //bucle para crear las 5 filas
        for (var j = 0; j < 5; j++) {

            //div2 para cada fila (bootstrap)
            var divFila2 = document.createElement('div');
            divFila2.setAttribute('class', 'btn-group');
            divFila2.setAttribute('role', 'group');

            //cada celda es un boton para luego ir desactivandolos
            var botonCelda = document.createElement('button');
            botonCelda.setAttribute('class', 'btn btn-primary botonesBingo');
            botonCelda.setAttribute('role', 'group');
            botonCelda.setAttribute('id', 'celda' + id);

            //incremento id
            id++;

            //añado el boton a la div2
            divFila2.appendChild(botonCelda);

            //añado el div2 al div 1 (bootstrap)
            divFila1.appendChild(divFila2);


            document.getElementById('panelBingo').appendChild(divFila1);


        }


    }

    //la casilla 12 esta desactivada por defecto

    var celda12 = document.getElementById('celda12');
    //desactivo el boton pulsada
    celda12.setAttribute('disabled', 'disabled');
    //lo cambio de color
    celda12.setAttribute('class', 'btn btn-warning botonesBingo');


}

/**
 * funcion para crear array con los numeros de cada carton
 * @returns {Array} -- con los numero en la pos corresp.
 */
function crearArrayNumerosAleatorios() {
    //inicio de la variable numero aleatorio
    var numero = 0;

    //array para almacenar un numero en la posicion del carton
    var arrayNumeros = new Array(24);
    console.log(arrayNumeros);

    //bucle por cada columna
    for (var i = 0; i < 5; i++) {
        var contador = i;
        //bucle por cada fila
        for (var j = 0; j < 5; j++) {

            /*
             * En cada caso (valor de la columna i):
             * 1/ saco un numero aleatorio
             * 2/ lo añado a un array en la posicion de carton que le corresponda, sin duplicados
             * 3/ aumento el contador a 5, itera por columnas
             */
            switch (i) {
                case 0:
                    do {
                        numero = devolverRandom() + 1;
                    } while (comprobarNumeroDuplicado(numero, arrayNumeros));
                    arrayNumeros[contador] = numero;
                    //arrayNumeros.splice(contador, 0, numero);
                    contador = contador + 5;
                    break;
                case 1:
                    do {
                        numero = devolverRandom() + 16;
                    } while (comprobarNumeroDuplicado(numero, arrayNumeros));
                    arrayNumeros[contador] = numero;
                    //arrayNumeros.splice(contador, 0, numero);
                    contador = contador + 5;
                    break;
                case 2:

                    do {
                        numero = devolverRandom() + 31;
                    } while (comprobarNumeroDuplicado(numero, arrayNumeros));
                    arrayNumeros[contador] = numero;
                    //arrayNumeros.splice(contador, 0, numero);
                    contador = contador + 5;
                    break;
                case 3:
                    do {
                        numero = devolverRandom() + 46;
                    } while (comprobarNumeroDuplicado(numero, arrayNumeros));
                    arrayNumeros[contador] = numero;
                    //arrayNumeros.splice(contador, 0, numero);
                    contador = contador + 5;
                    break;
                case 4:
                    do {
                        numero = devolverRandom() + 61;
                    } while (comprobarNumeroDuplicado(numero, arrayNumeros));
                    arrayNumeros[contador] = numero;
                    //arrayNumeros.splice(contador, 0, numero);
                    contador = contador + 5;
                    break;
            }

        }


    }


    //la posicion 12 (centro) se queda vacia (comodin)
    arrayNumeros[12] = "LIBRE";


    return arrayNumeros;

}

/**
 * funcion para devolver un random con un rango de 15 numeros
 * @returns {number}
 */
function devolverRandom() {
    return Math.floor(Math.random() * 15);

}

/**
 * funcion para pintar en cada celda el numero correspondiente del array
 */
function pintarNumeros() {
    //variable con el array de numeros
    var numeros = crearArrayNumerosAleatorios();
    //recorro las 24 posicion del carton
    for (var i = 0; i < 25; i++) {

        //valor del id de cada celda
        var id = "celda" + i;

        //incrusto en el html el valor en el button
        document.getElementById(id).innerHTML = numeros[i];

    }
}

function comprobarNumeroDuplicado(valor, array) {
    if (array.indexOf(valor) == -1) {
        return false;
    }
    else {
        return true;
    }

}

//cuando carga el window del navegador
window.onload = init;
