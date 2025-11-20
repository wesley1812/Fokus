const adicionarTarefaBt = document.querySelector(".app__button--add-task")
const adicionarTarefaForms = document.querySelector(".app__form-add-task")
const textArea = document.querySelector(".app__form-field")

adicionarTarefaBt.addEventListener("click", () => {
    const tarefa = textArea.value
    
    adicionarTarefaForms.classList.toggle("hidden")
    localStorage.setItem(JSON.tarefa)
})