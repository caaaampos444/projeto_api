'use strict'

async function pegarFrasesYe(){
    const endPointYe='https://api.kanye.rest'
    const responseYe=await fetch(endPointYe)
    const frasesYe=await responseYe.json()
    return frasesYe.quote 
}

async function pegarFrasesFilosofos(){
    const endPointFilosofo='https://philosophy-quotes-api.glitch.me/quotes'
    const responseFilosofos=await fetch(endPointFilosofo)
    const frasesFilosofos=await responseFilosofos.json()
    const indiceAleatorio = Math.floor(Math.random() * frasesFilosofos.length)
    return frasesFilosofos[indiceAleatorio].quote
}

function criarTagP(fraseYe, fraseFilosofos){
    const holder=document.getElementById('holder')
    const tagP=document.createElement('p')
    const random=Math.random()
    if(random<0.5){
        tagP.textContent=`"${fraseYe}"`
        tagP.dataset.resposta='Kanye West'
    }
    else{
        tagP.textContent=`"${fraseFilosofos}"`
        tagP.dataset.resposta='Filósofos'
    }
        holder.appendChild(tagP)
}

function verificarResposta(botaoId, respostaCorreta) {
    const botao = document.getElementById(botaoId)
    botao.addEventListener('click', function () {
        const holder = document.getElementById('holder')
        const ultimaTagP = holder.lastChild
        const respostaUsuario = botao.textContent
        if (ultimaTagP.dataset.resposta === respostaCorreta){
            botao.textContent = 'CORRETO!'
            botao.classList.add('verde')
        }
        else
            botao.textContent = 'INCORRETO!'
        setTimeout(function () {
            location.reload()
        }, 1444)
    })
}

async function carregarFrases(){
    const frasesYe=await pegarFrasesYe()
    const fraseFilosofos=await pegarFrasesFilosofos()
    criarTagP(frasesYe,fraseFilosofos)
    verificarResposta('kanyeButton', 'Kanye West')
    verificarResposta('filosofoButton', 'Filósofos')
}

carregarFrases()