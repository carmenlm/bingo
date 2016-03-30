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

    //variable para identificar la celda
    var celda = 0;


    for (var i = 0; i < 5; i++) {
        var divBotones = document.createElement('div');
        divBotones.setAttribute('class', 'btn-group');
        divBotones.setAttribute('role', 'group');


        for (var j = 0; j < 5; j++) {
            //console.log("i: " + i + " / j: " + j);
            //console.log("celda " + (celda));


            var botonCelda = document.createElement('button');

            var textoNodo = document.createTextNode(celda);
            botonCelda.appendChild(textoNodo);
            botonCelda.setAttribute('class', 'btn btn-default');
            divBotones.appendChild(botonCelda);

            celda++;

            document.getElementById('panelBingo').appendChild(divBotones);

        }


    }

}

//cuando carga el window del navegador
window.onload = init;
