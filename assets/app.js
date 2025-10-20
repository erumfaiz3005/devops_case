// Small client-side logic used by all pages


// Greet button on index.html
const greetBtn = document.getElementById('greetBtn');
if (greetBtn) {
greetBtn.addEventListener('click', () => {
const name = document.getElementById('name').value || 'friend';
document.getElementById('greet').textContent = `Hello, ${name}!`;
});
}


// Contact form handling (demo only: no network call)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
contactForm.addEventListener('submit', (e) => {
e.preventDefault();
const data = new FormData(contactForm);
const name = data.get('name');
const email = data.get('email');
// Simulate send
document.getElementById('formResult').textContent = `Thanks ${name}! We'll reach out at ${email}.`;
contactForm.reset();
});
}