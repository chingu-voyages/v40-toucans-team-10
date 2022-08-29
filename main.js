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

// theme select
const themeData = {
	theme1: {
		bgColor: '#11111',
		fontColor: '11111',
		btnColor: '11111',
	},
	theme2: {
		bgColor: '#11111',
		fontColor: '11111',
		btnColor: '11111',
	},
	theme3: {
		bgColor: '#11111',
		fontColor: '11111',
		btnColor: '11111',
	},
	theme4: {
		bgColor: '#11111',
		fontColor: '11111',
		btnColor: '11111',
	},
};

// const theme1 = {
// 	bgColor: '#11111',
// 	fontColor: '11111',
// 	btnColor: '11111',
// };

const themeSelectBtn = document.querySelectorAll('.btn');
for (let i = 0; i < themeSelectBtn.length; i++) {
	// eslint-disable-next-line no-use-before-define
	themeSelectBtn[i].addEventListener('click', (e) => changeTheme(e));
}

function changeTheme(e) {
	console.log(e.target.id);
	const themeId = e.target.id;
	for (let i = 0; i < themeSelectBtn.length; i++) {
		// eslint-disable-next-line no-use-before-define
		themeSelectBtn[i].classList.remove('themecheck');
	}
	themeSelectBtn[themeId - 1].classList.add('themecheck');
	if (themeId === '1') {
		console.log('theme1');
		setTheme(themeData.theme1);
	} else if (themeId === '2') {
		console.log('theme2');
	} else if (themeId === '3') {
		console.log('theme3');
	} else {
		console.log('theme4');
	}
}

function setTheme(themeData) {}
