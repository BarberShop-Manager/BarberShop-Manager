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

var x = window.matchMedia("(min-width: 992px)")
myFunction(x) // Chama a função que observa em tempo de execução
x.addListener(myFunction)

function Filtro() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("texbusca");
    filter = input.value.toUpperCase();
    ul = document.getElementById("ulFuncs");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}