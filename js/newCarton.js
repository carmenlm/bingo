/** Created by carmen on 30/03/16. */

/**
 * init
 */
function init() {
    nuevoCarton();
    pintarNumeros();
    manejadorBotones();


}
/**
 * funcion para añadir eventlistener a cada boton de las celdas
 */
function manejadorBotones() {
    //capturo todos los botones
    var botones = document.getElementsByClassName('botonesBingo');

    //bucle para recorrer todos los botones
    for (var i = 0; i < botones.length; i++) {

        //TODO que se vaya añadiendo la posicion seleccionada a un array, para luego comparar con los arrays de los cartones ganadores ¿?
        //le pongo el event listener, click -- desactivo boton
        botones[i].addEventListener('click', function () {
            //selecciono el id de la celda pulsada
            var id = this.id;
            //capturo la celda con la id pulsada
            var celda = document.getElementById(id);
            //desactivo el boton pulsada
            celda.setAttribute('disabled', 'disabled');
        });

    }


}

function sacarBola() {

    //capturo el boton de sacar bola
    var boton = document.getElementById('btnLanzar');

    //evento click
    boton.addEventListener('click', function () {

        //saco un numero aleatorio 1-75
        //TODO hacer como el usednums

    });

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


            //TODO poner en el div correspondiente
            document.getElementById('panelBingo').appendChild(divFila1);


        }


    }


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


    //la posicion 12 (centro) se queda vacia
    //TODO poner desactivado la pos 12 por defecto
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
