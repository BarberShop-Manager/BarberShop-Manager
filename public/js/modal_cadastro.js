
function iniciaBadModal(bad) {
    const modal0 = document.getElementById('modal_confirmacao_falha');
    modal0.classList.add('falha');
}
const botao0 = document.querySelector('#botao-agend-cancel');
botao0.addEventListener('click', function () {
    iniciaBadModal('modal_confirmacao_falha')
});



function iniciaGoodModal(good) {
    const modal1 = document.getElementById('modal_confirmacao_sucesso');
    modal1.classList.add('sucesso');
}

const botao1 = document.querySelector('#botao-agend-confirm');
botao1.addEventListener('click', function () {
    iniciaGoodModal('modal_confimacao_sucesso')
});


function iniciaTrabalhoModal(work) {
    const modal2 = document.getElementById('modal-dia-trabalho');
    if (modal2) {
        modal2.classList.add('ok')
        modal2.addEventListener('click', (e) => {
            if (e.target.id == work || e.target.className == 'fechar') {
                modal2.classList.remove('ok')
            }
        })
    }
}


const botao2 = document.querySelector('#dias-de-trabalho');
botao2.addEventListener('click', function () {
    iniciaTrabalhoModal('modal-dia-trabalho')
});


