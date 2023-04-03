let numeroDeCartas, cartasViradas = 0, cartaAnterior = "", jogadas = 0, listaCartas, segundos = 0, cod;
let arrayImagens = ['imagens/bobrossparrot.gif', 'imagens/explodyparrot.gif', 'imagens/fiestaparrot.gif', 'imagens/metalparrot.gif', 'imagens/revertitparrot.gif', 'imagens/tripletsparrot.gif', 'imagens/unicornparrot.gif'];
function comparador() { 
	return Math.random() - 0.5; 
}
let tempo = function(){
    segundos++;
    document.querySelector(".relogio").innerHTML = segundos;
}
function inicializa(){
    numeroDeCartas = prompt("Com quantas cartas você quer jogar? (Número par de 4 à 14)");
    numeroDeCartas = Number(numeroDeCartas);
    while(numeroDeCartas < 4 || numeroDeCartas > 14 || numeroDeCartas%2 !== 0) {
        alert("Quantidade de cartas inválidas");
        numeroDeCartas = prompt("Com quantas cartas você quer jogar? (Número par de 4 à 14)");
        numeroDeCartas = Number(numeroDeCartas);
    }
    distribuicaoDasCartas();
    cod = setInterval(tempo, 1000);
}
inicializa();
function distribuicaoDasCartas(){
    const container = document.querySelector(".container");
    arrayImagens.sort(comparador);
    let numeroCartasEmJogo = numeroDeCartas/2;
    let cartasEmJogo= [];
    for(let i = 0; i < numeroCartasEmJogo; i++){
        cartasEmJogo.push(arrayImagens[i]);
        cartasEmJogo.push(arrayImagens[i]);
    }
    cartasEmJogo.sort(comparador);
    for(let i = 0; i < numeroDeCartas; i++){
        if(numeroDeCartas === 8 && i === 4 || numeroDeCartas === 10 && i === 5 || numeroDeCartas === 12 && i === 6 || numeroDeCartas === 14 && i === 7 ){
            container.innerHTML += `
                <div class="break"></div>`;
        }
        container.innerHTML += `
            <div onclick="virar(this)" class="carta" data-test="card">
                <img src="./imagens/back.png" data-test="back-face-img" alt=""  >
                <img class="escondido" data-test="front-face-img" src="./${cartasEmJogo[i]}" alt="">
            </div>`;
    }
}
let desvirar = function(elemento){
    elemento.classList.remove("virada");
    let frente = elemento.children[0];
    let verso = elemento.children[1];
    frente.classList.remove("escondido");
    verso.classList.add("escondido");
}
let apareceFigura = function(elemento){
    let frente = elemento.children[0];
    let verso = elemento.children[1];
    frente.classList.add("escondido");
    verso.classList.remove("escondido");
}
let alerta = function(){
    alert(`Você ganhou em ${jogadas} jogadas! A duração do jogo foi de ${segundos} segundos!`);
    clearInterval(cod);
    let reinicia = prompt("Você gostaria de reiniciar a partida? (sim ou não)");
    while(reinicia !== "sim" && reinicia !== "não"){
        alert("Resposta inválida");
        reinicia = prompt("Você gostaria de reiniciar a partida? (sim ou não)");
    }
    if(reinicia === "sim"){
        window.location.reload();
    }else if(reinicia === "não"){}

}
function virar(elemento){
    jogadas++;
    if(cartaAnterior === ""){
        cartaAnterior = elemento;
    }
    cartasViradas++;
    elemento.classList.add("virada");
    elemento.removeAttribute("onclick");
    setTimeout(apareceFigura, 300, elemento);
    if(cartasViradas === 2){
        if(elemento.children[1].getAttribute('src') !== cartaAnterior.children[1].getAttribute('src')){
            elemento.setAttribute('onclick', 'virar(this)');
            cartaAnterior.setAttribute('onclick', 'virar(this)');
            setTimeout(desvirar, 1000, elemento);
            setTimeout(desvirar, 1000, cartaAnterior);
        }else if(elemento.children[1].getAttribute('src') === cartaAnterior.children[1].getAttribute('src')){
            elemento.onclick = '';
            cartaAnterior.removeAttribute("onclick");
        }
        cartasViradas = 0;
        cartaAnterior = "";
    }
    listaCartas = document.querySelectorAll(".container .carta");
    let conf = 0;
    for(let i = 0; i < listaCartas.length; i++){
        if(listaCartas[i].classList.contains("virada")){
            conf++;
        }else{
            conf = 0;
            break;
        }
    }
    if(conf === listaCartas.length){
        setTimeout(alerta, 1000);
    }
}