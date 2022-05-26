const form = document.getElementById("form");
const input = document.getElementById("form__input");
const msg = document.getElementById("form__msg");
const notes = document.getElementById("list__notes");
let data = [];

form.addEventListener("submit", (e) => {
	e.preventDefault();
	formValidation();
});

const formValidation = () => {
	if (input.value === "") {
		msg.innerHTML = "Notes cannot be blank";
		input.focus();
	} else {
		msg.innerHTML = "";
		acceptData();
	}
};

const acceptData = () => {
	data.push({
		text: input.value,
	});
	createNotes();
	// Save data to localStorage
	localStorage.setItem("note", JSON.stringify(data));
};

const createNotes = () => {
	notes.innerHTML = "";
	data.map((note, index) => {
		return (
			notes.innerHTML += `
			<div class="notes-row" id=${index}>
				<span>${note.text}</span>
				<div class="icons">
					<img class="icon" src="/img/edit_note.svg" onclick="editNotes(this)" title="Edit" alt="Edit" />
					<img class="icon" src="/img/delete.svg" onclick="deleteNotes(this)" title="Delete" alt="Delete" />
				</div>
			</div>
			`
		);
	});
	resetText();
};

const resetText = () => {
	input.value = "";
	input.focus();
};

const deleteNotes = (e) => {
	// Remove the <html> element: "div"
	const deleteItem = e.parentElement.parentElement;
	deleteItem.remove();
	// Remove note from data array
	data.splice(deleteItem.id, 1);
	localStorage.setItem("note", JSON.stringify(data));
}; 

const editNotes = (e) => {
	const selectedNotes = e.parentElement.parentElement;
	input.value = selectedNotes.children[0].innerHTML;
	deleteNotes(e)
	input.focus();
};

// Función autoinvocada
(() => {
	data = JSON.parse(localStorage.getItem("note")) || {};
	console.log(data);
	createNotes();
})();

