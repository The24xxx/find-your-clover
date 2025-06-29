const container = document.getElementById('game-container');
const message = document.getElementById('message');

const leafCount = 210; // počet falešných jetelů
const leafVariants = 6; // počet variant obrázků leaf1.png až leaf6.png
const spriteSize = 64; // velikost obrázků v px (šířka i výška)
const minGap = 10; // minimální mezera mezi objekty

const positions = []; // uložené pozice všech objektů

// 🎯 Vytvoření čtyřlístku
const clover = document.createElement('img');
clover.src = 'assets/clover.png';
clover.classList.add('clover');

placeWithoutOverlap(clover);

clover.addEventListener('click', () => {
  message.textContent = 'Nejmilejší, nechť ti tento čtyřlístek přinese lehkost do tvé utrápené mysli.';
});

container.appendChild(clover);

// 🍀 Vytvoření falešných jetelů
for (let i = 0; i < leafCount; i++) {
  const leaf = document.createElement('img');
  const variant = (i % leafVariants) + 1;
  leaf.src = `assets/leaf${variant}.png`;
  leaf.classList.add('leaf');

  leaf.addEventListener('click', () => {
    message.textContent = '❌ To není čtyřlístek. Zkus znovu!';
  });

  placeWithoutOverlap(leaf);
  container.appendChild(leaf);
}

// 🧠 Funkce pro umístění bez překryvu
function placeWithoutOverlap(element) {
  const maxX = container.clientWidth - spriteSize;
  const maxY = container.clientHeight - spriteSize;
  let x, y;
  let attempts = 0;

  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
    attempts++;
    if (attempts > 10000) {
      console.warn("Nelze najít volné místo.");
      break;
    }
  } while (!isPositionFree(x, y));

  positions.push({ x, y });
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
}

// 🧠 Kontrola, zda je pozice volná (obdélníková kolize)
function isPositionFree(x, y) {
  for (const pos of positions) {
    const overlapX = Math.abs(pos.x - x) < (spriteSize + minGap);
    const overlapY = Math.abs(pos.y - y) < (spriteSize + minGap);
    if (overlapX && overlapY) {
      return false;
    }
  }
  return true;
}
