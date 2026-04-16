
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
    const snaar = parseFloat(document.getElementById('snaar-keuze')?.value || 0);
    const grip = document.getElementById('grip')?.checked ? 2.5 : 0;
    const bezorg = document.getElementById('bezorg')?.checked ? 2.5 : 0;
    const bezorg = document.getElementById('Demp')?.checked ? 2.5 : 0;
    const totaal = snaar + grip + bezorg;

    const el = document.getElementById('totaal-prijs');
    if (el) {
        el.textContent = '€' + totaal.toFixed(2).replace('.', ',') + ',-';
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
