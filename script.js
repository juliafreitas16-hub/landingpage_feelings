// ANIMAÇÃO DE ESCRITA
let width = 0;
const text = "LIVE THE SOUND";
const totalChars = text.length;
const overlay = document.getElementById('drawingOverlay');
const intervalDraw = setInterval(() => {
  width += 100 / totalChars;
  if (width >= 100) {
    width = 100;
    clearInterval(intervalDraw);
  }
  if (overlay) overlay.style.width = width + '%';
}, 120);

// FUNDO ONDAS
function createVoiceWave() {
  const container = document.getElementById('voiceWaveBg');
  if (!container) return;
  for (let i = 0; i < 50; i++) {
    const bar = document.createElement('div');
    bar.className = 'wave-bar-voice';
    bar.style.left = (i * 2) + '%';
    bar.style.width = '1.5%';
    bar.style.animationDelay = (i * 0.08) + 's';
    bar.style.animationDuration = (1.2 + Math.random()) + 's';
    container.appendChild(bar);
  }
}
createVoiceWave();

// LOADING PROGRESS
let loadPercent = 0;
const loadFill = document.getElementById('loadFill');
const loadingScreen = document.getElementById('loading-screen');
const loaderInt = setInterval(() => {
  loadPercent += Math.random() * 9 + 3;
  if (loadPercent >= 100) {
    clearInterval(loaderInt);
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
      }
    }, 500);
  }
  if (loadFill) loadFill.style.width = loadPercent + '%';
}, 70);

// ARTISTAS - COM SUAS IMAGENS
const artistsData = [
  {
    name: "ALOK",
    genre: "Gênero: Música Eletrônica<br>",
    img: "images/alok.jpg",
    youtubeUrl: "https://youtu.be/vB594tMowP0?t=42",
    song: "<b>Um dos maiores DJs do mundo."
  },
  {
    name: "COLDPLAY",
    genre: "Gênero musical: Rock Alternativo e Pop.<br>",
    img: "images/coldplay.jpg",
    youtubeUrl: "https://youtu.be/dvgZkm1xWPE?t=187",
    song: "<b>Uma das bandas mais influentes do mundo."
  },
  {
    name: "FLO RIDA",
    genre: "Gênero musical: Hip Hop, Rap e Pop.<br>",
    img: "images/florida.jpg",
    youtubeUrl: "https://youtu.be/3OnnDqH6Wj8?t=9",
    song: "<b>Um dos maiores nomes do rap pop."
  },
  {
    name: "BLACK EYED PEAS",
    genre: "Gênero musical: Pop, Hip Hop, Dance e Eletrônica.<br>",
    img: "images/blackeyedpeas.jpg",
    youtubeUrl: "https://youtu.be/CwdrtwZiQ9E?t=5",
    song: "<b>Uma das bandas mais icônicas do pop."
  }
];

const containerArtists = document.getElementById('artistsMegaList');
if (containerArtists) {
  artistsData.forEach((art) => {
    const card = document.createElement('div');
    card.className = 'artist-mega-card fade-up';
    card.innerHTML = `
      <img class="artist-img" src="${art.img}" alt="${art.name}">
      <div class="artist-info">
        <div class="artist-name">${art.name}</div>
        <div class="artist-genre">${art.genre} • ${art.song}</div>
        <a href="${art.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="youtube-btn">
          <i class="fab fa-youtube"></i> Ouça o que te espera
        </a>
      </div>
    `;
    containerArtists.appendChild(card);
  });
}

// PONTOS DE LUZ
const areaInfo = {
  esquerda: { nome: "ARQUIBANCADA ESQUERDA", desc: "Aproveite os shows com uma perspectiva privilegiada.<br> <b>• VALOR: R$ 120</b>" },
  direita: { nome: "ARQUIBANCADA DIREITA", desc: "Tenha uma visão ampla do palco.<br> <b>• VALOR: R$ 120</b>" },
  camarote: { nome: "CAMAROTE", desc: "Melhor experiência do festival.<br> <b>• VALOR: R$ 650</b>" },
  vip: { nome: "PISTA PREMIUM", desc: "Fique próximo à passarela exclusiva.<br> <b>• VALOR: R$ 320</b>" },
  pista: { nome: "PISTA", desc: "Curtir toda a energia do festival.<br> <b>• VALOR: R$ 180</b>" },
  premium: { nome: "FRONT STAGE", desc: "Fique a poucos metros dos artistas.<br> <b>• VALOR: R$ 450</b>" }
};

const tooltipDiv = document.getElementById('tooltipStage');
const glowDots = document.querySelectorAll('.glow-dot');

if (tooltipDiv && glowDots.length) {
  glowDots.forEach(dot => {
    dot.addEventListener('mouseenter', (e) => {
      const area = dot.getAttribute('data-area');
      if (areaInfo[area]) {
        tooltipDiv.innerHTML = `<h4><i class="fas fa-map-pin"></i> ${areaInfo[area].nome}</h4><p><i class="fas fa-ticket-alt"></i> ${areaInfo[area].desc}</p>`;
        tooltipDiv.classList.add('visible');
        tooltipDiv.style.left = (e.clientX + 20) + 'px';
        tooltipDiv.style.top = (e.clientY - 80) + 'px';
      }
    });
    dot.addEventListener('mouseleave', () => {
      tooltipDiv.classList.remove('visible');
    });
    dot.addEventListener('mousemove', (e) => {
      if (tooltipDiv.classList.contains('visible')) {
        tooltipDiv.style.left = (e.clientX + 20) + 'px';
        tooltipDiv.style.top = (e.clientY - 80) + 'px';
      }
    });
  });
}

// PROGRAMAÇÃO
const progItems = document.querySelectorAll('.tl-dyn-item');
if (progItems.length) {
  const progObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible-prog');
        entry.target.classList.remove('hidden-prog');
      } else {
        entry.target.classList.remove('visible-prog');
        entry.target.classList.add('hidden-prog');
      }
    });
  }, { threshold: 0.2 });
  progItems.forEach(item => progObserver.observe(item));
}

// COUNTDOWN
function updateCD() {
  const target = new Date(2026, 10, 19, 16, 0, 0).getTime();
  const diff = target - Date.now();
  if (diff < 0) {
    document.getElementById('dias').innerText = '00';
    document.getElementById('horas').innerText = '00';
    document.getElementById('minutos').innerText = '00';
    document.getElementById('segundos').innerText = '00';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('dias').innerText = d < 10 ? '0' + d : d;
  document.getElementById('horas').innerText = h < 10 ? '0' + h : h;
  document.getElementById('minutos').innerText = m < 10 ? '0' + m : m;
  document.getElementById('segundos').innerText = s < 10 ? '0' + s : s;
}
setInterval(updateCD, 1000);
updateCD();

// SCROLL PARA COMPRA
const scrollBtn = document.getElementById('scrollToBuyBtn');
if (scrollBtn) {
  scrollBtn.onclick = () => document.getElementById('finalTickets').scrollIntoView({ behavior: 'smooth' });
}

// WHATSAPP - COLOQUE SEU NÚMERO AQUI
const whatsappLink = document.getElementById('whatsappLink');
if (whatsappLink) {
  const telefone = "5511999999999"; // ← TROQUE PELO SEU NÚMERO
  const mensagem = "Olá! Quero saber mais sobre o festival LIVE THE SOUND!";
  whatsappLink.href = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
}

// CURSOR PERSONALIZADO
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
if (!isTouchDevice) {
  document.addEventListener('mousemove', (e) => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    if (cursorDot) cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    if (cursorRing) cursorRing.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
} else {
  const style = document.createElement('style');
  style.textContent = '.cursor-dot, .cursor-ring { display: none; } body { cursor: auto; } * { cursor: auto; }';
  document.head.appendChild(style);
}

// PATROCINADORES - TEXTO
const sponsorTrack = document.getElementById('sponsorTrack');
if (sponsorTrack) {
  const patrocinadores = [
    'BRADESCA',
    'TIKTOKESS',
    'BURGUER PRINCE',
    'MARISO ROUPAS',
    'ENERGY DRINK',
    'SOUND CLUB'
  ];
  
  for (let i = 0; i < 6; i++) {
    patrocinadores.forEach(nome => {
      const span = document.createElement('span');
      span.textContent = nome;
      span.style.cssText = `
        font-size: 1.5rem;
        font-weight: 700;
        font-family: 'Poppins', sans-serif;
        background: linear-gradient(135deg, #fff, #c084fc);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        letter-spacing: 2px;
        padding: 0 20px;
        transition: all 0.3s ease;
        cursor: pointer;
      `;
      span.onmouseenter = () => {
        span.style.transform = 'scale(1.1)';
        span.style.textShadow = '0 0 10px #c084fc';
      };
      span.onmouseleave = () => {
        span.style.transform = 'scale(1)';
        span.style.textShadow = 'none';
      };
      sponsorTrack.appendChild(span);
    });
  }
}

// FADE-UP OBSERVER
const faders = document.querySelectorAll('.fade-up');
if (faders.length) {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.2 });
  faders.forEach(el => fadeObserver.observe(el));
}

// CORREÇÃO DOS CARDS
const structCards = document.querySelectorAll('.struct-card-down');
structCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.height = 'auto';
  });
  card.addEventListener('mouseleave', () => {
    card.style.height = '130px';
  });
});