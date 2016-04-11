/**
 * Created by Carmen on 11/04/2016.
 */
'use strict';
var bingo = {

    /**
     * PROPIEDADES
     */

    //array donde se almacenan los numero que ya han salido
    numeroUsados: new Array(76),

    //variable para el numero de cartones con los que jugamos
    numeroCartones: 0,

    //array con colores para los cartones
    colores: new Array('Red', 'deepPink', 'OrangeRed', 'Yellow', 'Magenta', 'Green', 'Teal', 'Blue', 'Turquoise', 'Chocolate', 'Brown', 'Gray', 'Salmon', 'Pink', 'Orange', 'DarkKhaki', 'Purple', 'Olive', 'SteelBlue'),

    /**
     * METODOS
     */

    /**
     * funcion que devuelve un numero aleatorio
     * @returns {number}
     */
    getNuevoNumero: function () {
        return Math.floor(Math.random() * 15);
    },

    /**
     * funcion para resetear los numeros usados en el carton
     */
    resetearCarton: function () {
        for (var i = 0; i < bingo.numeroUsados.length; i++) {
            //se resetea el array de numeros usados
            bingo.numeroUsados[i] = false;
        }
    },

    /**
     * funcion que inicia cada celda, asignando un num aleatorio
     * @param celda -- posicion de una celda
     * @param carton -- carton que tengo que pintar
     */
    iniciarCeldas: function (celda, carton) {
        //variable de la id de cada celda (html)
        var celdaActual = carton + "celda" + celda;

        //array con 24 posiciones para determinar cada columna
        var columna = new Array(0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4);

        //variable para calcular la el rango de cada columna
        var baseCol = columna[celda] * 15;

        //variable para numero aleatorio
        var nuevoNum;

        //repetir el proceso mientras que el numero este repetido en numerosusados
        do {

            //sumando el rango calculado al numero aleatorio
            nuevoNum = baseCol + bingo.getNuevoNumero() + 1;

        } while (bingo.numeroUsados[nuevoNum]);

        //la posicion del array de ese numero se pone a true
        bingo.numeroUsados[nuevoNum] = true;

        //se pinta el numero en la celda
        document.getElementById(celdaActual).innerHTML = nuevoNum;

        //se inicia la clase css
        document.getElementById(celdaActual).className = "";
    },

    /**
     * funcion que va a devolver la cadena html con el carton
     * @param id --numero del carton
     * @returns {string} --cadena para incrustar en el html
     */
    pintarCarton: function (id) {

        var cadenaHtml = '<div id="carton' + id + '">' +
            '<h2>Cartón ' + id + '</h2>' +
            '<table>' +
            '<tr>' +
            '<th class="' + id + 'cabecera">B</th>' +
            '<th class="' + id + 'cabecera">I</th>' +
            '<th class="' + id + 'cabecera">N</th>' +
            '<th class="' + id + 'cabecera">G</th>' +
            '<th class="' + id + 'cabecera">O</th>' +
            '</tr>' +
            '<tr>' +
            '<td id="' + id + 'celda0"></td>' +
            '<td id="' + id + 'celda5"></td>' +
            '<td id="' + id + 'celda10"></td>' +
            '<td id="' + id + 'celda14"></td>' +
            '<td id="' + id + 'celda19"></td>' +
            '</tr>' +
            '<tr>' +
            '<td id="' + id + 'celda1"></td>' +
            '<td id="' + id + 'celda6"></td>' +
            '<td id="' + id + 'celda11"></td>' +
            '<td id="' + id + 'celda15"></td>' +
            '<td id="' + id + 'celda20"></td>' +
            '</tr>' +
            '<tr>' +
            '<td id="' + id + 'celda2"></td>' +
            '<td id="' + id + 'celda7"></td>	' +
            '<td id="libre">LIBRE</td>	' +
            '<td id="' + id + 'celda16"></td>	' +
            '<td id="' + id + 'celda21"></td>' +
            '</tr>' +
            '<tr>' +
            '<td id="' + id + 'celda3"></td>	' +
            '<td id="' + id + 'celda8"></td>	' +
            '<td id="' + id + 'celda12"></td>	' +
            '<td id="' + id + 'celda17"></td>	' +
            '<td id="' + id + 'celda22"></td>	' +
            '</tr>	' +
            '<tr>	' +
            '<td id="' + id + 'celda4"></td>' +
            '<td id="' + id + 'celda9"></td>	' +
            '<td id="' + id + 'celda13"></td>	' +
            '<td id="' + id + 'celda18"></td>	' +
            '<td id="' + id + 'celda23"></td>	' +
            '</tr>	' +
            '</table>' +
            '<div>';

        return cadenaHtml;
    },
    /**
     * funcion que va a `pintar los cartones en el html
     */
    agregarCarton: function () {
        //string para la cadena html del carton
        var contenido;
        for (var i = 0; i < bingo.numeroCartones; i++) {


            //llamo a la funcion de pintar
            contenido = bingo.pintarCarton(i);
            //la cadena la incrusto en el html
            document.getElementById('contenido').innerHTML += contenido;


            var claseCabecera = i + "cabecera";
            var celdas = document.getElementsByClassName(claseCabecera);

            for (var j = 0; j < celdas.length; j++) {
                celdas[j].style.backgroundColor = bingo.colores[i];
            }


            //recorro las celdas
            for (var j = 0; j < 24; j++) {
                //pinto los numeros aleatorios en cada celda
                bingo.iniciarCeldas(j, i);
            }
            //reseteo los numeros usados para crear un nuevo carton
            bingo.resetearCarton();

        }
        //al final reseteo los numeros usados para poder ir sacandolos
        bingo.resetearCarton();
    },

    /**
     * funcion que cambia el color de una celda cuando sale un numero aleatorio
     */
    comprobarGanador: function (carton) {

        //TODO repasar el ganador


        //inicia la opcion a -1
        //alamcena cual de las posibles opciones ganadoras ha pulsado el usuario
        var opcionGanadora = -1;

        //inicia las celdas a 0
        //almacena las celdas que han sido pulsadas
        var setCeldas = 0;
        //array con valores que una posible linea ganadora
        var ganadores = new Array(31, 992, 15360, 507904, 541729, 557328, 1083458, 2162820, 4329736, 8519745, 8659472, 16252928);

        //variable para cuando gane, se acabe la partida
        var bandera = false;


        for (var i = 0; i < 24; i++) {

            var celdaActual = carton + "celda" + i;


            //si la celda actual tiene clase distinto de vacio
            if (document.getElementById(celdaActual).className != "") {
                //se pone la clase a elegido (redundante)
                document.getElementById(celdaActual).className = "elegido";

                //aritmetica bitwise para poner el setceldas a un numero basado en cada estado del carton
                //la barra hace el bitwise "OR" de 2 valores setceldas y el valor de 2 elevado a i
                setCeldas = setCeldas | Math.pow(2, i);
            }

        }
        for (var i = 0; i < ganadores.length; i++) {

            //comprueba que cada posicion de ganadores y set celdas sea igual a la posicion de ganadores
            if ((ganadores[i] & setCeldas) == ganadores[i]) {

                //si se cumple la opcion ganadora se cambia a la posicion del array ganadores que sea
                opcionGanadora = i;
            }

            //si la opcionganadora es mayor que -1 (default)
            if (opcionGanadora > -1) {

                //bucle por todas las celdas
                for (var i = 0; i < 24; i++) {
                    //si la opcionganadora y la potencia de 2 elevado a 1
                    if (ganadores[opcionGanadora] & Math.pow(2, i)) {
                        //id de la celda
                        celdaActual = carton + "celda" + i;
                        console.log(celdaActual);
                        //se cambia el color css de las celdas ganadoras
                        document.getElementById(celdaActual).className = "ganador";
                        bandera = true;
                    }
                }
            }
        }

        //cuando gane deshabilito el boto de sacar bola, asi no puede sacar más bola
        if (bandera) {
            document.getElementById('sacar').disabled = true;
        }
    },

    /**
     * funcion que cambia el color de una celda cuando sale un numero aleatorio
     */
    comenzarJuego: function () {
        //variable para almacenar el numero aleatorio
        var bola;

        //saco un numero aleatorio, mientras que ese numero ya este en el array de num usados
        do {

            //numero aleatorio
            bola = Math.floor(Math.random() * 75) + 1;

        } while (bingo.numeroUsados[bola]);

        //se cambia el array de numeros usados
        bingo.numeroUsados[bola] = true;


        //recorremos los cartones que tenemos para saber si la bola esta o no
        for (var i = 0; i < bingo.numeroCartones; i++) {
            //recorro las celdas
            for (var j = 0; j < 24; j++) {
                //variable con la id de la celda
                var celda = document.getElementById(i + 'celda' + j);
                //si la id celda es igual a la bola sacada
                if (celda.innerHTML == bola) {
                    //cambio el color
                    celda.className = "elegido";
                    celda.style.backgroundColor = bingo.colores[i];
                }

            }


            //compruebo cada vez que pinto una celda si hay un ganador
            bingo.comprobarGanador(i);

        }

        //pinto los numero que vamos sacando
        document.getElementById('numeroAleatorio').innerHTML += " " + bola + " ";

    },
    /**
     * funcion init
     */
    init: function () {
//si existe el objeto
        if (document.getElementById) {

            console.log('empiezo');


            //al hacer click en el boton jugar
            document.getElementById('btnJugar').addEventListener('click', function () {

                //variable con los cartones que tengo
                bingo.numeroCartones = document.getElementById('cartones').value;

                //deshabilito el boton de jugar
                document.getElementById('btnJugar').disabled = true;


                //reseteo los div
                document.getElementById('contenido').innerHTML = "";
                document.getElementById('numeroAleatorio').innerHTML = "";

                //habilito el boton de sacar bola
                document.getElementById('sacar').disabled = false;

                //pinto los cartones
                bingo.agregarCarton();


                //cuando hago click en sacar bola
                document.getElementById('sacar').addEventListener('click', function () {
                    //comienzo el juego
                    bingo.comenzarJuego();

                });

            });

            document.getElementById('btnReset').addEventListener('click', function () {
                location.reload();
                //deshabilito el boton de sacar bola jugar
                document.getElementById('sacar').disabled = true;

                //habilito el boton de jugar
                document.getElementById('btnJugar').disabled = false;
            });

        } else {
            alert("Lo siento, el navegador no soporta este script")
        }
    }

};
window.onload = bingo.init;
