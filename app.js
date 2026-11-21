const canvas = document.getElementById("tela"); //criar canvas
    const desenha = canvas.getContext("2d"); //variavel para desenhar

    const jogador1 = { x: 20, y: 200, largura: 15, altura: 100 }; //criar jogador 1
    const jogador2 = { x: 765, y: 200, largura: 15, altura: 100 };// criar jogadfor 2
    const bola = { x: 400, y: 250, tamanho: 20, velX: 5, velY: 5 }; // criar a bola, que é quadrada pq eu esqueci como faz a bola redonda

    const velJogador = 6; //velocidade do jogador
    const PONTOS_VITORIA = 5;// quantidade de pontos para a vitoria
    let pontos1 = 0; //´pontos inicias jogador 1
    let pontos2 = 0;//pontos inicias jogador 2


    let estado = "contagem";// criar a variavel da contagem para iniciar o jogo
    let contagem = 5; //criar contagem de 5s
    let intervalo;//relogio da contagem


    const teclas = {};//criar teclas para os jogadores
    document.addEventListener("keydown", (e) => teclas[e.code] = true);
    document.addEventListener("keyup", (e) => teclas[e.code] = false);


    function iniciarContagem() { //inicio da contagem de 5s
        estado = "contagem"; //começar a conatgem
        contagem = 5; //5 segundos
        clearInterval(intervalo); 
        intervalo = setInterval(() => {//tirar o cronometro da tela
            contagem--;
            if (contagem <= 0) {
                clearInterval(intervalo);
                estado = "jogando";
            }
        }, 1000);
    }

    function atualizar() { //começar o jogo
        if (estado !== "jogando") return;


        if (teclas["KeyW"] && jogador1.y > 0) jogador1.y -= velJogador;//tecla
        if (teclas["KeyS"] && jogador1.y + jogador1.altura < canvas.height) jogador1.y += velJogador;
        if (teclas["ArrowUp"] && jogador2.y > 0) jogador2.y -= velJogador;
        if (teclas["ArrowDown"] && jogador2.y + jogador2.altura < canvas.height) jogador2.y += velJogador;


        bola.x += bola.velX; //velocidade da bola
        bola.y += bola.velY;


        if (bola.y <= 0 || bola.y + bola.tamanho >= canvas.height) { //colisao da bola
            bola.velY *= -1; 
        }


        if (colidiu(bola, jogador1) || colidiu(bola, jogador2)) { //colisao da bola com o jogador
            bola.velX *= -1; 
        }


        if (bola.x < 0) { //marcar ponto
            pontos2++;
            resetarBola();
            verificarFim();
        }
        if (bola.x > canvas.width) {
            pontos1++;
            resetarBola();
            verificarFim();
        }
    }

    function colidiu(b, j) {//verificar se colidiu  no jogador
        return (
            b.x < j.x + j.largura &&
            b.x + b.tamanho > j.x &&
            b.y < j.y + j.altura &&
            b.y + b.tamanho > j.y
        );
    }

    function resetarBola() { //reseta a bola pro meio
        bola.x = canvas.width / 2;
        bola.y = canvas.height / 2;
    }


    function verificarFim() { //ver se ja tem um jogador com 5 pontos e definir a vitoria
        if (pontos1 === PONTOS_VITORIA) {
            mostrarFim("O JOGADOR 1 GANHOU!!!!!!!!! e o 2 perdeu");
        }
        if (pontos2 === PONTOS_VITORIA) {
            mostrarFim("parabens o jogaDOR 2 GANNHOU E O 1 PERDEU!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
    }

    function mostrarFim(texto, imagem) { //a tela de fim com as informações 
        estado = "fim";
        document.getElementById("textoFim").textContent=texto;
        document.getElementById("imagemFim").src="nobruseemocionou.jpg"; //nobru se emocionou
        document.getElementById("fim").style.display = "flex";
    }

    function reiniciar() {// reinicia o jogo
        pontos1 = 0;
        pontos2 = 0;
        jogador1.y = 200;
        jogador2.y = 200;
        resetarBola();
        document.getElementById("fim").style.display = "none";
        iniciarContagem();
    }

    function desenhar() { //função desenhar para o jogador e a bola e o texto
        desenha.clearRect(0, 0, canvas.width, canvas.height);
        desenha.fillStyle = "black";


        desenha.fillRect(jogador1.x, jogador1.y, jogador1.largura, jogador1.altura);
        desenha.fillRect(jogador2.x, jogador2.y, jogador2.largura, jogador2.altura);
        desenha.fillRect(bola.x, bola.y, bola.tamanho, bola.tamanho);





        desenha.font = "50px Arial";
        desenha.textAlign = "center";
        desenha.fillText(pontos1, 340, 60);
        desenha.fillText(pontos2, 460, 60);


        if (estado === "contagem") {
            desenha.font = "120px Arial";
            desenha.fillText(contagem, canvas.width / 2, canvas.height / 2 + 40);
        }
    }

    function jogo() { //funçaõ do jogo
        atualizar();
        desenhar();
        requestAnimationFrame(jogo);
    }

    iniciarContagem();
    jogo();