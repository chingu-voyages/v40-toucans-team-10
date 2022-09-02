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
	console.log(notes);
	mainContainerEl.innerHTML = `
		<a class="add-note main-item" id="add-note" href="./add.html">
			<svg alt="Add a note" width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M38.25 27H15.75" stroke="black" stroke-linecap="round"/>
        <path d="M27 38.25V15.75" stroke="black" stroke-linecap="round"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M27 49.5C39.4264 49.5 49.5 39.4264 49.5 27C49.5 14.5736 39.4264 4.5 27 4.5C14.5736 4.5 4.5 14.5736 4.5 27C4.5 39.4264 14.5736 49.5 27 49.5Z" stroke="black"/>
      </svg>
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
		const { id, title, category, description } = note;
		mainContainerEl.innerHTML += `
			<div class="main-item noteContent">
      <button class="deleteBtn" id="${id}" type="button">delete</button>
      <button class="updateBtn" id="${id}" type="button">update</button>
				<div class="note-title">
					<h1 class="">${title}</h1>
				</div>
				<p class="note-category">${category}</p>
				${DOMPurify.sanitize(marked.parse(description))}
			</div>
		`;
	});
	renderDeleteBtn();
	renderUpdateBtn();
}

if (window.location.pathname === '/') {
	mainContainerEl.innerHTML += `
	<img src="https://api.iconify.design/eos-icons:bubble-loading.svg" width="50"/>
	`;
	render();
}
const titleEl = document.getElementById('title');
const categoryEl = document.getElementById('category');
const descriptionEl = document.getElementById('description');
// process the data and save it in local storage
saveBtn?.addEventListener('click', () => {
	// const titleEl = document.getElementById('title');
	// const categoryEl = document.getElementById('category');
	// const descriptionEl = document.getElementById('description');

	const data = {
		// eslint-disable-next-line no-use-before-define
		id: randomIDGenerate(),
		title: titleEl.value,
		category: categoryEl.value,
		description: descriptionEl.value,
	};

	notes.push(data);
	localStorage.setItem('notes', JSON.stringify(notes));
	window.location.href = '/';
});

// delete note
function renderDeleteBtn() {
	const deleteBtn = document.querySelectorAll('.deleteBtn');
	console.log(deleteBtn);
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < deleteBtn.length; i++) {
		// eslint-disable-next-line no-use-before-define
		deleteBtn[i].addEventListener('click', (e) => deleteNote(e));
	}
}

function deleteNote(e) {
	const themeId = e.target.id;
	console.log(themeId);
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < notes.length; i++) {
		if (themeId === notes[i].id) {
			// console.log(notes[i]);
			notes.splice(i, 1);
			// console.log(notes);
			localStorage.setItem('notes', JSON.stringify(notes));
			break;
		}
	}
	// console.log(notes);
	render();
}

// update note
function renderUpdateBtn() {
	const updateBtn = document.querySelectorAll('.updateBtn');
	console.log(updateBtn);
	for (let i = 0; i < updateBtn.length; i++) {
		updateBtn[i].addEventListener('click', (e) => updateNoteBtn(e));
	}
}

function updateNoteBtn(e) {
	let themeId = e.target.id;
	console.log(themeId);

	for (let i = 0; i < notes.length; i++) {
		if (themeId === notes[i].id) {
			console.log(notes[i]);

			localStorage.setItem('updateNoteData', JSON.stringify(notes[i]));
			window.location.href = './update.html';
			break;
		}
	}
}

updateRenderNote();

function updateRenderNote() {
	const updateSaveBtn = document.querySelector('.update-save-btn');
	console.log(updateSaveBtn);
	let updateData = JSON.parse(localStorage.getItem('updateNoteData'));
	// input value
	if (updateData) {
		titleEl.value = updateData.title;
		categoryEl.value = updateData.category;
		descriptionEl.value = updateData.description;

		// update sava btn
		updateSaveBtn.addEventListener('click', () => updateSave(updateData));
	}
}

// window.location.href = '/';

// update save
function updateSave(updateData) {
	console.log(updateData);
	const data = {
		id: updateData.id,
		title: titleEl.value,
		category: categoryEl.value,
		description: descriptionEl.value,
	};
	localStorage.setItem('updateNoteData', JSON.stringify(data));
	// console.log(JSON.parse(localStorage.getItem('updateNoteData')));

	let noteUpdateData = JSON.parse(localStorage.getItem('updateNoteData'));
	let noteOriginData = JSON.parse(localStorage.getItem('notes'));
	// console.log('update', noteUpdateData);
	// console.log('notes', noteOriginData);

	for (let i = 0; i < noteOriginData.length; i++) {
		if (noteUpdateData.id === noteOriginData[i].id) {
			noteOriginData[i] = noteUpdateData;
			// console.log('change', noteOriginData);
			// console.log('??', JSON.parse(localStorage.getItem('notes')));
			localStorage.setItem('notes', JSON.stringify(noteOriginData));
			localStorage.removeItem('updateNoteData');

			console.log('??', JSON.parse(localStorage.getItem('notes')));

			break;
		}
	}
}
// render();

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

// theme select

// Try to store the theme in local storage,
// then access it

const themeData = [
	{
		bgColor: '#FFFFFE',
		fontColor: '#272343',
		btnColor: '#FFD803',
	},
	{
		bgColor: '#FFC0AD',
		fontColor: '#271C19',
		btnColor: '#E78FB3',
	},
	{
		bgColor: '#B8C1EC',
		fontColor: '#121629',
		btnColor: '#EEBBC3',
	},
	{
		bgColor: '#FEC7D7',
		fontColor: '#000000',
		btnColor: '#A786DF',
	},
];
const themeSelectBtn = document.querySelectorAll('.btn');
// if the theme is none:
//   set the theme to the default
// else:
//   set the theme (e.g. bg, texts, etc.)

// eslint-disable-next-line no-plusplus
for (let i = 0; i < themeSelectBtn.length; i++) {
	// eslint-disable-next-line no-use-before-define
	themeSelectBtn[i].addEventListener('click', (e) => changeTheme(e));
}

function setTheme(themeInfo) {
	document.body.style.backgroundColor = themeInfo.bgColor;
	document.querySelector('.nav-container').style.backgroundColor =
		themeInfo.bgColor;
	document.body.style.color = themeInfo.fontColor;
	// button color
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < themeSelectBtn.length; i++) {
		// eslint-disable-next-line no-use-before-define
		document.querySelectorAll('.btn')[i].style.backgroundColor =
			themeInfo.btnColor;
	}
}

function changeTheme(e) {
	// console.log(e.target.id);
	const themeId = e.target.id;

	// class change
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < themeSelectBtn.length; i++) {
		// eslint-disable-next-line no-use-before-define
		themeSelectBtn[i].classList.remove('themecheck');
		themeSelectBtn[i].innerText = 'Set theme as default';
	}
	themeSelectBtn[themeId - 1].classList.add('themecheck');
	themeSelectBtn[themeId - 1].innerText = 'Current theme';

	// theme change
	switch (themeId) {
		case '1':
			setTheme(themeData[0]);
			break;
		case '2':
			setTheme(themeData[1]);
			break;
		case '3':
			setTheme(themeData[2]);
			break;
		case '4':
			setTheme(themeData[3]);
			break;
		default:
			setTheme(themeData[0]);
	}
}

/**
 *	@function randomIDGenerate
 *  @return {string} it returns generated random ID
 */
function randomIDGenerate() {
	// eslint-disable-next-line prefer-template
	return '_' + Math.random().toString(36).substr(2, 9);
}
