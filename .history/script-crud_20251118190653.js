const adicionarTarefaBt = document.querySelector(".app__button--add-task")
const adicionarTarefaForms = document.querySelector(".app__form-add-task")
const textArea = document.querySelector(".app__form-textarea")
const listaTarefas = []

adicionarTarefaBt.addEventListener("click", () => {
    adicionarTarefaForms.classList.toggle("hidden")
})

adicionarTarefaForms.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const tarefa = {
        descricao: textArea.value
    }
    listaTarefas.push(tarefa)
    localStorage.setItem("tarefas", JSON.stringify(listaTarefas))
})

function criarTarefa(tarefa){
    const li = document.createElement("li")

    
}