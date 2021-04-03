var menu = "0"

//Função que oberseva o tamanho da tela

function myFunction(x) {
    if (x.matches) { // Se a tela for desktop
        menu = "25%"
    } else { //Se a tela for mobile
        menu = "50%"
    }
}

function abrir_menu() {
    document.getElementById("menu").style.width = menu
    document.getElementById("esconder").style.width = "100%"
}

function fechar_menu() {
    document.getElementById("menu").style.width = "0"
    document.getElementById("esconder").style.width = "0"
}

<<<<<<< HEAD
var x = window.matchMedia("(min-width: 1366px)")
myFunction(x) // Chama a função que observa em tempo de execução
x.addListener(myFunction) 
=======
var x = window.matchMedia("(min-width: 992px)")
myFunction(x) // Chama a função que observa em tempo de execução
x.addListener(myFunction)
>>>>>>> frontend-cliente
