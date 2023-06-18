const game ={

    tabuleiro: [],
    tamanhoCelula: 70,

    geraID: function(){
        return Math.floor(Date.now() * Math.random()).toString(36);
    },

    allowDrop: function(e) {
        e.preventDefault();
    },

    drag: function(e){
        e.dataTransfer.setData("text", e.target.id);
    },

    drop: function(e){
        e.preventDefault();

        let posicaoFinal = JOSN.parse(e.target.getAttribute('posicao'));
        console.log(posicaoFinal);
    let id = e.dataTransfer.getData("text");
    let element = document.getElementById(id);
    let cor = element.getAttribute("cor");
    let posicaoInicial = this.posicaoPeca(id, this.tabuleiro);

    if(
        e.target.style.backgroundColor != "white" && e.target.getAttribute("draggable") == null && this.validaMovimento(posicaoInicial, posicaoFinal, cor)
    ){
        e.target.appendChild(element);
        this.trocaPosicaoPeca(posicaoInicial, posicaoFinal);
        this.proximoJogador();
    }
    

    },

    criaTabuleiro: function() {
        const tamanho = 8;
        let tabela = document.createElement('table');
    
        tabela.style.borderStyle = 'solid';
        tabela.style.borderSpacing = 0;
        tabela.style.margin = 'auto';
    
        for (let i = 0; i < tamanho; i++) {
            let linha = document.createElement('tr');
            tabela.append(linha);
            for (let j = 0; j < tamanho; j++) {
                let celula = document.createElement('td');
                linha.append(celula);
                
    
                celula.style.width = `${tamanhoCelula}px`;
                celula.style.height = `${tamanhoCelula}px`;
                if (i % 2 == j % 2) {
                    celula.addEventListener('dragover', allowDrop)
                    celula.addEventListener('drop', drop)
                    celula.style.backgroundColor = 'black';
                    if (i * 8 + j <= 24) {
                        celula.append(criaPeca('black'));
                        
                    } else if (i * 8 + j >= 40) {
                        celula.append(criaPeca('red'));
                    }
                } else {
                    celula.style.backgroundColor = 'white';
                }
            }
        };
        return tabela;
    },
    
    criaPeca: function(cor) {
        let imagem = document.createElement('img');
        imagem.id = pecaId++
        imagem.setAttribute('src', `img/${cor}.png`);
        imagem.setAttribute('width', `${tamanhoCelula-4}px`);
        imagem.setAttribute('height', `${tamanhoCelula-4}px`);
        imagem.setAttribute('draggable', "true");
        imagem.addEventListener('dragstart', drag)
        return imagem;
    },

    posicaoPeca: function(id) {
        for (let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(this.tabuleiro[i][j] == id) return {linha:i, coluna:j};
            }
        }
    },

    temPecaAlvo: function(posX, posY, cor){
        console.log('X: ' + posX + 'Y: '+ posY);
        let id = this.tabuleiro[posX][posY];
        console.log("id encontrado: "+ id);
        if(id != 'vazio' && id != null){
            let element = document.getElementById(id);
            console.log(element);
            let elementColor = element.getAttribute('cor');
            if(elementColor != cor) {
                setTimeout(() => {
                    let squad = element.parentElement; 
                    console.log(squad);
                    squad.innerHTML = '';
                }, 1000)
                return true;
            }
        }
        return false
    },

    validaMovimento: function(posicaoInicial, posicaoFinal, cor){
        let difLinha = posicaoFinal.linha - posicaoInicial.linha;
        let difColuna = posicaoFinal.coluna - posicaoInicial.coluna;
        console.log(cor);
        console.log("dif linha: " + difLinha);
        console.log("dif coluna: " + difColuna);

        if(difLinha > 1 || difColuna > 1){
            console.log(entrou);
            if(cor == 'black') {
                console.log('first');
                console.log("inicio: " + JSON.stringify(posicaoInicial));
                console.log("fim: "+JSON.stringify(posicaoFinal));
                return this.temPecaAlvo(posicaoFinal.linha - 1, posicaoFinal.coluna + 1, cor) || this.temPecaAlvo(posicaoFinal.linha -1, posicaoFinal.coluna + 1, cor);
                
            }
            if (cor == 'red') {
                console.log('first');
                console.log("inicio: " + JSON.stringify(posicaoInicial));
                console.log("fim: "+JSON.stringify(posicaoFinal));
                return this.temPecaAlvo(posicaoFinal.linha + 1, posicaoFinal.coluna + 1, cor) || this.temPecaAlvo(posicaoFinal.linha + 1, posicaoFinal.coluna - 1, cor);
                
            }
        }

    },
    trocaPosicaoPeca: function(posicaoInicial, posicaoFinal){
        let aux = this.tabuleiro[posicaoInicial.linha][posicaoFinal.coluna];
        this.tabuleiro[posicaoInicial.linha][posicaoInicial.coluna] = this.tabuleiro[posicaoFinal.linha][posicaoFinal.coluna];
        this. tabuleiro[posicaoFinal.linha][posicaoFinal.coluna] = aux;
    },

    proximoJogador: function(){
        const element = document.querySelectorAll("img[draggable]");
        element.forEach(item => {
            item.draggable = !item.draggable;
        })
    },

    exibirTabuleiro: function(){
        console.log(this.tabuleiro);
    }

}

