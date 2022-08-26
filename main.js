import './style.css';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
// Resolve User story #1 in Epic: CRUD (w/ some bugs)

// Add/save/read notes variables
const saveBtn = document.querySelector('.save-btn');
const mainContainerEl = document.querySelector('.main-container');

let notes = localStorage.getItem('notes');
notes = JSON.parse(notes);

if (!notes) {
	notes = [];
}

function render() {
	// eslint-disable-next-line no-console
	console.log(notes);
	mainContainerEl.innerHTML = `
		<a class="add-note main-item" id="add-note" href="./add.html">
			<img src="img/add.png" alt="Add a note" />
		</a>
	`;

	/*
		Plan: Not to create another site (in forms), this is the only remnant of it
	 */
	// eslint-disable-next-line no-console
	// console.log(document.getElementById('add-note'));
	// document.getElementById('add-note').addEventListener('mouseover', () => {
	// hover
	// eslint-disable-next-line no-console
	// console.log('hover');
	// });
	notes.forEach((note) => {
		const { title, category, description } = note;
		// eslint-disable-next-line no-console
		mainContainerEl.innerHTML += `
			<div class="main-item">
				<div class="note-title">
					<h1 class="">${title}</h1>
				</div>
				<p class="note-category">${category}</p>
				${DOMPurify.sanitize(marked.parse(description))}
			</div>
		`;
	});
}

if (window.location.pathname === '/') {
	mainContainerEl.innerHTML += `
	<img src="https://api.iconify.design/eos-icons:bubble-loading.svg" width="50"/>
	`;
	render();
}
// process the data and save it in local storage
saveBtn?.addEventListener('click', () => {
	const titleEl = document.getElementById('title');
	const categoryEl = document.getElementById('category');
	const descriptionEl = document.getElementById('description');

	const data = {
		title: titleEl.value,
		category: categoryEl.value,
		description: descriptionEl.value,
	};
	notes.push(data);
	localStorage.setItem('notes', JSON.stringify(notes));
	window.location.href = '/';
});

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

// faq question toggle
const questions = document.querySelectorAll('.question');
const questionsArray = [...questions];

questionsArray.forEach((question) =>
	question.addEventListener('click', function accordion() {
		const answerEl = this.nextElementSibling;
		if (answerEl.className === 'hideAnswer') {
			answerEl.className = 'showAnswer';
		} else {
			answerEl.className = 'hideAnswer';
		}
	})
);
