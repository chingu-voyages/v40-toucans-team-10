import './style.css';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

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
	notes.forEach((note) => {
		const { id, title, category, description } = note;
		mainContainerEl.innerHTML += `
			<div class="main-item noteContent">
      <button class="deleteBtn" id="${id}" type="button">Delete</button>
      <button class="updateBtn" id="${id}" type="button">Update</button>
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
	const data = {
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
			notes.splice(i, 1);
			localStorage.setItem('notes', JSON.stringify(notes));
			break;
		}
	}
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
	const themeId = e.target.id;
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

// if localStorage has updateNoteData
if (localStorage.getItem('updateNoteData')) {
	updateRenderNote();
}
// updateRenderNote();

function updateRenderNote() {
	const updateSaveBtn = document.querySelector('.update-save-btn');
	console.log(updateSaveBtn);
	const updateData = JSON.parse(localStorage.getItem('updateNoteData'));
	// input value
	if (updateData) {
		titleEl.value = updateData.title;
		categoryEl.value = updateData.category;
		descriptionEl.value = updateData.description;

		// update sava btn
		updateSaveBtn.addEventListener('click', () => updateSave(updateData));
	}
	// localStorage.removeItem('updateNoteData');
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

	const noteUpdateData = JSON.parse(localStorage.getItem('updateNoteData'));
	const noteOriginData = JSON.parse(localStorage.getItem('notes'));
	// console.log('update', noteUpdateData);
	// console.log('notes', noteOriginData);

	for (let i = 0; i < noteOriginData.length; i++) {
		if (noteUpdateData.id === noteOriginData[i].id) {
			noteOriginData[i] = noteUpdateData;
			// console.log('change', noteOriginData);
			// console.log(JSON.parse(localStorage.getItem('notes')));
			localStorage.setItem('notes', JSON.stringify(noteOriginData));
			localStorage.removeItem('updateNoteData');
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

const themeNum = parseInt(localStorage.getItem('theme'), 10);
// if the theme is none:
//   set the theme to the default
// else:
//   set the theme (e.g. bg, texts, etc.)
changeTheme(Number.isNaN(themeNum) ? 0 : `${themeNum}`);
if (window.location.pathname === '/theme.html') {
	for (let i = 0; i < themeSelectBtn.length; i++) {
		themeSelectBtn[i].addEventListener('click', (e) =>
			changeTheme(e.target.id)
		);
	}
}

function setTheme(themeInfo) {
	document.body.style.backgroundColor = themeInfo.bgColor;
	document.querySelector('.nav-container').style.backgroundColor =
		themeInfo.bgColor;
	document.body.style.color = themeInfo.fontColor;
	// button color
	if (themeSelectBtn.length) {
		for (let i = 0; i < themeSelectBtn.length; i++) {
			themeSelectBtn[i].style.backgroundColor = themeInfo.btnColor;
		}
	}
	const notesBtns = document.querySelectorAll('.updateBtn, .deleteBtn');
	notesBtns.forEach((notesBtn) => {
		// eslint-disable-next-line no-param-reassign
		notesBtn.style.backgroundColor = themeInfo.btnColor;
	});
}

function changeTheme(themeId) {
	// class change
	if (
		themeSelectBtn.length &&
		window.location.pathname === '/theme.html' &&
		themeId > 0
	) {
		for (let i = 0; i < themeSelectBtn.length; i++) {
			themeSelectBtn[i].classList.remove('themecheck');
			themeSelectBtn[i].innerText = 'Set theme as default';
		}
		themeSelectBtn[themeId - 1].classList.add('themecheck');
		themeSelectBtn[themeId - 1].innerText = 'Current theme';
	}

	// theme change
	localStorage.setItem('theme', themeId);
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
	return '_' + Math.random().toString(36);
}
