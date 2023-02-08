const form = document.getElementById('novoItem')
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem('itens')) || []

itens.forEach(elemento => {
    criaAtividade(elemento)
});

form.addEventListener('submit', (evento)=> {
    evento.preventDefault()

    const atividade = evento.target.elements['atividade']
    const horario = evento.target.elements['horario']
    
    const existe = itens.find(elemento => elemento.atividade === atividade.value)

    const itemAtual = {
        'atividade': atividade.value,
        'horario': horario.value
    }

    if (existe) {
        itemAtual.id = existe.id
        atualizaAtividade(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0

        criaAtividade(itemAtual)

        itens.push(itemAtual)
    }

    
    localStorage.setItem('itens', JSON.stringify(itens))
   
    atividade.value = ''
    horario.value = ''
})

function criaAtividade(item) {
    const novaAtividade = document.createElement('li')
    novaAtividade.classList.add('item')

    const horarioItem = document.createElement('strong')
    horarioItem.innerHTML = item.horario
    horarioItem.dataset.id = item.id
    novaAtividade.appendChild(horarioItem)

    novaAtividade.innerHTML += item.atividade

    novaAtividade.appendChild(botaoDeleta(item.id))

    lista.appendChild(novaAtividade)

}

function atualizaAtividade(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML=item.horario
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement('button')
    elementoBotao.innerText = 'x'
    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento=>elemento.id === id), 1)
    localStorage.setItem('item', JSON.stringify(itens))
}