import './style.css';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Resolve User story #1 in Epic: CRUD (w/ some bugs)

// Add/save/read notes variables
const saveBtn = document.querySelector('.save-btn');
const mainContainerEl = document.querySelector('.main-container');

let notes = localStorage.getItem('notes');
notes = JSON.parse(notes);

// random ID
function randomIDGenerate() {
	return '_' + Math.random().toString(36).substr(2, 9);
}

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
		const { id, title, category, description } = note;
		// eslint-disable-next-line no-console
		mainContainerEl.innerHTML += `
			<div class="main-item noteContent">
      <button onclick="update(${id})" type="button">update</button>
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
		id: randomIDGenerate(),
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

// theme select

// Try to store the theme in local storage,
// then access it

const themeData = {
	theme1: {
		bgColor: '#FFFFFE',
		fontColor: '#272343',
		btnColor: '#FFD803',
	},
	theme2: {
		bgColor: '#FFC0AD',
		fontColor: '#271C19',
		btnColor: '#E78FB3',
	},
	theme3: {
		bgColor: '#B8C1EC',
		fontColor: '#121629',
		btnColor: '#EEBBC3',
	},
	theme4: {
		bgColor: '#FEC7D7',
		fontColor: '#FEC7D7',
		btnColor: '#A786DF',
	},
};
// if the theme is none:
//   set the theme to the default
// else:
//   set the theme (e.g. bg, texts, etc.)
const themeSelectBtn = document.querySelectorAll('.btn');
// eslint-disable-next-line no-use-before-define
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
	// eslint-disable-next-line no-use-before-define
	for (let i = 0; i < themeSelectBtn.length; i++) {
		// eslint-disable-next-line no-use-before-define
		themeSelectBtn[i].classList.remove('themecheck');
		themeSelectBtn[i].innerText = 'Set theme as default';
	}
	themeSelectBtn[themeId - 1].classList.add('themecheck');
	themeSelectBtn[themeId - 1].innerText = 'Current theme';

	// theme change
	if (themeId === '1') {
		setTheme(themeData.theme1);
	} else if (themeId === '2') {
		setTheme(themeData.theme2);
	} else if (themeId === '3') {
		setTheme(themeData.theme3);
	} else {
		setTheme(themeData.theme4);
	}
}

function update(id) {
	console.log('update');
}
