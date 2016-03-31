/**
 * Created by carmen on 30/03/16.
 */

/**
 * init
 */
function init() {


    newCard();


}


/**
 * Funcion para crear el carton
 */
function newCard() {
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

            //TODO asignar el valor
            //celda =

            //div2 para cada fila (bootstrap)
            var divFila2 = document.createElement('div');
            divFila2.setAttribute('class', 'btn-group');
            divFila2.setAttribute('role', 'group');


            //cada celda es un boton para luego ir desactivandolos
            var botonCelda = document.createElement('button');

            //TODO poner numeros aleatorios en cada columna cada intervalo
            //var textoNodo = document.createTextNode(celda);
            //botonCelda.appendChild(textoNodo);
            botonCelda.setAttribute('class', 'btn btn-primary');
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
    asignarNumeroAleatorio();


}
/**
 *
 * @param columna (letra B / I / N / G / O) -- depende de la columna tiene un rango
 * funcion para asignar un valor a la celda -- numero aleatorio
 */
function asignarNumeroAleatorio() {
    //inicio de la variable numero aleatorio
    var numero = 0;

    var arrayCeldas = [];

    for (var i = 0; i < 5; i++) {
        var contador = i;
        for (var j = 0; j < 5; j++) {
            //variable celda
            var celda = "celda" + contador;

            console.log(contador);

            console.log("i " + i + " / j " + j);


            switch (i) {
                case 0:
                    numero = Math.floor(Math.random() * 15) + 1;
                    document.getElementById(celda).innerHTML = numero;
                    contador = contador + 5;
                    break;
                case 1:
                    numero = Math.floor(Math.random() * 15) + 16;
                    document.getElementById(celda).innerHTML = numero;
                    contador = contador + 5;
                    break;
                case 2:
                    numero = Math.floor((Math.random() * 15) + 31);
                    document.getElementById(celda).innerHTML = numero;
                    contador = contador + 5;
                    break;
                case 3:
                    numero = Math.floor((Math.random() * 15) + 46);
                    document.getElementById(celda).innerHTML = numero;
                    contador = contador + 5;
                    break;
                case 4:
                    numero = Math.floor((Math.random() * 15) + 61);
                    document.getElementById(celda).innerHTML = numero;
                    contador = contador + 5;
                    break;
            }

        }


    }


}

//cuando carga el window del navegador
window.onload = init;
