const intro = document.querySelector('#intro');
const reveal = document.querySelector('#reveal');
const openCard = document.querySelector('#openCard');
const again = document.querySelector('#again');
const canvas = document.querySelector('#confetti');
const ctx = canvas.getContext('2d');
const colors = ['#f0643b', '#f5c84c', '#1e7b63', '#e98b9c', '#fffaf3'];
let pieces = [];
let animationFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

function celebrate(amount = 150) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight * .38;
  for (let i = 0; i < amount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 5 + Math.random() * 12;
    pieces.push({
      x: centerX + (Math.random() - .5) * 100,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: 5 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - .5) * .22,
      life: 130 + Math.random() * 60
    });
  }
  if (!animationFrame) animate();
}

function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  pieces = pieces.filter(p => p.life > 0 && p.y < window.innerHeight + 30);
  pieces.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += .18; p.vx *= .992;
    p.rotation += p.spin; p.life--;
    ctx.save();
    ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
    ctx.globalAlpha = Math.min(1, p.life / 25);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  });
  if (pieces.length) animationFrame = requestAnimationFrame(animate);
  else { animationFrame = null; ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); }
}

function revealPhotos() {
  const photos = document.querySelectorAll(".memory-photo");

  photos.forEach((photo, index) => {
    setTimeout(() => {
      photo.classList.add("show");
    }, 600 + index * 650);
  });
}

openCard.addEventListener('click', () => {
  intro.classList.add('is-gone');
  setTimeout(() => {
    intro.style.display = 'none';
    reveal.classList.add('is-visible');
    window.scrollTo({ top: 0, behavior: 'instant' });
    celebrate(190);
    revealPhotos();
    document.querySelector('#birthday-title').focus?.();
  }, 520);
});

again.addEventListener('click', () => celebrate(130));
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

