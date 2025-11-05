
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
  
  