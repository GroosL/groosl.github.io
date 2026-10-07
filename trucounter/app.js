// State management
let upperCount = parseInt(localStorage.getItem('trucounter_upper') || '0', 10);
let lowerCount = parseInt(localStorage.getItem('trucounter_lower') || '0', 10);
let isFlipped = localStorage.getItem('trucounter_flipped') === 'true';

if (isNaN(upperCount) || upperCount < 0) upperCount = 0;
if (isNaN(lowerCount) || lowerCount < 0) lowerCount = 0;

// DOM Elements
const upperHalf = document.getElementById('upper-half');
const lowerHalf = document.getElementById('lower-half');
const upperCountEl = document.getElementById('upper-count');
const lowerCountEl = document.getElementById('lower-count');
const upperMinusBtn = document.getElementById('upper-minus');
const lowerMinusBtn = document.getElementById('lower-minus');
const resetBtn = document.getElementById('btn-reset');
const flipBtn = document.getElementById('btn-flip');

function triggerPop(el) {
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
}

function saveState() {
  localStorage.setItem('trucounter_upper', upperCount.toString());
  localStorage.setItem('trucounter_lower', lowerCount.toString());
  localStorage.setItem('trucounter_flipped', isFlipped ? 'true' : 'false');
}

function updateUI() {
  upperCountEl.textContent = upperCount;
  lowerCountEl.textContent = lowerCount;

  if (isFlipped) {
    upperHalf.classList.add('flipped');
    flipBtn.classList.add('active');
  } else {
    upperHalf.classList.remove('flipped');
    flipBtn.classList.remove('active');
  }
}

// Upper actions
function incrementUpper() {
  upperCount++;
  updateUI();
  triggerPop(upperCountEl);
  saveState();
}

function decrementUpper() {
  if (upperCount > 0) {
    upperCount--;
    updateUI();
    triggerPop(upperCountEl);
    saveState();
  }
}

// Lower actions
function incrementLower() {
  lowerCount++;
  updateUI();
  triggerPop(lowerCountEl);
  saveState();
}

function decrementLower() {
  if (lowerCount > 0) {
    lowerCount--;
    updateUI();
    triggerPop(lowerCountEl);
    saveState();
  }
}

// Reset action
function resetCounters() {
  upperCount = 0;
  lowerCount = 0;
  updateUI();
  triggerPop(upperCountEl);
  triggerPop(lowerCountEl);
  saveState();
}

// Flip action
function toggleFlip() {
  isFlipped = !isFlipped;
  updateUI();
  saveState();
}

// Upper half tap -> increment upper counter
upperHalf.addEventListener('click', (e) => {
  if (e.target.closest('#upper-minus')) return;
  incrementUpper();
});

// Lower half tap -> increment lower counter
lowerHalf.addEventListener('click', (e) => {
  if (e.target.closest('#lower-minus')) return;
  incrementLower();
});

// Minus buttons
upperMinusBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  decrementUpper();
});

lowerMinusBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  decrementLower();
});

// Center controls
resetBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  resetCounters();
});

flipBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleFlip();
});

// Initial render
updateUI();
