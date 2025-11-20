const html = document.querySelector("html");
const bgImage = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")

const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");

const startPauseBt = document.querySelector(".app__card-primary-button")
const startPauseBtIcon = document.querySelector(".app__card-primary-butto-icon")
const startPauseBtText = document.querySelector(".app__card-primary-button span")
const botoes = document.querySelectorAll('.app__card-button')

const musicBt = document.querySelector(".toggle-checkbox")
const playAudio = new Audio("./sons/play.wav")
const pause = new Audio("./sons/pause.mp3")
const finish = new Audio("./sons/beep.mp3")
const focoMusic = new Audio("./sons/luna-rise-part-one.mp3")
focoMusic.loop = true

const timerDisplay = document.querySelector("#timer")
let tempoDecorridoEmSegundos = 5
let intervaloId = null


function alterarContexto(contexto) {
    mostrarTempo()
    html.setAttribute("data-contexto", contexto)
    bgImage.setAttribute("src", `./imagens/${contexto}.png`)
    botoes.forEach(function(contexto) {
        contexto.classList.remove("active")
    })
    switch(contexto){
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade.<br>
            <strong class="app__title-strong">Mergulhe no que importa.</strong>
            `
            break
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break
    }
}

focoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 5
    alterarContexto("foco")
    focoBt.classList.add("active")
})

curtoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto("descanso-curto")
    curtoBt.classList.add("active")
})

longoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto("descanso-longo")
    longoBt.classList.add("active")
})

musicBt.addEventListener("change", () => {
    if (focoMusic.paused) {
        focoMusic.play()
    } else {
        focoMusic.pause()
    }
})

const contagemRegressiva = () => {
    document.add
    if(tempoDecorridoEmSegundos <= 0){
        finish.play()
        const focoAtivo = html.getAttribute("data-contexto") == "foco"
        if (focoAtivo){
            const evento = new CustomEvent("FocoFinalizado")
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener("click", iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        startPauseBtIcon.setAttribute("src", "./imagens/play_arrow.png")
        pause.play()
        zerar()
        return
    }
    startPauseBtIcon.setAttribute("src", "./imagens/pause.png")
    playAudio.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    startPauseBtText.textContent = "Pausar"
}

function zerar(){
    clearInterval(intervaloId)
    startPauseBtText.textContent = "Começar"
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString(`pt-br`, {minute:"2-digit", second: "2-digit"})
    timerDisplay.innerHTML = `${tempoFormatado}`
}

mostrarTempo()