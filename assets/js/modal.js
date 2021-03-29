function iniciaModal(modalID) {
    const modal = document.getElementById(modalID)
    if (modal) {
        modal.classList.add('mostrar')
        modal.addEventListener('click', (e) => {
            if (e.target.id == modalID || e.target.className == 'fechar') {
                modal.classList.remove('mostrar')
            }
        })
    }
}

const botao = document.getElementById('botao-agend-confirm')
botao.addEventListener('click', () => iniciaModal('modal-notifica'))