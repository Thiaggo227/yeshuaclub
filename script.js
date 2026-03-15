const form = document.getElementById("formLogin");
const btnSubmit = form.querySelector("button");
const criarContaBtn = document.getElementById("criarConta");
const campoNome = document.getElementById("campoNome");

const nomeInput = document.getElementById("nomeUsuario");
const emailInput = document.getElementById("emailUsuario");
const senhaInput = document.getElementById("senhaUsuario");
const toggleSenha = document.getElementById("toggleSenha");

let modoCadastro = false;

// Alternar entre Login e Cadastro
criarContaBtn.addEventListener("click", () => {
    modoCadastro = !modoCadastro;
    if (modoCadastro) {
        campoNome.style.display = "flex";
        btnSubmit.innerText = "Cadastrar";
        criarContaBtn.innerText = "Já tenho conta";
        nomeInput.required = true;
    } else {
        campoNome.style.display = "none";
        btnSubmit.innerText = "Entrar";
        criarContaBtn.innerText = "Criar conta";
        nomeInput.required = false;
    }
});

// Olhinho da senha
toggleSenha.addEventListener("click", () => {
    const type = senhaInput.type === "password" ? "text" : "password";
    senhaInput.type = type;
    toggleSenha.classList.toggle("bi-eye");
    toggleSenha.classList.toggle("bi-eye-slash");
});

// --- LÓGICA UNIFICADA ---
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = nomeInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;
    const urlPonte = "https://script.google.com/macros/s/AKfycbzzvFYdyjmPeTrI8lEXy-7vMWfzl0fkKbARuaPplu2Lz20Nd3DABiq7NC2Kr96ZtjjZug/exec";

    if (modoCadastro) {
        // 1. Salva localmente (opcional)
        localStorage.setItem("nomeUsuario", nome);
        localStorage.setItem("emailUsuario", email);
        localStorage.setItem("senhaUsuario", senha);

        // 2. Envia para o Google Sheets
        fetch(urlPonte, {
            method: "POST",
            mode: "no-cors", // Crucial para evitar erros de política de segurança do Google
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome: nome, email: email, senha: senha })
        })
        .then(() => {
            alert("Conta criada e salva na planilha!");
            window.location.href = "clube.html";
        })
        .catch(err => {
            console.error("Erro ao salvar:", err);
            alert("Erro ao conectar com a planilha.");
        });

    } else {
        // Lógica de Login (Busca no localStorage para teste rápido)
        const emailSalvo = localStorage.getItem("emailUsuario");
        const senhaSalva = localStorage.getItem("senhaUsuario");

        if (email === emailSalvo && senha === senhaSalva) {
            window.location.href = "clube.html";
        } else {
            alert("Email ou senha incorretos.");
        }
    }
});