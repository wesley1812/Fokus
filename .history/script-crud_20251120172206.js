const adicionarTarefaBt = document.querySelector(".app__button--add-task")
const adicionarTarefaForms = document.querySelector(".app__form-add-task")
const textArea = document.querySelector(".app__form-textarea")
const ulTarefas = document.querySelector(".app__section-task-list")
const cancelarTarefaFormsBt = document.querySelector(".app__form-footer__button--cancel")
const listaTarefas = JSON.parse(localStorage.getItem("tarefas")) || []
const editarTarefaBt = document.querySelector(".app_button-edit")

const tarefaAtiva = document.querySelector('.app__section-active-task-description')
let tarefaSelecionada = null
// pra mexer com o elemento inteiro, não somente o objeto de tarefa
let liTarefaSelecionada = null


document.addEventListener("FocoFinalizado", () => {
    if(tarefaSelecionada && liTarefaSelecionada){
        liTarefaSelecionada.classList.remove("app__section-task-list-item-active")
        liTarefaSelecionada.classList.add("app__section-task-list-item-complete")
        liTarefaSelecionada.querySelector("button").setAttribute("disabled", "disabled")
    }
})


function adicionarElementoTarefa(tarefa){
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
}

function atualizarTarefa(){
    localStorage.setItem("tarefas", JSON.stringify(listaTarefas))
}

function criarElementoTarefa(tarefa){
    const li = document.createElement("li")
    li.classList.add("app__section-task-list-item")

    const svg = document.createElement("svg")
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    const paragrafo = document.createElement("p")
    paragrafo.classList.add("app__section-task-list-item-description")
    paragrafo.textContent = tarefa.descricao

    const botao = document.createElement("button")
    botao.classList.add("app_button-edit")
    
    botao.onclick = () => {
        const novaDescricao = prompt("Qual é o novo nome da tarefa?")
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefa()
        }
    }

    const imagemBotao = document.createElement("img")
    imagemBotao.setAttribute("src", "/imagens/edit.png")
    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    li.onclick = () => {
        // debugger
        document.querySelectorAll(".app__section-task-list-item-active")
        // é o mesmo que fazer for i in listaXPTO
            .forEach(elemento => {
                elemento.classList.remove("app__section-task-list-item-active")
            })

        if(tarefaSelecionada == tarefa) {
            tarefaAtiva.textContent = ""
            liTarefaSelecionada = null
            tarefaSelecionada = null
            return
        }

        if (tarefaSelecionada){
            const evento = new CustomEvent("TarefaAtiva")
            document.dispatchEvent(evento)
        }

        tarefaSelecionada = tarefa
        liTarefaSelecionada = li

        tarefaAtiva.textContent = tarefa.descricao
        
        li.classList.add("app__section-task-list-item-active")
    }

    return li
}

function esconderTarefaForms(){
    textArea.value = ""
    adicionarTarefaForms.classList.add("hidden")
}

adicionarTarefaBt.addEventListener("click", () => {
    adicionarTarefaForms.classList.toggle("hidden")
})

adicionarTarefaForms.addEventListener("submit", (evento) => {
    evento.preventDefault()
    
    const tarefa = {
        descricao: textArea.value
    }
    listaTarefas.push(tarefa)

    adicionarElementoTarefa(tarefa)
    criarElementoTarefa(tarefa)

    atualizarTarefa()
    esconderTarefaForms()
})

listaTarefas.forEach(tarefa => {
    adicionarElementoTarefa(tarefa)
});

cancelarTarefaFormsBt.addEventListener("click", () => {
    esconderTarefaForms()
})

