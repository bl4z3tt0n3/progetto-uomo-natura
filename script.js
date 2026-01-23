const quizData = [
    {
        question: "Il testo sostiene che la frattura tra uomo e natura inizia principalmente con l'agricoltura avanzata (~3000 anni fa). Quale conseguenza filosofica viene evidenziata come più profonda di questa separazione?",
        options: [
            "La perdita della capacità di coltivare piante",
            "Il passaggio da vedere la natura come 'estensione di sé' a vederla come 'risorsa da sfruttare'",
            "L'abbandono delle pitture rupestri come forma d'arte",
            "La comparsa della matematica come unica scienza valida"
        ],
        correct: 1,
        explanation: "Il testo sottolinea il cambio di prospettiva da 'estensione di sé' a 'oggetto di sfruttamento e profitto', una frattura concettuale che ha richiesto secoli per essere analizzata."
    },
    {
        question: "San Francesco e Galileo rappresentano due approcci opposti alla natura. Quale paradosso viene rivelato dal testo riguardo a Galileo?",
        options: [
            "Ha inventato la matematica per controllare la natura, ma ha anche inventato il metodo scientifico",
            "Ha teorizzato la separazione completa della sfera spirituale dalla natura, ma il suo stesso Principio del Cubo-Quadrato dimostra che l'uomo NON può prescindere dalle leggi naturali",
            "Ha scritto poesie sulla natura mentre studava fisica",
            "Ha rifiutato la scienza ma poi ha fondato l'allometria come disciplina"
        ],
        correct: 1,
        explanation: "Galileo ha formalizzato il distacco concettuale tra uomo e natura, ma ironicamente la sua stessa scoperta scientifica rivela che i limiti della natura sono inaggirabili."
    },
    {
        question: "La 'legge del cubo-quadrato' di Galileo viene citata nel testo per dimostrare che:",
        options: [
            "La crescita infinita è naturale e sostenuta dalle leggi matematiche",
            "Solo gli organismi unicellulari hanno limiti di crescita",
            "Esistono limiti strutturali ineludibili alla crescita: al crescere delle dimensioni, il volume aumenta più velocemente della superficie, rendendo insostenibile l'espansione infinita",
            "La geometria è più importante della fisica nello studio della natura"
        ],
        correct: 2,
        explanation: "Questo principio biologico (allometria) mostra che qualsiasi organismo, inclusi i sistemi umani complessi, rischia il collasso se ignora le proporzioni vitali imposte dalla natura."
    },
    {
        question: "Nel testo, Leopardi si differenzia dalla visione classica della natura principalmente attraverso:",
        options: [
            "L'uso di figure mitologiche nelle sue poesie",
            "La descrizione del 'giardino di sofferenza' che rivela come ogni essere vivente esista in costante sofferenza, non in armonia",
            "L'abbandono della letteratura scritta a favore dell'arte visiva",
            "La celebrazione della superiorità assoluta dell'uomo sulla natura"
        ],
        correct: 1,
        explanation: "Leopardi descrive il 'giardino di sofferenza' per smontare l'illusione del rigoglio naturale e sottolinea che la natura non è armoniosa come la tradizione classica la presentava."
    },
    {
        question: "Analizzando le tre poetesse/poeti del testo (Leopardi, Keats, Dickinson), quale differenza emergente suggerisce una progressiva perdita di controllo dell'uomo sulla natura?",
        options: [
            "Leopardi descrive sofferenza, Keats descrive bellezza ciclo, Dickinson vede segretezza indomabile",
            "Tutti e tre descrivono lo stesso significato della natura",
            "Leopardi usa la prosa, Keats usa il verso, Dickinson usa il teatro",
            "La loro evoluzione temporale non rivela alcun cambiamento di percezione"
        ],
        correct: 0,
        explanation: "La progressione letteraria mostra una crescente consapevolezza dei limiti umani: dalla sofferenza nascosta, alla bellezza effimera e ciclica, fino alla natura come forza maestosa e indomabile."
    },
    {
        question: "Il concetto di 'ecosofia' di Raimon Panikkar viene proposto nel testo come superamento dell'ecologia tradizionale perché:",
        options: [
            "Propone di eliminare completamente la tecnica e la tecnologia",
            "Richiede un cambio radicale della forma mentis umana e il riconoscimento del pluralismo di tutti gli esseri viventi, non solo degli umani",
            "Enfatizza solo l'aspetto economico dello sviluppo sostenibile",
            "Sostiene che la natura sia completamente controllabile attraverso la ragione"
        ],
        correct: 1,
        explanation: "L'ecosofia non è solo ecologia: richiede un dialogo più profondo basato su un cambio totale di mentalità e sul riconoscimento della dignità di tutti gli esseri viventi."
    },
    {
        question: "Il testo termina con una contraddizione critica: mentre l'Occidente teorizza la riconnessione uomo-natura attraverso Land Art e Terzo paesaggio, cosa accade concretamente ai Pigmei del Congo?",
        options: [
            "Ricevono finanziamenti per proteggere la biodiversità della loro regione",
            "Vivono già in simbiosi concreta con la natura, ma sono esiliati dalle foreste dalle 'eco-guardie' assoldate da organizzazioni come il WWF, rivelando l'ipocrisia ecologista occidentale",
            "Sono invitati a partecipare ai progetti di Land Art europei",
            "Ottengono il controllo totale sui loro terreni ancestrali"
        ],
        correct: 1,
        explanation: "Questa conclusione evidenzia il paradosso: mentre l'Occidente teorizza la riconciliazione, le popolazioni che già praticano concretamente la simbiosi con la natura sono violentemente espulse in nome della 'conservazione'."
    }
];

let currentQuestion = 0;
let score = 0;
let answers = [];

// Funzione principale che avvia il quiz solo quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
});

function initQuiz() {
    // Controllo se esiste l'elemento per evitare errori nelle altre pagine
    if(document.getElementById('quiz-content')) {
        renderQuestion();
    }
}

function renderQuestion() {
    const quizContent = document.getElementById('quiz-content');
    const currentQ = quizData[currentQuestion];
    
    // Pulisce il contenuto precedente
    quizContent.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'question-container active';
    
    // Costruisce l'HTML della domanda
    let optionsHtml = '';
    currentQ.options.forEach((option, idx) => {
        optionsHtml += `<div class="option" onclick="selectOption(${idx})">${option}</div>`;
    });

    container.innerHTML = `
        <div class="question-number">Domanda ${currentQuestion + 1} di ${quizData.length}</div>
        <div class="question-text">${currentQ.question}</div>
        <div class="options">
            ${optionsHtml}
        </div>
        <div class="feedback"></div>
        <div class="button-group">
            <button class="btn-next" id="next-btn" disabled onclick="nextQuestion()">Prossima Domanda</button>
        </div>
    `;
    
    quizContent.appendChild(container);
    updateProgress();
}

function selectOption(idx) {
    const options = document.querySelectorAll('.option');
    const currentQ = quizData[currentQuestion];
    const feedback = document.querySelector('.feedback');
    const nextBtn = document.getElementById('next-btn');
    
    // Disabilita ulteriori click sulle opzioni per evitare cambi di risposta
    options.forEach(opt => {
        opt.style.pointerEvents = 'none'; // Importante: impedisce click multipli
        opt.onclick = null; // Rimuove il listener
    });

    // Gestione visuale e punteggio
    options.forEach((opt, i) => {
        if (i === idx) {
            // Opzione selezionata dall'utente
            if (i === currentQ.correct) {
                opt.classList.add('correct');
                feedback.className = 'feedback show correct';
                feedback.textContent = '✓ Corretto! ' + currentQ.explanation;
                score++;
            } else {
                opt.classList.add('incorrect');
                feedback.className = 'feedback show incorrect';
                feedback.textContent = '✗ Sbagliato. ' + currentQ.explanation;
                // Evidenzia anche quella giusta
                options[currentQ.correct].classList.add('correct');
            }
            
            // Salva la risposta
            answers.push({
                question: currentQ.question,
                selected: currentQ.options[idx],
                correct: currentQ.options[currentQ.correct],
                isCorrect: i === currentQ.correct
            });
            
            // Abilita il pulsante "Avanti"
            nextBtn.disabled = false;
        }
    });
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    const bar = document.querySelector('.progress-fill');
    if(bar) bar.style.width = progress + '%';
}

function showResults() {
    document.getElementById('quiz-content').style.display = 'none';
    const resultsContainer = document.getElementById('results');
    resultsContainer.classList.add('active');
    resultsContainer.style.display = 'block'; // Forza la visualizzazione
    
    document.getElementById('score-display').textContent = `${score}/${quizData.length}`;
    
    const percentage = (score / quizData.length) * 100;
    let message = '';
    if (percentage === 100) {
        message = '🏆 Perfetto! Conosci davvero bene questo argomento!';
    } else if (percentage >= 80) {
        message = '🎉 Ottimo! Hai una solida comprensione del tema.';
    } else if (percentage >= 60) {
        message = '👍 Bene! Hai compreso i concetti principali.';
    } else {
        message = '📖 Continua a studiare! Puoi fare di meglio.';
    }
    
    document.getElementById('result-message').textContent = message;
    document.getElementById('result-details').textContent = `Hai ottenuto ${score} risposte corrette su ${quizData.length} domande (${percentage.toFixed(0)}%).`;
    
    const reviewHtml = answers.map((ans, idx) => `
        <div class="answer-item ${ans.isCorrect ? 'correct-answer' : 'wrong-answer'}">
            <div class="answer-label">Domanda ${idx + 1}: ${ans.isCorrect ? '✓ Corretta' : '✗ Sbagliata'}</div>
            <div class="answer-text"><strong>La tua risposta:</strong> ${ans.selected}</div>
            ${!ans.isCorrect ? `<div class="answer-text"><strong>Risposta corretta:</strong> ${ans.correct}</div>` : ''}
        </div>
    `).join('');
    document.getElementById('answer-review').innerHTML = reviewHtml;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answers = [];
    
    document.getElementById('results').classList.remove('active');
    document.getElementById('results').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    
    renderQuestion();
}
