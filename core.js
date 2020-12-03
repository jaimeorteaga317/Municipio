/**
* @author JOE
* @date 03/12/2020
* @description Funcion para la tabla, efecto expandir
* @param
* @return
*/
function myAccFunc(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}
function Alert(id) {
    //var facturar = document.getElementById(facturar);
    //var imprimir = document.getElementById(imprimir);

    if (id == "facturar") {
        alert("Facturar");
    }
    if (id == "imprimir") {
        alert("imprimir");
    }
    else {
        alert(id);
    }
}
