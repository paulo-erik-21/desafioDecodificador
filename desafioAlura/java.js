// Função para validar o texto (aceita apenas letras minúsculas, números e espaço)
function validarTexto(texto) {
    var regex = /^[a-z0-9\s]+$/;
    return regex.test(texto);
}

// Função para verificar a entrada do usuário e habilitar/desabilitar os botões
function verificarEntrada() {
    var texto = document.getElementById("texto").value;
    var botaoDecodificar = document.getElementById("botao-decodificar");
    var botaoCriptografar = document.getElementById("botao-criptografar");

    if (!validarTexto(texto)) {
        botaoDecodificar.disabled = true;
        botaoCriptografar.disabled = true;
        botaoDecodificar.classList.add("botao-invalido");
        botaoCriptografar.classList.add("botao-invalido");
    } else {
        botaoDecodificar.disabled = false;
        botaoCriptografar.disabled = false;
        botaoDecodificar.classList.remove("botao-invalido");
        botaoCriptografar.classList.remove("botao-invalido");
    }
}

// Função para criptografar o texto usando um método de substituição de letras simples
function criptografarTexto() {
    var texto = document.getElementById("texto").value;
    var textoCriptografado = "";

    for (var i = 0; i < texto.length; i++) {
        var char = texto.charAt(i).toLowerCase(); // Convertendo para minúsculas
        var codigo = char.charCodeAt(0); // Obtendo o código ASCII do caractere
        var novoCodigo;

        if (char === " ") {
            novoCodigo = 32; // Mantém o espaço
        } else if (codigo >= 97 && codigo <= 122) {
            novoCodigo = (codigo - 97 + 3) % 26 + 97; // Deslocamento de 3 posições para letras minúsculas
        } else if (codigo >= 48 && codigo <= 57) {
            novoCodigo = (codigo - 48 + 3) % 10 + 48; // Deslocamento de 3 posições para números
        }

        var novoChar = String.fromCharCode(novoCodigo); // Convertendo de volta para o caractere correspondente
        textoCriptografado += novoChar;
    }

    document.getElementById("resultado").value = textoCriptografado;
}

// Função para decodificar o texto usando um método de substituição de letras simples
function decodificarTexto() {
    var textoCriptografado = document.getElementById("texto").value;
    var textoDecodificado = "";

    for (var i = 0; i < textoCriptografado.length; i++) {
        var char = textoCriptografado.charAt(i).toLowerCase(); // Convertendo para minúsculas
        var codigo = char.charCodeAt(0); // Obtendo o código ASCII do caractere
        var novoCodigo;

        if (char === " ") {
            novoCodigo = 32; // Mantém o espaço
        } else if (codigo >= 97 && codigo <= 122) {
            novoCodigo = (codigo - 97 - 3 + 26) % 26 + 97; // Desfazendo o deslocamento de 3 posições para letras minúsculas
        } else if (codigo >= 48 && codigo <= 57) {
            novoCodigo = (codigo - 48 - 3 + 10) % 10 + 48; // Desfazendo o deslocamento de 3 posições para números
        }

        var novoChar = String.fromCharCode(novoCodigo); // Convertendo de volta para o caractere correspondente
        textoDecodificado += novoChar;
    }

    document.getElementById("resultado").value = textoDecodificado;
}

// Função para copiar o texto para a área de transferência
function copiarTexto() {
    var textoCopiar = document.getElementById("resultado");
    textoCopiar.select();
    textoCopiar.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

// Adicionar um ouvinte de evento ao campo de texto para verificar a entrada do usuário
document.getElementById("texto").addEventListener("input", verificarEntrada);
