
function iniciaBadModal(bad) {
    const modal0 = document.getElementById('modal_confirmacao_falha');
    modal0.classList.add('falha'); 
    }
    const botao0 = document .querySelector('#botao-agend-cancel');
    botao0.addEventListener('click',function(){
        iniciaBadModal('modal_confirmacao_falha')
    });



function iniciaGoodModal(good) {
    const modal1 = document.getElementById('modal_confirmacao_sucesso');
    modal1.classList.add('sucesso'); 
    }

    const botao1 = document.querySelector('#botao-agend-confirm');
    botao1.addEventListener('click', function(){
        iniciaGoodModal('modal_confimacao_sucesso')
    });


<<<<<<< HEAD
function iniciaTrabalhoModal(work) {
=======
function iniciaTrabalhoModal(work){
>>>>>>> 51c540d4c2fd9fc95ef7cbe69116f6e2f0d672d2
    const modal2 = document.getElementById('modal_dia_trabalho');
    modal2.classList.add('ok');
    
    }


    const botao2 = document.querySelector('#botao-select');
    botao2.addEventListener('click', function(){
        iniciaTrabalhoModal('modal_dia_trabalho')
    });


