// ════════════════════════════════════════════
// CONFIGURAÇÃO DO FLUXO DE PERGUNTAS
// ════════════════════════════════════════════
const questions = [
    {
        text: "Olá! Sou o seu consultor financeiro. Pronto para faturar muito dinheiro com um novo projeto? Para começar, como posso te chamar?",
        field: "nome",
        placeholder: "Digite seu nome..."
    },
    {
        text: "Prazer, {{nome}}! E qual o nome da sua empresa que vai dominar o mercado?",
        field: "empresa",
        placeholder: "Nome da sua empresa..."
    },
    {
        text: "Perfeito! Qual tipo de projeto vai te render mais lucros?",
        field: "servico",
        placeholder: null,
        options: ["E-commerce", "Site Institucional", "Landing Page"]
    },
    {
        text: "Entendido! Por favor, me passe seu melhor e-mail para eu te enviar a proposta campeã.",
        field: "email",
        placeholder: "seuemail@exemplo.com"
    },
    {
        text: "Tudo pronto, {{nome}}! Vamos analisar seus dados e te enviaremos a proposta o quanto antes. O lucro te espera!",
        field: "final",
        placeholder: null
    }
];

// ════════════════════════════════════════════
// ESTADO — carregado do localStorage
// ════════════════════════════════════════════
// historyLog = array de { type:'bot'|'user', text?, stepIndex?, time }
let currentStep = parseInt(localStorage.getItem('bot_step') || '0');
let userData    = JSON.parse(localStorage.getItem('bot_userData') || '{}');
let historyLog  = JSON.parse(localStorage.getItem('bot_history') || '[]');

const wrapper = document.getElementById('chat-wrapper');
const backBtn = document.getElementById('back-btn');

// ════════════════════════════════════════════
// PERSISTÊNCIA
// ════════════════════════════════════════════
function saveState() {
    localStorage.setItem('bot_step',     currentStep);
    localStorage.setItem('bot_userData', JSON.stringify(userData));
    localStorage.setItem('bot_history',  JSON.stringify(historyLog));
}

function clearState() {
    localStorage.removeItem('bot_step');
    localStorage.removeItem('bot_userData');
    localStorage.removeItem('bot_history');
}

// ════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════
function getTime() {
    const now = new Date();
    return now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
}

function fillTemplate(text) {
    return text.replace(/\{\{(\w+)\}\}/g, (_, key) => userData[key] || '');
}

function getMascotSrc(stepIndex) {
    return stepIndex >= questions.length - 1
        ? "./img/TigrinhoContrato.png"
        : "./img/TigrinhoPositivo.png";
}

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function removeActiveInput() {
    const el = document.getElementById('active-input-block');
    if (el) el.remove();
}

function createMascot(stepIndex) {
    const div = document.createElement('div');
    div.className = 'mascot-container';
    const img = document.createElement('img');
    img.src = getMascotSrc(stepIndex);
    img.alt = stepIndex >= questions.length - 1 ? 'Tigrinho Fechou Acordo' : 'Tigrinho Positivo';
    img.className = 'mascot-image';
    div.appendChild(img);
    return div;
}

function updateBackBtn() {
    backBtn.disabled = currentStep <= 0;
}

// ════════════════════════════════════════════
// RENDERIZA MENSAGEM DO USUÁRIO (somente visual)
// ════════════════════════════════════════════
function renderUserMessage(text, time) {
    const row = document.createElement('div');
    row.className = 'message user';

    const col = document.createElement('div');
    col.className = 'user-row';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;

    const timeSpan = document.createElement('span');
    timeSpan.className = 'msg-time';
    timeSpan.textContent = time;

    col.appendChild(bubble);
    col.appendChild(timeSpan);
    row.appendChild(col);
    wrapper.appendChild(row);
}

// ════════════════════════════════════════════
// RENDERIZA MENSAGEM DO BOT (somente visual)
// interactive=true → mostra input/botões ativos
// interactive=false → mostra só o texto (histórico)
// ════════════════════════════════════════════
function renderBotMessage(stepIndex, time, interactive) {
    const q = questions[stepIndex];
    if (!q) return;

    const resolvedText = fillTemplate(q.text);
    const isFinal = q.field === 'final';

    const row = document.createElement('div');
    row.className = 'message bot';
    if (interactive && !isFinal) row.id = 'active-input-block';

    const col = document.createElement('div');
    col.className = 'bot-column';

    // ── Última mensagem (sem input) ──────────
    if (isFinal) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = resolvedText;

        const timeSpan = document.createElement('span');
        timeSpan.className = 'msg-time';
        timeSpan.textContent = time;

        col.appendChild(bubble);
        col.appendChild(timeSpan);

        if (interactive) {
            console.log("Dados Finais do Cliente:", userData);
            clearState();
        }

    // ── Pergunta com botões de opção ─────────
    } else if (q.options) {
        const bigBubble = document.createElement('div');
        bigBubble.className = 'bubble-with-input';

        const bubbleText = document.createElement('p');
        bubbleText.className = 'bubble-text';
        bubbleText.textContent = resolvedText;
        bigBubble.appendChild(bubbleText);

        if (interactive) {
            // Mostra os botões clicáveis
            const label = document.createElement('p');
            label.className = 'options-label';
            label.textContent = 'Escolha uma opção';
            bigBubble.appendChild(label);

            const optRow = document.createElement('div');
            optRow.className = 'options-row';

            q.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.textContent = opt;
                btn.addEventListener('click', () => handleAnswer(opt));
                optRow.appendChild(btn);
            });

            bigBubble.appendChild(optRow);
        }
        // Se não for interativo, só mostra o texto (a resposta já aparece como mensagem do usuário)

        const timeSpan = document.createElement('span');
        timeSpan.className = 'msg-time';
        timeSpan.textContent = time;

        col.appendChild(bigBubble);
        col.appendChild(timeSpan);

    // ── Pergunta com input de texto ──────────
    } else {
        const bigBubble = document.createElement('div');
        bigBubble.className = 'bubble-with-input';

        const bubbleText = document.createElement('p');
        bubbleText.className = 'bubble-text';
        bubbleText.textContent = resolvedText;
        bigBubble.appendChild(bubbleText);

        if (interactive) {
            // Mostra o campo de digitação ativo
            const inputRow = document.createElement('div');
            inputRow.className = 'inline-input-row';

            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'user-input';
            input.placeholder = q.placeholder || 'Digite aqui...';
            input.autocomplete = 'off';

            const sendBtn = document.createElement('button');
            sendBtn.id = 'send-btn';
            sendBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>`;

            const submit = () => {
                const val = input.value.trim();
                if (!val) return;
                handleAnswer(val);
            };

            sendBtn.addEventListener('click', submit);
            input.addEventListener('keypress', e => {
                if (e.key === 'Enter') submit();
            });

            inputRow.appendChild(input);
            inputRow.appendChild(sendBtn);
            bigBubble.appendChild(inputRow);

            setTimeout(() => input.focus(), 100);
        }
        // Se não for interativo, só o texto da pergunta aparece

        const timeSpan = document.createElement('span');
        timeSpan.className = 'msg-time';
        timeSpan.textContent = time;

        col.appendChild(bigBubble);
        col.appendChild(timeSpan);
    }

    row.appendChild(createMascot(stepIndex));
    row.appendChild(col);
    wrapper.appendChild(row);
}

// ════════════════════════════════════════════
// INDICADOR DE DIGITANDO
// ════════════════════════════════════════════
function showTyping(stepIndex, callback) {
    const row = document.createElement('div');
    row.className = 'message bot';
    row.id = 'typing-indicator';

    const col = document.createElement('div');
    col.className = 'bot-column';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';

    col.appendChild(bubble);
    row.appendChild(createMascot(stepIndex));
    row.appendChild(col);
    wrapper.appendChild(row);
    scrollToBottom();

    setTimeout(() => {
        row.remove();
        callback();
    }, 1200);
}

// ════════════════════════════════════════════
// ADICIONA MENSAGEM DO USUÁRIO (+ salva)
// ════════════════════════════════════════════
function addUserMessage(text) {
    const time = getTime();
    historyLog.push({ type: 'user', text, time });
    saveState();
    renderUserMessage(text, time);
    scrollToBottom();
}

// ════════════════════════════════════════════
// ADICIONA MENSAGEM DO BOT (+ salva)
// ════════════════════════════════════════════
function addBotMessage(stepIndex) {
    const time = getTime();
    historyLog.push({ type: 'bot', stepIndex, time });
    saveState();
    renderBotMessage(stepIndex, time, true);
    updateBackBtn();
    scrollToBottom();
}

// ════════════════════════════════════════════
// PROCESSA RESPOSTA E AVANÇA
// ════════════════════════════════════════════
function handleAnswer(answer) {
    if (currentStep < questions.length - 1) {
        userData[questions[currentStep].field] = answer;
    }

    // Converte o balão atual de interativo → somente leitura (remove o input/botões)
    const activeBlock = document.getElementById('active-input-block');
    if (activeBlock) {
        // Guarda o stepIndex antes de remover
        const stepIndex = currentStep;
        const time = activeBlock.querySelector('.msg-time')
            ? activeBlock.querySelector('.msg-time').textContent
            : getTime();

        activeBlock.remove();

        // Rerenderiza como somente leitura (sem input)
        renderBotMessage(stepIndex, time, false);
    }

    addUserMessage(answer);
    currentStep++;
    saveState();

    if (currentStep < questions.length) {
        showTyping(currentStep, () => {
            addBotMessage(currentStep);
        });
    }
}

// ════════════════════════════════════════════
// BOTÃO VOLTAR
// ════════════════════════════════════════════
function voltarPasso() {
    if (currentStep <= 0) return;

    // 1. Remove visualmente tudo a partir da última pergunta do bot atual
    //    (o active-input-block + a mensagem do usuário anterior, se houver)
    removeActiveInput();

    // Remove a última entrada do bot do historyLog e da tela
    // e também a resposta do usuário que a precedeu
    // Estrutura: [..., bot(step N-1), user(resp), bot(step N=current)]
    // Queremos voltar para bot(step N-1) interativo

    // Remove bot atual do historyLog (último item)
    if (historyLog.length && historyLog[historyLog.length - 1].type === 'bot') {
        historyLog.pop();
    }

    // Remove a resposta do usuário do historyLog e da tela
    if (historyLog.length && historyLog[historyLog.length - 1].type === 'user') {
        historyLog.pop();
        // Remove o último elemento visual (mensagem do usuário)
        if (wrapper.lastChild) wrapper.removeChild(wrapper.lastChild);
    }

    // Remove o último bot renderizado da tela (somente leitura)
    if (wrapper.lastChild) wrapper.removeChild(wrapper.lastChild);

    // Volta o step e limpa o campo
    currentStep--;
    const fieldToRemove = questions[currentStep].field;
    delete userData[fieldToRemove];

    saveState();
    updateBackBtn();

    // Rerenderiza a pergunta atual como interativa
    // (sem adicionar ao historyLog de novo — já está lá)
    const lastBotEntry = historyLog[historyLog.length - 1];
    renderBotMessage(
        lastBotEntry.stepIndex,
        lastBotEntry.time,
        true
    );

    scrollToBottom();
}

// ════════════════════════════════════════════
// INICIALIZAÇÃO
// ════════════════════════════════════════════
function init() {
    if (historyLog.length > 0) {
        // Restaura o histórico completo
        historyLog.forEach((entry, index) => {
            const isLast = index === historyLog.length - 1;
            if (entry.type === 'user') {
                renderUserMessage(entry.text, entry.time);
            } else {
                // Último bot = interativo | anteriores = somente leitura
                renderBotMessage(entry.stepIndex, entry.time, isLast);
            }
        });
        scrollToBottom();
    } else {
        // Conversa nova
        currentStep = 0;
        userData = {};
        addBotMessage(0);
    }

    updateBackBtn();
}

init();