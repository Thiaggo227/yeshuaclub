// Seleção de elementos do Menu Mobile
const menu = document.getElementById("menu");
const toggle = document.getElementById("menuToggle");
const icon = document.getElementById("iconMenu");

// Seleção de elementos do Modal de Sair
const sairBtn = document.getElementById("sair");
const modal = document.getElementById("modalSair");
const btnSim = document.getElementById("btnSim");
const btnNao = document.getElementById("btnNao");

// --- LÓGICA DO MENU ---

// Abre e fecha o menu mobile
toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
    toggle.classList.toggle("active");

    if (menu.classList.contains("active")) {
        icon.classList.replace("bi-list", "bi-x");
    } else {
        icon.classList.replace("bi-x", "bi-list");
    }
});

// Fecha o menu ao clicar fora dele
document.addEventListener("click", (e) => {
    if (menu.classList.contains("active") && !menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove("active");
        toggle.classList.remove("active");
        icon.classList.replace("bi-x", "bi-list");
    }
});

// --- LÓGICA DE USUÁRIO ---

// Recupera o nome do localStorage e exibe no header
const nome = localStorage.getItem("nomeUsuario");

if (nome) {
    document.getElementById("nomeUser").innerHTML = 
        `${nome.toUpperCase()} <i class="bi bi-person-circle"></i>`;
} else {
    // Se não houver usuário logado, redireciona para o index (proteção simples)
    window.location.href = "index.html";
}

// --- LÓGICA DO MODAL DE SAIR ---

// Abre o modal ao clicar em "Sair"
sairBtn.addEventListener("click", () => {
    modal.classList.add("active");
});

// Fecha o modal se o usuário clicar em "Não"
btnNao.addEventListener("click", () => {
    modal.classList.remove("active");
});

// Ação de confirmar saída
btnSim.addEventListener("click", () => {
    // Limpa os dados salvos para que o próximo login venha vazio
    localStorage.clear();
    
    // Redireciona para o index onde está o seu formulário de cadastro/login
    window.location.href = "index.html";
});