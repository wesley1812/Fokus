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
const play = new Audio("./sons/play.wav")
const pause = new Audio("./sons/pause.mp3")
const 

const focoMusic = new Audio("./sons/luna-rise-part-one.mp3")
focoMusic.loop = true

const timerDisplay = document.querySelector("#timer")
let tempoDecorridoEmSegundos = 5000
let intervaloId = null


function alterarContexto(contexto) {
    botoes.forEach(function(contexto) {
        contexto.classList.remove("active")
    })
    switch(contexto){
        case "foco":
            bgImage.setAttribute("src", "./imagens/foco.png")
            html.setAttribute("data-contexto", "foco")
            titulo.innerHTML = `
            Otimize sua produtividade.<br>
            <strong class="app__title-strong">Mergulhe no que importa.</strong>
            `
            break
        case "descanso-curto":
            bgImage.setAttribute("src", "./imagens/descanso-curto.png")
            html.setAttribute("data-contexto", "descanso-curto")
            titulo.innerHTML = `
            Que tal dar uma respirada? <br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break
        case "descanso-longo":
            bgImage.setAttribute("src", "./imagens/descanso-longo.png")
            html.setAttribute("data-contexto", "descanso-longo")
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break
    }
}

focoBt.addEventListener("click", () => {
    alterarContexto("foco")
    focoBt.classList.add("active")
})

curtoBt.addEventListener("click", () => {
    alterarContexto("descanso-curto")
    curtoBt.classList.add("active")
})

longoBt.addEventListener("click", () => {
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
    if(tempoDecorridoEmSegundos <= 0){
        zerar()
        return    
    }
    tempoDecorridoEmSegundos -= 1
}

startPauseBt.addEventListener("click", iniciarOuPausar => {
    if (iniciarOuPausar){
        startPauseBtIcon.setAttribute("src", "./imagens/play_arrow.png")
        music.play()
    }
    const music = new Audio("./sons/pause.mp3")
    startPauseBtIcon.setAttribute("src", "./imagens/pause.png")
    music.pause()
})

function iniciarOuPausar() {
    if(intervaloId){
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null
}