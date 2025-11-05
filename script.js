
const images = [
    { src: 'assets/real1.jpg', isReal: true, caption: 'Real 1' },
    { src: 'assets/fake1.jpg', isReal: false, caption: 'Fake 1' },
    { src: 'assets/real2.jpg', isReal: true, caption: 'Real 2' },
    { src: 'assets/fake2.jpg', isReal: false, caption: 'Fake 2' },
    { src: 'assets/fake3.jpg', isReal: false, caption: 'Fake 3' },
    { src: 'assets/real3.jpg', isReal: true, caption: 'Real 3' },
    { src: 'assets/fake4.jpg', isReal: false, caption: 'Fake 4' },
    { src: 'assets/fake5.jpg', isReal: false, caption: 'Fake 5' },
    { src: 'assets/real4.jpg', isReal: true, caption: 'Real 4' },
    { src: 'assets/fake6.jpg', isReal: false, caption: 'Fake 6' }
  ];
  
  function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  
  let deck = shuffleArray([...images]); 
  let currentIndex = 0;
  let answers = []; 
  
  const mainImage = document.getElementById('mainImage');
  const currentIndexSpan = document.getElementById('currentIndex');
  const totalSpan = document.getElementById('total');
  const btnReal = document.getElementById('btnReal');
  const btnFake = document.getElementById('btnFake');
  const btnNext = document.getElementById('btnNext');
  const btnReveal = document.getElementById('btnReveal');
  const feedback = document.getElementById('feedback');
  const resultSection = document.getElementById('result');
  const gameSection = document.getElementById('game');
  const scoreText = document.getElementById('scoreText');
  const breakdown = document.getElementById('breakdown');
  const btnPlayAgain = document.getElementById('btnPlayAgain');
  
  totalSpan.textContent = deck.length;
  
  function showImage(index) {
    const item = deck[index];
    currentIndexSpan.textContent = index + 1;
    mainImage.src = item.src;
    mainImage.alt = item.caption || 'Desafio de imagem';
    feedback.classList.add('hidden');
    btnNext.classList.add('hidden');
    btnReveal.classList.remove('hidden');
    enableChoices(true);
  }
  
  function enableChoices(enabled) {
    btnReal.disabled = !enabled;
    btnFake.disabled = !enabled;
    if (enabled) { btnReal.classList.remove('disabled'); btnFake.classList.remove('disabled'); }
  }
  
  function handleGuess(guessIsReal) {
    const item = deck[currentIndex];
    const correct = (guessIsReal === item.isReal);
    answers.push({ image: item, guessIsReal, correct });
  
    feedback.classList.remove('hidden');
    feedback.textContent = correct ? 'Acertou!' : 'Errou!';
    feedback.style.background = correct ? 'rgba(40,167,69,0.12)' : 'rgba(220,53,69,0.12)';
    feedback.style.color = correct ? '#155724' : '#721c24';
  
    enableChoices(false);
    btnNext.classList.remove('hidden');
    btnReveal.classList.remove('hidden');
  }
  
  btnReal.addEventListener('click', () => handleGuess(true));
  btnFake.addEventListener('click', () => handleGuess(false));
  
  btnNext.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= deck.length) {
      showResults();
    } else {
      showImage(currentIndex);
    }
  });
  
  btnReveal.addEventListener('click', () => {
    const item = deck[currentIndex];
    feedback.classList.remove('hidden');
    feedback.textContent = item.isReal ? 'Verdade: Real' : 'Verdade: Gerada por IA';
    feedback.style.background = item.isReal ? 'rgba(40,167,69,0.12)' : 'rgba(220,53,69,0.12)';
  });
  
  function showResults() {
    gameSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
  
    const total = answers.length;
    const correctCount = answers.filter(a => a.correct).length;
    scoreText.textContent = `Você acertou ${correctCount} de ${deck.length} imagens.`;
  
    breakdown.innerHTML = '';
    deck.forEach((itm, idx) => {
      const ans = answers[idx] || null;
      const div = document.createElement('div');
      div.className = 'item';
  
      const img = document.createElement('img');
      img.src = itm.src;
      img.alt = itm.caption || `img-${idx+1}`;
  
      const info = document.createElement('div');
      info.style.flex = '1';
  
      const title = document.createElement('div');
      title.textContent = itm.caption || `Imagem ${idx+1}`;
  
      const guessText = document.createElement('div');
      if (ans) {
        guessText.textContent = `Seu palpite: ${ans.guessIsReal ? 'Real' : 'IA'} — ${ans.correct ? 'ACERTO' : 'ERRO'}`;
        guessText.style.color = ans.correct ? 'var(--good)' : 'var(--bad)';
      } else {
        guessText.textContent = 'Sem palpite';
        guessText.style.color = 'var(--muted)';
      }
  
      const truth = document.createElement('div');
      truth.textContent = `Verdade: ${itm.isReal ? 'Real' : 'IA'}`;
  
      info.appendChild(title);
      info.appendChild(guessText);
      info.appendChild(truth);
  
      div.appendChild(img);
      div.appendChild(info);
      breakdown.appendChild(div);
    });
  }
  
  btnPlayAgain.addEventListener('click', () => {
    deck = shuffleArray([...images]);
    currentIndex = 0;
    answers = [];
    resultSection.classList.add('hidden');
    gameSection.classList.remove('hidden');
    showImage(0);
  });
  
  showImage(0);
  