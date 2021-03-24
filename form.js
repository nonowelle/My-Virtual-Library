import { addBook, myLibrary, addBtn, form } from "/app.js";

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

//TOGGLE THE FORM
function toggleForm() {
  addBtn.addEventListener("click", () => {
    //REMOVE BUTTON
    addBtn.classList.add("hidden");
    form.innerHTML = `
      <h2 class="mb-3">Add a new book</h2>
          <div class=" mb-3">
          <input  id="title" value="" required type="text" class="form-control mb-3" placeholder="Title" aria-label="Title" aria-describedby="basic-addon1">
          <input id="author" value="" required type="text" class="form-control mb-3" placeholder="Author" aria-label="Author" aria-describedby="basic-addon1">
          <label for="pages" class="form-label">Number of pages</label>
          <input id="pages" value="" type="Number" class="form-control mb-3" required placeholder="Number of Pages" aria-label="Pages" aria-describedby="basic-addon1">
          </div>
          <div class="form-check mb-2">
          <input id="isRead" value="pages" type="checkbox" class="form-check-input mb-5" >
          <label class="form-check-label mb-3" for="isRead">
              Read?
          </label>
          </div>
      
          <button class="btn btn-primary submit" type="submit">Submit</button>
          `;
  });
  //add the book infos to the mylibrary array on submit
  form.addEventListener("submit", addBook);
}

export { Book, toggleForm, myLibrary };
