function validarTexto(texto) {
    var regex = /^[a-z0-9\s]+$/;
    return regex.test(texto);
}

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

function criptografarTexto() {
    var texto = document.getElementById("texto").value;
    var textoCriptografado = "";

    for (var i = 0; i < texto.length; i++) {
        var char = texto.charAt(i).toLowerCase(); 
        var codigo = char.charCodeAt(0); 
        var novoCodigo;

        if (char === " ") {
            novoCodigo = 32; 
        } else if (codigo >= 97 && codigo <= 122) {
            novoCodigo = (codigo - 97 + 3) % 26 + 97; 
        } else if (codigo >= 48 && codigo <= 57) {
            novoCodigo = (codigo - 48 + 3) % 10 + 48; 
        }

        var novoChar = String.fromCharCode(novoCodigo);
        textoCriptografado += novoChar;
    }

    document.getElementById("resultado").value = textoCriptografado;
}

function decodificarTexto() {
    var textoCriptografado = document.getElementById("texto").value;
    var textoDecodificado = "";

    for (var i = 0; i < textoCriptografado.length; i++) {
        var char = textoCriptografado.charAt(i).toLowerCase(); 
        var codigo = char.charCodeAt(0); 
        var novoCodigo;

        if (char === " ") {
            novoCodigo = 32; 
        } else if (codigo >= 97 && codigo <= 122) {
            novoCodigo = (codigo - 97 - 3 + 26) % 26 + 97;
        } else if (codigo >= 48 && codigo <= 57) {
            novoCodigo = (codigo - 48 - 3 + 10) % 10 + 48;
        }

        var novoChar = String.fromCharCode(novoCodigo);
        textoDecodificado += novoChar;
    }

    document.getElementById("resultado").value = textoDecodificado;
}

function copiarTexto() {
    var textoCopiar = document.getElementById("resultado");
    textoCopiar.select();
    textoCopiar.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

document.getElementById("texto").addEventListener("input", verificarEntrada);
