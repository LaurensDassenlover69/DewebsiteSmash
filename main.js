
function initNavbar() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });
}


function initDarkMode() {
  const toggle = document.querySelector('.dark-toggle');
  if (!toggle) return;
  const saved = localStorage.getItem('darkmode');
  if (saved === 'true') {
    document.body.classList.add('dark');
    toggle.textContent = '☀️ Light';
  }
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    toggle.textContent = isDark ? '☀️ Light' : '🌙 Dark';
    localStorage.setItem('darkmode', isDark);
  });
}

// ===== COOKIES POPUP =====
function initCookies() {
  const popup = document.querySelector('.cookies-popup');
  if (!popup) return;
  if (!localStorage.getItem('cookies-accepted')) {
    setTimeout(() => popup.classList.add('show'), 1000);
  }
  const accept = popup.querySelector('.btn-accept');
  const decline = popup.querySelector('.btn-decline');
  if (accept) accept.addEventListener('click', () => {
    localStorage.setItem('cookies-accepted', 'true');
    popup.classList.remove('show');
  });
  if (decline) decline.addEventListener('click', () => {
    localStorage.setItem('cookies-accepted', 'false');
    popup.classList.remove('show');
  });
}

function initFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1111 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}


function initCalculator() {
  const form = document.getElementById('calculator');
  if (!form) return;
  const snaarPrijzen = {
    hsp: 20,
    pros: 15,
    luxilon: 35,
    eigen: 12.50
  };
  function update() {
    const snaar = document.getElementById('calc-snaar');
    const grip = document.getElementById('calc-grip');
    const bezorg = document.getElementById('calc-bezorg');
    if (!snaar) return;
    let totaal = snaarPrijzen[snaar.value] || 0;
    if (grip && grip.checked) totaal += 2.50;
    if (bezorg && bezorg.checked) totaal += 2.50;
    const display = document.getElementById('calc-totaal');
    if (display) display.textContent = '€' + totaal.toFixed(2).replace('.', ',');
  }
  form.querySelectorAll('select, input').forEach(el => el.addEventListener('change', update));
  update();
}




function initVergelijker() {
  const snaarData = {
    hsp: {
      naam: 'Head Sonic Pro',
      prijs: '€20',
      gevoel: '⭐⭐⭐⭐',
      duurzaamheid: '⭐⭐⭐',
      power: '⭐⭐⭐⭐',
      controle: '⭐⭐⭐⭐',
      voor: 'Allround spelers',
      type: 'Polyester'
    },
    pros: {
      naam: "Pro's Pro",
      prijs: '€15',
      gevoel: '⭐⭐⭐',
      duurzaamheid: '⭐⭐⭐',
      power: '⭐⭐',
      controle: '⭐⭐',
      voor: 'Budget bewuste spelers',
      type: 'Polyester'
    },
    luxilon: {
      naam: 'Luxilon Alu Power',
      prijs: '€35',
      gevoel: '⭐⭐⭐⭐',
      duurzaamheid: '⭐⭐⭐⭐⭐',
      power: '⭐⭐⭐⭐⭐',
      controle: '⭐⭐⭐⭐',
      voor: 'Gevorderde/Pro spelers',
      type: 'Monofilament'
    },
    eigen: {
      naam: 'Eigen snaar',
      prijs: '€12,50',
      gevoel: '—',
      duurzaamheid: '—',
      power: '—',
      controle: '—',
      voor: 'Spelers met voorkeur',
      type: 'Jouw keuze'
    }
  };

  function updateVergelijker() {
    const s1 = document.getElementById('verg1')?.value;
    const s2 = document.getElementById('verg2')?.value;
    if (!s1 || !s2) return;
    const d1 = snaarData[s1];
    const d2 = snaarData[s2];
    const col1 = document.getElementById('verg-col1');
    const col2 = document.getElementById('verg-col2');
    if (!col1 || !col2) return;

    function html(d) {
      return `
        <h3>${d.naam}</h3>
        <div class="verg-row"><span>Prijs</span><strong>${d.prijs}</strong></div>
        <div class="verg-row"><span>Type</span><strong>${d.type}</strong></div>
        <div class="verg-row"><span>Gevoel</span><strong>${d.gevoel}</strong></div>
        <div class="verg-row"><span>Power</span><strong>${d.power}</strong></div>
        <div class="verg-row"><span>Controle</span><strong>${d.controle}</strong></div>
        <div class="verg-row"><span>Duurzaamheid</span><strong>${d.duurzaamheid}</strong></div>
        <div class="verg-row"><span>Voor</span><strong>${d.voor}</strong></div>
      `;
    }
    col1.innerHTML = html(d1);
    col2.innerHTML = html(d2);
  }

  document.getElementById('verg1')?.addEventListener('change', updateVergelijker);
  document.getElementById('verg2')?.addEventListener('change', updateVergelijker);
  updateVergelijker();
}

