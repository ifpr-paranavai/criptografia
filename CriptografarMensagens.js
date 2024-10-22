// Array de letras
const letras = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Array de codificação correspondente para cada letra
const codificacao = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83,
    89, 97, 101, 103];

/*
const A = [
[4, 5],
[3, 4]
];
*/

function codificar() {

    let chave = document.getElementById("chave").value;
    let msg = document.getElementById("mensagem").value;
    document.getElementById("mensagem-codificada").innerHTML = "";

    // Remove colchetes e divide a string em linhas
    const A = chave.trim().split('\n').map(linha =>
        linha.replace('[', '').replace(']', '').trim().split(' ').map(Number)
    );


    msg = msg.toUpperCase();

    const mensagemCriptografada = criptografar(msg);

    // Calcula o número de colunas arredondando para cima o comprimento da mensagem dividida por 2
    const numColunas = Math.ceil(mensagemCriptografada.length / 2.0);

    const linhas = 2;  // Define o número de linhas como 2

    // Cria uma matriz 2xnumColunas para armazenar os valores
    const B = new Array(linhas).fill(null).map(() => new Array(numColunas).fill(0));

    // Preenche a matriz B com os valores da mensagem criptografada
    for (let i = 0; i < mensagemCriptografada.length; i++) {
        const linha = Math.floor(i / numColunas);  // Calcula a linha (divisão inteira)
        const coluna = i % numColunas;  // Calcula a coluna (resto da divisão)

        B[linha][coluna] = mensagemCriptografada[i];  // Atribui o valor à posição correta da matriz
    }

    console.log("MENSAGEM SEM CRIPTOGRAFIA");  // Imprime o título da mensagem
    console.log(mensagemCriptografada);
    // Percorre as linhas da matriz B
    for (let i = 0; i < linhas; i++) {
        let linha = '[';  // Inicia a linha com o caractere '['

        // Percorre as colunas da matriz B
        for (let j = 0; j < numColunas; j++) {
            linha += B[i][j];  // Adiciona o valor da matriz à string

            // Se não for o último elemento da linha, adiciona um espaço
            if (j < B[i].length - 1) {
                linha += " ";
            }
        }

        linha += ']';  // Fecha a linha com o caractere ']'
        console.log(linha);  // Imprime a linha formatada
    }

    console.log("CHAVE DE CRIPTOGRAFIA");

    console.log("[4 5]");

    console.log("[3 4]");


    console.log();

    const determinanteA = determinante(A);

    console.log("O determinante da Chave é: " + determinanteA);

    // Chama a função multiplicarMatrizes com as matrizes A e B
    const C = multiplicarMatrizes(A, B);

    console.log("MENSAGEM CRIPTOGRAFADA COM SUCESSO!");

    // Percorre as linhas da matriz C
    for (let i = 0; i < C.length; i++) {
        let linha = "[";  // Inicia a linha com o caractere '['

        // Percorre as colunas da matriz C
        for (let j = 0; j < C[i].length; j++) {
            linha += C[i][j];  // Adiciona o valor da matriz à string

            // Se não for o último elemento da linha, adiciona um espaço
            if (j < C[i].length - 1) {
                linha += " ";
            }
        }

        linha += "]";  // Fecha a linha com o caractere ']'
        console.log(linha);  // Imprime a linha formatada

        document.getElementById("mensagem-codificada").innerHTML += linha;
        document.getElementById("mensagem-codificada").innerHTML += "<br />";
        document.getElementById("display").style.display = "block";
    }
}
function decodificar() {
    // Obtém o valor do input como string
    let chave = document.getElementById("chave-secreta").value;
    const inputValor = document.getElementById('mensagem-criptografada').value;
    document.getElementById("mensagem-decodificada").innerHTML = "";

    // Remove colchetes e divide a string em linhas
    const A = chave.trim().split('\n').map(linha =>
        linha.replace('[', '').replace(']', '').trim().split(' ').map(Number)
    );

    // Remove colchetes e divide a string em linhas
    const C = inputValor.trim().split('\n').map(linha =>
        linha.replace('[', '').replace(']', '').trim().split(' ').map(Number)
    );

    const determinanteA = determinante(A);
    // Calcula a matriz inversa de A

    const inversaA = inversa(A, determinanteA);

    // Multiplica a matriz inversaA com a matriz criptografada C para obter a mensagem descriptografada
    const descriptografada = multiplicarMatrizes(inversaA, C);

    console.log();  // Imprime uma linha em branco

    console.log("DECODIFICAÇÃO DA MENSAGEM");

    // Percorre a matriz descriptografada para imprimir os valores
    for (let i = 0; i < descriptografada.length; i++) {
        let linha = "[";  // Inicia a linha com o caractere '['

        // Percorre as colunas da matriz descriptografada
        for (let j = 0; j < descriptografada[i].length; j++) {
            linha += descriptografada[i][j];  // Adiciona o valor da matriz à string

            // Se não for o último elemento da linha, adiciona um espaço
            if (j < descriptografada[i].length - 1) {
                linha += " ";
            }
        }

        linha += "]";  // Fecha a linha com o caractere ']'
        console.log(linha);  // Imprime a linha formatada
    }

    // Cria um array para armazenar a mensagem descriptografada, com o tamanho do dobro da primeira linha
    const msgd = new Array(descriptografada[0].length * 2);

    // Preenche o array msgd com os valores da matriz descriptografada
    for (let j = 0; j < descriptografada[0].length; j++) {
        msgd[j] = descriptografada[0][j];  // Armazena a primeira linha
        msgd[j + descriptografada[0].length] = descriptografada[1][j];  // Armazena a segunda linha logo após a primeira
    }

    // Inicializa a string decodificada
    let decodificada = "";

    // Percorre o array msgd para decodificar a mensagem
    for (let i = 0; i < msgd.length; i++) {
        const valor = msgd[i];  // Obtém o valor atual

        // Encontra o índice do valor na codificação
        const indice = indexOfC(valor);

        // Se o índice foi encontrado (não é -1), adiciona a letra correspondente à string decodificada
        if (indice !== -1) {
            decodificada += letras[indice];
        }
    }

    console.log();  // Imprime uma linha em branco

    // Imprime a mensagem decodificada
    console.log("Mensagem Decodificada: " + decodificada);

    document.getElementById("mensagem-decodificada").innerHTML += decodificada;
    document.getElementById("display-decode").style.display = "block";

}

// Função para multiplicar duas matrizes A e B
function multiplicarMatrizes(A, B) {
    // Obtém o número de linhas da matriz A
    const linhasA = A.length;

    // Obtém o número de colunas da matriz A (assumimos que A tem pelo menos uma linha)
    const colunasA = A[0].length;

    // Obtém o número de colunas da matriz B (assumimos que B tem pelo menos uma linha)
    const colunasB = B[0].length;

    // Verifica se o número de colunas da matriz A é igual ao número de linhas da matriz B
    if (colunasA !== B.length) {
        console.log("O número de colunas da matriz A deve ser igual ao número de linhas da matriz B!");
        return null;  // Retorna null se as dimensões forem incompatíveis
    }

    // Inicializa a matriz C com zeros, com tamanho linhasA x colunasB
    const C = Array(linhasA).fill(null).map(() => Array(colunasB).fill(0));

    // Percorre as linhas da matriz A
    for (let i = 0; i < linhasA; i++) {
        // Percorre as colunas da matriz B
        for (let j = 0; j < colunasB; j++) {
            // Realiza o produto escalar da linha de A com a coluna de B
            for (let k = 0; k < colunasA; k++) {
                C[i][j] += A[i][k] * B[k][j]; // Multiplica e acumula o valor
            }
        }
    }

    // Retorna a matriz resultante C
    return C;
}


// Função para calcular o determinante de uma matriz 2x2
function determinante(matriz) {
    // Verifica se a matriz tem 2 linhas (é uma matriz 2x2)
    const n = matriz.length;

    // Calcula o determinante para uma matriz 2x2 usando a fórmula:
    // det = (a*d) - (b*c), onde a, b, c, d são os elementos da matriz:
    // [a b]
    // [c d]
    const det = (matriz[0][0] * matriz[1][1]) - (matriz[0][1] * matriz[1][0]);

    // Verifica se o determinante não é 0
    if (det !== 0) {
        return det; // Retorna o determinante se for diferente de 0
    } else {
        // Lança um erro se o determinante for 0
        alert("Erro: o determinante não pode ser 0.");
    }
}


// Função para encontrar o índice de um valor em um array de codificação
function indexOfC(valor) {
    let i = -1;  // Inicializa a variável i com -1, caso o valor não seja encontrado
    let cont = 0;  // Inicializa um contador

    // Percorre o array codificacao
    for (let j = 0; j < codificacao.length; j++) {
        // Se o valor na posição j for igual ao valor procurado
        if (codificacao[j] === valor) {
            i = cont;  // Armazena o valor do contador em i
            break;  // Interrompe o loop após encontrar o valor
        }
        cont++;  // Incrementa o contador a cada iteração
    }

    return i;  // Retorna o índice ou -1 se o valor não for encontrado
}


// Função para encontrar o índice de uma letra em um array de caracteres
function indexOfL(valor) {
    let i = -1;  // Inicializa a variável i com -1, caso o valor não seja encontrado
    let cont = 0;  // Inicializa o contador

    // Percorre o array de letras
    for (let j = 0; j < letras.length; j++) {
        // Se o valor na posição j for igual ao valor procurado
        if (letras[j] === valor) {
            i = cont;  // Armazena o valor do contador em i
            break;  // Interrompe o loop após encontrar o valor
        }
        cont++;  // Incrementa o contador a cada iteração
    }

    return i;  // Retorna o índice ou -1 se o valor não for encontrado
}


// Função para criptografar uma mensagem usando um array de letras e sua codificação
function criptografar(msg) {
    // Cria um array para armazenar a mensagem criptografada, com o mesmo tamanho da string de entrada
    const msgCriptografada = new Array(msg.length);

    // Percorre cada caractere da mensagem
    for (let i = 0; i < msg.length; i++) {
        // Obtém o valor do caractere na posição i da string
        const valor = msg.charAt(i);

        // Encontra o índice da letra no array de letras usando a função indexOfL
        const letraIndice = indexOfL(valor);

        // Encontra o código correspondente à letra na matriz de codificação
        const codigoIndice = codificacao[letraIndice];

        // Armazena o código criptografado no array de resultado
        msgCriptografada[i] = codigoIndice;
    }

    // Retorna a mensagem criptografada como um array de números inteiros
    return msgCriptografada;
}


// Função para calcular a inversa de uma matriz 2x2 dado seu determinante
function inversa(A, determinanteA) {
    // Cria uma matriz 2x2 para armazenar a inversa
    const inversaA = [
        [0, 0], // Linha 1
        [0, 0]  // Linha 2
    ];

    // Calcula os elementos da matriz inversa usando a fórmula para matriz 2x2
    inversaA[0][0] = A[1][1] / determinanteA;   // Elemento [0,0] da inversa
    inversaA[0][1] = -A[0][1] / determinanteA;  // Elemento [0,1] da inversa
    inversaA[1][0] = -A[1][0] / determinanteA;  // Elemento [1,0] da inversa
    inversaA[1][1] = A[0][0] / determinanteA;   // Elemento [1,1] da inversa

    // Retorna a matriz inversa
    return inversaA;
}
