'use strict'

let contadorDeAcertos=0

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
    const botao=document.getElementById(botaoId)
    botao.addEventListener('click', function () {
        const holder=document.getElementById('holder')
        const ultimaTagP=holder.lastChild
        const respostaUsuario=botao.textContent
        if (ultimaTagP.dataset.resposta==respostaCorreta){
            botao.textContent='CORRETO!'
            contadorDeAcertos++
        }
        else
            botao.textContent = 'INCORRETO!'
        document.getElementById('contadorDeAcertos').textContent=`Acertos: ${contadorDeAcertos}`
        setTimeout(()=>{
            gerarNovaFrase()
        },1444)
    })
}

async function gerarNovaFrase(){
    const holder=document.getElementById('holder')
    holder.innerHTML=''
    const frasesYe=await pegarFrasesYe()
    const frasesFilosofos= await pegarFrasesFilosofos()
    criarTagP(frasesYe,frasesFilosofos)
    document.getElementById('kanyeButton').textContent='Kanye West'
    document.getElementById('filosofoButton').textContent='Filósofo'
}

async function carregarFrases(){
    const frasesYe=await pegarFrasesYe()
    const fraseFilosofos=await pegarFrasesFilosofos()
    criarTagP(frasesYe,fraseFilosofos)
    verificarResposta('kanyeButton', 'Kanye West')
    verificarResposta('filosofoButton', 'Filósofos')
}

carregarFrases()