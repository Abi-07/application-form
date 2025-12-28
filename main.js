const error = document.getElementById('validate');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const arrowContainer = document.getElementById('arrows');
const totalSteps = 5;

const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\d{10,15}$/,
  age: (val) => val >= 18 && val <= 120,
};

window.addEventListener('DOMContentLoaded', () => {
  progressBar.style.width = '0%';
  progressText.innerText = '0%';
});

function showError(msg, el) {
  error.innerHTML = msg;
  el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 500);
}

function updateProgress(fromStepId) {
  const steps = ['name', 'email', 'phone', 'age', 'address'];
  const completedIndex = steps.indexOf(fromStepId);
  const percentage = Math.round(((completedIndex + 1) / totalSteps) * 100);

  progressBar.style.width = percentage + '%';
  progressText.innerText = percentage + '%';
  if (percentage === 100) progressBar.classList.add('complete');
}

function transitionFields(fromId, toId, direction) {
  const fromEl = document.getElementById(fromId);
  const toEl = document.getElementById(toId);

  const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
  const inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

  fromEl.classList.add(outClass);
  fromEl.classList.remove('is-visible');

  setTimeout(() => {
    fromEl.style.display = 'none';
    fromEl.classList.remove(outClass);
    toEl.style.display = 'block';
    toEl.classList.add(inClass);

    setTimeout(() => {
      toEl.classList.remove(inClass);
      toEl.classList.add('is-visible');
    }, 400);
  }, 200);
}

function handleNext() {
  const visibleLabel = document.querySelector('label.is-visible');
  if (!visibleLabel || visibleLabel.id === 'address') return;

  const from = visibleLabel.id;
  const input = visibleLabel.querySelector('input');
  const value = input.value.trim();
  const stepFlow = {
    name: 'email',
    email: 'phone',
    phone: 'age',
    age: 'address',
  };
  const to = stepFlow[from];

  if (!value) return showError('This field is required', visibleLabel);
  if (from === 'email' && !patterns.email.test(value))
    return showError('Invalid email', visibleLabel);
  if (from === 'phone' && !patterns.phone.test(value))
    return showError('Invalid phone', visibleLabel);
  if (from === 'age' && (value < 18 || value > 120))
    return showError('Age 18-120', visibleLabel);

  error.innerHTML = '';
  transitionFields(from, to, 'next');
  updateProgress(from);
}

function handlePrev() {
  const visibleLabel = document.querySelector('label.is-visible');
  if (!visibleLabel || visibleLabel.id === 'name') return;

  const from = visibleLabel.id;
  const stepFlow = {
    email: 'name',
    phone: 'email',
    age: 'phone',
    address: 'age',
  };
  const to = stepFlow[from];

  error.innerHTML = '';
  transitionFields(from, to, 'prev');
  const steps = ['name', 'email', 'phone', 'age', 'address'];
  const newIndex = steps.indexOf(to);
  const percentage = Math.round((newIndex / totalSteps) * 100);
  progressBar.style.width = percentage + '%';
  progressText.innerText = percentage + '%';
}

document.addEventListener('click', (e) => {
  if (e.target.closest('.btn-next') || e.target.closest('.btn-next-arrow'))
    handleNext();
  if (e.target.closest('.btn-prev')) handlePrev();
  if (e.target.id === 'resetBtn') location.reload();
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const visibleLabel = document.querySelector('label.is-visible');
    if (visibleLabel && visibleLabel.id !== 'address') handleNext();
  }
});

document.getElementById('appForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const addressInput = document.querySelector('input[name="address"]');
  if (!addressInput.value.trim())
    return showError('Address required', document.getElementById('address'));

  document.getElementById('summary-name').innerText =
    document.querySelector('input[name="name"]').value;
  document.getElementById('summary-email').innerText = document.querySelector(
    'input[name="email"]'
  ).value;

  transitionFields('address', 'success-screen', 'next');
  updateProgress('address');
  arrowContainer.style.display = 'none';
});
