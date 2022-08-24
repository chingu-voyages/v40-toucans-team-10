import './style.css';
// TODO: Resolve User story #1 in Epic: CRUD
// eslint-disable-next-line no-console
console.log('e');

// menu toggle
const menuOnBtn = document.querySelector('.bar');
const menuOffBtn = document.querySelector('.nav-off');
const nav = document.querySelector('.nav-container');

menuOnBtn.addEventListener('click', () => {
	nav.classList.add('active');
});
menuOffBtn.addEventListener('click', () => {
	nav.classList.remove('active');
});
