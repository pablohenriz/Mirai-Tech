/* ══════════════════════════════════════════════
           CONFIGURAÇÃO DO FLUXO
        ══════════════════════════════════════════════ */
const questions = [
    {
        text: "Olá! 👋 Sou a Mirai, sua consultora digital. Vamos criar algo incrível juntos? Para começar, como posso te chamar?",
        field: "nome",
        placeholder: "Digite seu nome..."
    },
    {
        text: "Prazer, {{nome}}! 🎯 Qual é o nome da sua empresa ou projeto?",
        field: "empresa",
        placeholder: "Nome da empresa ou projeto..."
    },
    {
        text: "Excelente! E em qual segmento vocês atuam?",
        field: "segmento",
        placeholder: null,
        options: ["Moda & Lifestyle", "Gastronomia", "Saúde & Bem-estar", "Tecnologia", "Serviços Profissionais", "Outro"]
    },
    {
        text: "Perfeito! Que tipo de projeto está buscando?",
        field: "servico",
        placeholder: null,
        options: ["Site Institucional", "Landing Page", "E-commerce", "Redesign / Refatoração", "Identidade Visual", "Pacote Completo"]
    },
    {
        text: "Ótima escolha! E qual seria o prazo ideal para a entrega?",
        field: "prazo",
        placeholder: null,
        options: ["Urgente (até 2 semanas)", "1 mês", "2–3 meses", "Sem pressa, quero qualidade"]
    },
    {
        text: "Temos uma noção de orçamento para direcionar melhor nossa proposta?",
        field: "orcamento",
        placeholder: null,
        options: ["Até R$ 3.000", "R$ 3.000 – R$ 8.000", "R$ 8.000 – R$ 20.000", "Acima de R$ 20.000", "Prefiro receber uma proposta"]
    },
    {
        text: "Quase lá! Me passa seu melhor e-mail para enviarmos a proposta personalizada para {{nome}}. 📩",
        field: "email",
        placeholder: "seuemail@exemplo.com"
    },
    {
        text: "E um WhatsApp para contato rápido? (opcional — pode deixar em branco)",
        field: "whatsapp",
        placeholder: "(11) 99999-9999"
    },
    {
        text: "final",
        field: "final",
        placeholder: null
    }
];

/* ══════════════════════════════════════════════
   ESTADO
══════════════════════════════════════════════ */
let currentStep = parseInt(localStorage.getItem('bot_step') || '0');
let userData = JSON.parse(localStorage.getItem('bot_userData') || '{}');
let historyLog = JSON.parse(localStorage.getItem('bot_history') || '[]');

const wrapper = document.getElementById('chat-wrapper');
const backBtn = document.getElementById('back-btn');
const progBar = document.getElementById('progress-bar');
const stepCtr = document.getElementById('step-counter');

/* ══════════════════════════════════════════════
   PERSISTÊNCIA
══════════════════════════════════════════════ */
function saveState() {
    localStorage.setItem('bot_step', currentStep);
    localStorage.setItem('bot_userData', JSON.stringify(userData));
    localStorage.setItem('bot_history', JSON.stringify(historyLog));
}
function clearState() {
    localStorage.removeItem('bot_step');
    localStorage.removeItem('bot_userData');
    localStorage.removeItem('bot_history');
}

/* ══════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════ */
function getTime() {
    const n = new Date();
    return n.getHours() + ':' + n.getMinutes().toString().padStart(2, '0');
}
function fillTemplate(t) {
    return t.replace(/\{\{(\w+)\}\}/g, (_, k) => userData[k] || '');
}
function scrollBot() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}
function removeActiveInput() {
    const el = document.getElementById('active-input-block');
    if (el) el.remove();
}

/* ── mascot ── */
function createMascot(stepIndex) {
    const div = document.createElement('div');
    div.className = 'mascot-container';

    const img = new Image();
    const isFinal = questions[stepIndex] && questions[stepIndex].field === 'final';
    img.src = isFinal ? './img/TigrinhoContrato.png' : './img/TigrinhoPositivo.png';
    img.alt = 'Mirai';
    img.style.cssText = 'width:130%;height:auto;object-fit:contain;transform:translateY(18%)';

    img.onerror = () => {
        div.innerHTML = '<span class="mascot-icon">🤖</span>';
    };
    img.onload = () => {
        div.innerHTML = '';
        div.appendChild(img);
    };
    div.innerHTML = '<span class="mascot-icon">🤖</span>';
    return div;
}

/* ── progress & pips ── */
function updateProgress() {
    const total = questions.length - 1;
    const current = Math.min(currentStep, total);
    const pct = total > 0 ? (current / total) * 100 : 0;
    progBar.style.width = pct + '%';

    stepCtr.innerHTML = '';
    for (let i = 0; i < total; i++) {
        const pip = document.createElement('div');
        pip.className = 'step-pip' +
            (i < current ? ' done' : '') +
            (i === current ? ' active' : '');
        stepCtr.appendChild(pip);
    }
}

function updateBackBtn() {
    backBtn.disabled = currentStep <= 0;
}

/* ══════════════════════════════════════════════
   VALIDAÇÃO DE E-MAIL
══════════════════════════════════════════════ */

/** Mostra erro (e-mail inválido) no campo */
function showInputError(input, msg) {
    const inputRow = input.closest('.inline-input-row');
    inputRow.classList.add('error');
    inputRow.classList.remove('warning');

    // remove feedback anterior
    const prev = inputRow.parentElement.querySelector('.input-feedback');
    if (prev) prev.remove();

    const fb = document.createElement('p');
    fb.className = 'input-feedback error';
    fb.textContent = '✖ ' + msg;
    inputRow.insertAdjacentElement('afterend', fb);

    // shake
    input.style.animation = 'none';
    setTimeout(() => { input.style.animation = ''; }, 10);

    setTimeout(() => {
        inputRow.classList.remove('error');
        if (fb.parentElement) fb.remove();
    }, 3000);
}

/** Mostra aviso (não é Gmail) com botões de confirmação */
function showInputWarning(input, msg, emailValue) {
    const inputRow = input.closest('.inline-input-row');
    inputRow.classList.add('warning');
    inputRow.classList.remove('error');

    // remove feedback anterior
    const prev = inputRow.parentElement.querySelector('.input-feedback');
    if (prev) prev.remove();
    const prevConfirm = inputRow.parentElement.querySelector('.confirm-row');
    if (prevConfirm) prevConfirm.remove();

    const fb = document.createElement('p');
    fb.className = 'input-feedback warning';
    fb.textContent = msg;
    inputRow.insertAdjacentElement('afterend', fb);

    const confirmRow = document.createElement('div');
    confirmRow.className = 'confirm-row';

    const btnYes = document.createElement('button');
    btnYes.className = 'btn-confirm yes';
    btnYes.textContent = '✔ Sim, usar este e-mail';
    btnYes.addEventListener('click', () => {
        // limpa avisos e prossegue
        inputRow.classList.remove('warning');
        fb.remove();
        confirmRow.remove();
        handleAnswer(emailValue);
    });

    const btnNo = document.createElement('button');
    btnNo.className = 'btn-confirm no';
    btnNo.textContent = '✎ Corrigir e-mail';
    btnNo.addEventListener('click', () => {
        inputRow.classList.remove('warning');
        fb.remove();
        confirmRow.remove();
        input.value = '';
        input.focus();
    });

    confirmRow.appendChild(btnYes);
    confirmRow.appendChild(btnNo);
    fb.insertAdjacentElement('afterend', confirmRow);
    scrollBot();
}

/* ══════════════════════════════════════════════
   RENDER — mensagem usuário
══════════════════════════════════════════════ */
function renderUserMessage(text, time) {
    const row = document.createElement('div');
    row.className = 'message user';

    const col = document.createElement('div');
    col.className = 'user-row';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;

    const ts = document.createElement('span');
    ts.className = 'msg-time';
    ts.textContent = time;

    col.appendChild(bubble);
    col.appendChild(ts);
    row.appendChild(col);
    wrapper.appendChild(row);
}

/* ══════════════════════════════════════════════
   RENDER — mensagem bot
══════════════════════════════════════════════ */
function renderBotMessage(stepIndex, time, interactive) {
    const q = questions[stepIndex];
    if (!q) return;

    const isFinal = q.field === 'final';
    const row = document.createElement('div');
    row.className = 'message bot';
    if (interactive && !isFinal) row.id = 'active-input-block';

    const col = document.createElement('div');
    col.className = 'bot-column';

    /* ── FINAL ── */
    if (isFinal) {
        const card = document.createElement('div');
        card.className = 'final-card';

        card.innerHTML = `
      <div class="final-card-icon">🎉</div>
      <div>
        <h3>Proposta recebida, ${userData.nome || 'você'}!</h3>
        <p>Em breve nossa equipe vai analisar suas informações e enviar uma proposta personalizada para <strong style="color:var(--cyan)">${userData.email || 'seu e-mail'}</strong>.</p>
      </div>
    `;

        const summary = document.createElement('div');
        summary.className = 'final-summary';
        const fields = [
            { label: 'Nome', key: 'nome' },
            { label: 'Empresa', key: 'empresa' },
            { label: 'Segmento', key: 'segmento' },
            { label: 'Projeto', key: 'servico' },
            { label: 'Prazo', key: 'prazo' },
            { label: 'Orçamento', key: 'orcamento' },
            { label: 'E-mail', key: 'email' },
            { label: 'WhatsApp', key: 'whatsapp' },
        ];
        fields.forEach(f => {
            if (!userData[f.key]) return;
            const r = document.createElement('div');
            r.className = 'summary-row';
            r.innerHTML = `<span class="summary-label">${f.label}</span><span class="summary-value">${userData[f.key]}</span>`;
            summary.appendChild(r);
        });
        card.appendChild(summary);

        const restart = document.createElement('button');
        restart.className = 'btn-reiniciar';
        restart.innerHTML = '↺ Novo orçamento';
        restart.addEventListener('click', reiniciar);
        card.appendChild(restart);

        const ts = document.createElement('span');
        ts.className = 'msg-time';
        ts.textContent = time;

        col.appendChild(card);
        col.appendChild(ts);

        if (interactive) {
            console.log('📦 Dados do cliente:', userData);
            clearState();
        }

        /* ── OPÇÕES ── */
    } else if (q.options) {
        const bigBubble = document.createElement('div');
        bigBubble.className = 'bubble-with-input';

        const bt = document.createElement('p');
        bt.className = 'bubble-text';
        bt.textContent = fillTemplate(q.text);
        bigBubble.appendChild(bt);

        if (interactive) {
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

        const ts = document.createElement('span');
        ts.className = 'msg-time';
        ts.textContent = time;

        col.appendChild(bigBubble);
        col.appendChild(ts);

        /* ── INPUT TEXTO ── */
    } else {
        const bigBubble = document.createElement('div');
        bigBubble.className = 'bubble-with-input';

        const bt = document.createElement('p');
        bt.className = 'bubble-text';
        bt.textContent = fillTemplate(q.text);
        bigBubble.appendChild(bt);

        if (interactive) {
            const inputRow = document.createElement('div');
            inputRow.className = 'inline-input-row';

            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'user-input';
            input.placeholder = q.placeholder || 'Digite aqui...';
            input.autocomplete = 'off';

            const sendBtn = document.createElement('button');
            sendBtn.id = 'send-btn';
            sendBtn.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`;

            const submit = () => {
                const val = input.value.trim();

                // campo whatsapp pode ser pulado
                if (!val && q.field !== 'whatsapp') return;

                // ── Validação de e-mail ──
                if (q.field === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(val)) {
                        showInputError(input, 'Por favor, insira um e-mail válido.');
                        return;
                    }
                    if (!val.toLowerCase().endsWith('@gmail.com')) {
                        showInputWarning(
                            input,
                            '⚠️ Esse não é um Gmail. Deseja continuar mesmo assim?',
                            val
                        );
                        return;
                    }
                }

                handleAnswer(val || '—');
            };

            sendBtn.addEventListener('click', submit);
            input.addEventListener('keypress', e => { if (e.key === 'Enter') submit(); });

            inputRow.appendChild(input);
            inputRow.appendChild(sendBtn);
            bigBubble.appendChild(inputRow);

            setTimeout(() => input.focus(), 120);
        }

        const ts = document.createElement('span');
        ts.className = 'msg-time';
        ts.textContent = time;

        col.appendChild(bigBubble);
        col.appendChild(ts);
    }

    row.appendChild(createMascot(stepIndex));
    row.appendChild(col);
    wrapper.appendChild(row);
}

/* ══════════════════════════════════════════════
   TYPING INDICATOR
══════════════════════════════════════════════ */
function showTyping(stepIndex, cb) {
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
    scrollBot();

    setTimeout(() => { row.remove(); cb(); }, 1100);
}

/* ══════════════════════════════════════════════
   ADD MESSAGES
══════════════════════════════════════════════ */
function addUserMessage(text) {
    const time = getTime();
    historyLog.push({ type: 'user', text, time });
    saveState();
    renderUserMessage(text, time);
    scrollBot();
}

function addBotMessage(stepIndex) {
    const time = getTime();
    historyLog.push({ type: 'bot', stepIndex, time });
    saveState();
    renderBotMessage(stepIndex, time, true);
    updateBackBtn();
    updateProgress();
    scrollBot();
}

/* ══════════════════════════════════════════════
   HANDLE ANSWER
══════════════════════════════════════════════ */
function handleAnswer(answer) {
    const q = questions[currentStep];
    if (currentStep < questions.length - 1) {
        userData[q.field] = answer;
    }

    const activeBlock = document.getElementById('active-input-block');
    if (activeBlock) {
        const si = currentStep;
        const tsEl = activeBlock.querySelector('.msg-time');
        const t = tsEl ? tsEl.textContent : getTime();
        activeBlock.remove();
        renderBotMessage(si, t, false);
    }

    addUserMessage(answer);
    currentStep++;
    saveState();
    updateProgress();

    if (currentStep < questions.length) {
        showTyping(currentStep, () => addBotMessage(currentStep));
    }
}

/* ══════════════════════════════════════════════
   VOLTAR
══════════════════════════════════════════════ */
function voltarPasso() {
    if (currentStep <= 0) return;

    removeActiveInput();

    if (historyLog.length && historyLog[historyLog.length - 1].type === 'bot')
        historyLog.pop();

    if (historyLog.length && historyLog[historyLog.length - 1].type === 'user') {
        historyLog.pop();
        if (wrapper.lastChild) wrapper.removeChild(wrapper.lastChild);
    }

    if (wrapper.lastChild) wrapper.removeChild(wrapper.lastChild);

    currentStep--;
    const f = questions[currentStep].field;
    delete userData[f];

    saveState();
    updateBackBtn();
    updateProgress();

    const last = historyLog[historyLog.length - 1];
    if (last) renderBotMessage(last.stepIndex, last.time, true);
    scrollBot();
}

/* ══════════════════════════════════════════════
   REINICIAR
══════════════════════════════════════════════ */
function reiniciar() {
    clearState();
    currentStep = 0;
    userData = {};
    historyLog = [];
    wrapper.innerHTML = '';
    updateProgress();
    addBotMessage(0);
}

/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */
function init() {
    updateProgress();
    if (historyLog.length > 0) {
        historyLog.forEach((entry, i) => {
            const isLast = i === historyLog.length - 1;
            if (entry.type === 'user') renderUserMessage(entry.text, entry.time);
            else renderBotMessage(entry.stepIndex, entry.time, isLast);
        });
        scrollBot();
    } else {
        currentStep = 0; userData = {};
        addBotMessage(0);
    }
    updateBackBtn();
}

init();