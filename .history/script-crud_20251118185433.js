const adicionarTarefaBt = document.querySelector(".app__button--add-task")
const adicionarTarefaForms = document.querySelector(".app__form-add-task")
const textArea = document.querySelector(".app__form-textarea")

adicionarTarefaBt.addEventListener("click", () => {
    adicionarTarefaForms.classList.toggle("hidden")
})

FORMS