const adicionarTarefaBt = document.querySelector(".app__button--add-task")
const adicionarTarefaForms = document.querySelector(".app__form-add-task")
const textArea = document.querySelector(".app__form-textarea")
const listaTarefas = JSON.parse(localStorage.getItem("tarefas")) || []

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

    criarElementoTarefa(tarefa)
})    

