const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Load notes from local storage on page load
function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes");
}

showNotes();

// Update local storage when there is a change in the notes
function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

// Add a new note when the create button is clicked
createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "images/delete.png";
  notesContainer.appendChild(inputBox).appendChild(img);
  // Update local storage after adding a new note
  updateStorage();
});

// Event delegation to handle both deletion and content change
notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    // Delete the note
    e.target.parentElement.remove();
    updateStorage();
  } else if (
    e.target.tagName === "P" &&
    e.target.classList.contains("input-box")
  ) {
    // Handle content change in the note
    e.target.addEventListener("input", updateStorage);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});
