
function toggleDark() {
    document.body.classList.toggle('dark');
    const knop = document.getElementById('darkmode-knop');
    if (document.body.classList.contains('dark')) {
        knop.textContent = '☀️ Light mode';
        localStorage.setItem('darkmode', 'aan');
    } else {
        knop.textContent = '🌙 Dark mode';
        localStorage.setItem('darkmode', 'uit');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkmode') === 'aan') {
        document.body.classList.add('dark');
        const knop = document.getElementById('darkmode-knop');
        if (knop) knop.textContent = '☀️ Light mode';
    }
});


function berekenPrijs() {

    const snaar = parseFloat(document.getElementById('snaar-keuze').value);
    
    const grip = document.getElementById('grip').checked ? 2.5 : 0;
    const bezorg = document.getElementById('bezorg').checked ? 2.5 : 0;
    const demper = document.getElementById('Demp').checked ? 2.5 : 0; // Variabele naam aangepast naar 'demper'

    const totaal = snaar + grip + bezorg + demper;

    const el = document.getElementById('totaal-prijs');
    if (el) {
        el.textContent = '€' + totaal.toFixed(2).replace('.', ',').replace(',00', ',-');
    }
}
function verstuurBericht() {
    const naam = document.getElementById('naam')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const bericht = document.getElementById('bericht')?.value.trim();

    if (!naam || !email || !bericht) {
        alert('Vul alle velden in voordat je verstuurt!');
        return;
    }

    const onderwerp = encodeURIComponent('Bespanning aanvraag van ' + naam);
    const body = encodeURIComponent('Naam: ' + naam + '\nE-mail: ' + email + '\n\n' + bericht);
    window.location.href = 'mailto:smashrackets@gmail.com?subject=' + onderwerp + '&body=' + body;

    const bevestiging = document.getElementById('form-bevestiging');
    if (bevestiging) {
        bevestiging.classList.remove('verborgen');
    }
}








const quizAntwoorden = {};
const TOTAAL_STAPPEN = 4;

function kiesOptie(stap, keuze) {
    quizAntwoorden[stap] = keuze;

    const dot = document.getElementById('dot-' + stap);
    if (dot) {
        dot.classList.remove('actief');
        dot.classList.add('klaar');
    }




    document.getElementById('quiz-stap-' + stap).classList.add('verborgen');

    const volgend = stap + 1;
    const volgendeEl = document.getElementById('quiz-stap-' + volgend);

    if (volgendeEl) {
        volgendeEl.classList.remove('verborgen');


        const volgenDot = document.getElementById('dot-' + volgend);
        if (volgenDot) volgenDot.classList.add('actief');
    } else {
        document.getElementById('quiz-voortgang').classList.add('verborgen');
        toonResultaat();
    }
}

function toonResultaat() {
    const niveau    = quizAntwoorden[1];
    const prioriteit = quizAntwoorden[2]; 
    const budget    = quizAntwoorden[3]; 
    const stijl     = quizAntwoorden[4]; 

    let snaar = '';
    let prijs = '';
    let uitleg = '';

    if (stijl === 'rallyer' && (budget === 'hoog' || niveau === 'gevorderd') && prioriteit !== 'controle') {
        snaar  = 'Babolat Hurricane';
        prijs  = '€17,50,-';
        uitleg = 'Dé snaar voor de hardhoekige baselinespeler. Brutale spin, strak gevoel en een lange levensduur. Nadal speelde er z\'n hele carrière mee — zegt genoeg!';

    
    } else if (budget === 'hoog' || (niveau === 'gevorderd' )) {
        snaar  = 'Luxilon Alu Power';
        prijs  = '€35,-';
        uitleg = 'De snaar van de profs. Maximale controle, diepe spin en een ijzersterk gevoel. Voor wie het serieus meent.';


    } else if (budget === 'laag' || niveau === 'beginner') {
        snaar  = "Pro's Pro";
        prijs  = '€15,-';
        uitleg = 'Betaalbaar, prettig en degelijk. Perfect om mee te starten zonder je portemonnee leeg te trekken.';


    } else {
        snaar  = 'Head Sonic Pro';
        prijs  = '€20,-';
        uitleg = 'Onze populairste snaar! Geweldige balans tussen kracht, controle en prijs. Bijna iedereen is er blij mee.';
    }

    document.getElementById('resultaat-kaart').innerHTML = `
        <strong class="snaar-naam">${snaar}</strong>
        ${uitleg}
        <br><br>
        <span class="resultaat-prijs">💰 ${prijs}</span>
        <br>
        <a href="contact.html" class="resultaat-bestel">👉 Direct bestellen →</a>
    `;

    document.getElementById('quiz-resultaat').classList.remove('verborgen');
}

function herstart() {
 
    for (let i = 1; i <= TOTAAL_STAPPEN; i++) {
        quizAntwoorden[i] = null;
    }


    document.getElementById('quiz-resultaat').classList.add('verborgen');
    for (let i = 2; i <= TOTAAL_STAPPEN; i++) {
        document.getElementById('quiz-stap-' + i).classList.add('verborgen');
    }

    document.getElementById('quiz-voortgang').classList.remove('verborgen');
    for (let i = 1; i <= TOTAAL_STAPPEN; i++) {
        const dot = document.getElementById('dot-' + i);
        dot.classList.remove('actief', 'klaar');
    }
    document.getElementById('dot-1').classList.add('actief');

    document.getElementById('quiz-stap-1').classList.remove('verborgen');
}
let huidig = 0;
const track = document.getElementById('draaiTrack');

function verschuif(r) {
    if (!track) return;
    const slides = track.querySelectorAll('img');
    huidig = (huidig + r + slides.length) % slides.length;
    track.style.transform = `translateX(-${huidig * 100}%)`;
}

function kiesLever(keuze, knop) {
    document.querySelectorAll('.lever-knop').forEach(k => k.classList.remove('actief'));
    knop.classList.add('actief');
    const bericht = document.getElementById('bericht');
    if (keuze === 'breng') {
        bericht.placeholder = 'Welk racket en welke snaar wil je? (je brengt het zelf langs)';
    } else {
        bericht.placeholder = 'Welk racket en welke snaar wil je? Wat is je bezorgadres?';
    }
}