const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Definição das perguntas do bot (fluxo de conversa)
const questions = [
    { text: "Olá! Sou o seu consultor financeiro. Pronto para faturar muito dinheiro com um novo projeto? Para começar, como posso te chamar?", field: "nome" },
    { text: "Prazer, ! E qual o nome da sua empresa que vai dominar o mercado?", field: "empresa" },
    { text: "Perfeito! Qual tipo de projeto vai te render mais lucros? (E-commerce, Site Institucional, Landing Page)", field: "servico" },
    { text: "Entendido! Por favor, me passe seu melhor e-mail para eu te enviar a proposta campeã.", field: "email" },
    { text: "Tudo pronto, ! Vamos analisar seus dados e te enviaremos a proposta o quanto antes. O lucro te espera!", field: "final" }
];

let currentStep = 0;
let userData = {};

// Função auxiliar para criar o elemento da mascote com imagem dinâmica
function createMascotElement() {
    const container = document.createElement('div');
    container.className = 'mascot-container';

    const img = document.createElement('img');
    
    // VERIFICAÇÃO DINÂMICA DO PASSO
    //questions.length - 1 é o índice da última pergunta ("Tudo pronto...")
    if (currentStep >= questions.length - 1) {
        // Se já fechamos o acordo (última mensagem), mostra com dinheiro
        img.src = "./img/TigrinhoContrato.png";
        img.alt = 'O Tigrinho Fechou Acordo';
    } else {
        // Para todas as outras etapas de cadastro, mostra com mãos vazias
        img.src = "./img/TigrinhoPositivo.png";
        img.alt = 'O Tigrinho Aguardando Dados';
    }

    img.className = 'mascot-image';

    container.appendChild(img);
    return container;
}

// Função para adicionar uma mensagem à interface
function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;

    // Cria o elemento da mascote apenas para o bot
    if (type === 'bot') {
        messageDiv.appendChild(createMascotElement());
    }

    // Cria o balão de texto
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'bubble';
    bubbleDiv.innerText = text;
    messageDiv.appendChild(bubbleDiv);

    // ADICIONA A HORA
    const now = new Date();
    const timeString = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
    
    const timeSpan = document.createElement('span');
    timeSpan.innerText = timeString;
    timeSpan.style.fontSize = "11px";
    timeSpan.style.color = "#999";
    timeSpan.style.marginLeft = "8px";
    timeSpan.style.alignSelf = "flex-end"; // Alinha na base do balão
    timeSpan.style.marginBottom = "5px";

    messageDiv.appendChild(timeSpan);

    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Função para simular o tempo de "digitação" do bot
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing';
    typingDiv.appendChild(createMascotElement());

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'bubble';
    bubbleDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    
    typingDiv.appendChild(bubbleDiv);
    chatLog.appendChild(typingDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
    
    return typingDiv; // Retorna o elemento para podermos removê-lo depois
}

// Função principal que gerencia o fluxo da conversa
function handleNextStep() {
    const answer = userInput.value.trim();
    if (answer === "") return; // Não faz nada se o input estiver vazio

    // Se houver nome, personaliza as perguntas futuras
    if (currentStep === 1) {
        questions[currentStep].text = questions[currentStep].text.replace('', answer);
    }
    if (currentStep === questions.length - 1) {
        questions[currentStep].text = questions[currentStep].text.replace('', userData.nome);
    }

    // Se estivermos em uma etapa que exige resposta (antes da final), salva
    if (currentStep < questions.length - 1) {
        userData[questions[currentStep].field] = answer;
    }
    
    // Adiciona a resposta do usuário
    addMessage(answer, 'user');
    userInput.value = ""; // Limpa o input
    currentStep++;

    // Verifica se há uma próxima pergunta
    if (currentStep < questions.length) {
        const typingElement = showTypingIndicator(); // Mostra "digitando"

        // Simula um atraso de 1,2 segundos para a resposta parecer real
        setTimeout(() => {
            typingElement.remove(); // Remove o indicador de "digitando"
            addMessage(questions[currentStep].text, 'bot');
            
            // Se for a última mensagem, exibe os dados salvos no console
            if (currentStep === questions.length - 1) {
                console.log("Dados Finais do Cliente:", userData);
            }
        }, 1200);
    }
}

// Ouvintes de eventos para o botão de envio e a tecla 'Enter'
sendBtn.addEventListener('click', handleNextStep);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleNextStep();
});

// Inicia o bot com a primeira mensagem
addMessage(questions[0].text, 'bot')