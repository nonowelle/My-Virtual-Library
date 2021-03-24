import { toggleForm, Book } from "/form.js";
export let myLibrary = [];

export const addBtn = document.querySelector(".addBtn");
export const form = document.querySelector("form");

//REMOVE FROM LIBRARY
function removeFromLibrary(someBook) {
  const index = myLibrary.findIndex((book) => book === someBook);
  myLibrary.splice(index, 1);
}

//RESET THE GRID OF BOOKS ON DISPLAY
function resetLibraryContainer() {
  document.querySelector(".library").innerHTML = "";
}

//ADDING A BOOK TO THE LIBRARY ARRAY
export function addBook(e) {
  let title = form.querySelector("#title").value;
  let author = form.querySelector("#author").value;
  let pages = form.querySelector("#pages").value;
  let isRead = form.querySelector("#isRead").checked;
  let newBook = new Book(title, author, pages, isRead);

  e.preventDefault();

  //BOOTSTRAP FORM VALIDATION
  if (form.checkValidity() === false) {
    form.classList.add("was-validated");
  } else {
    myLibrary.push(newBook);
    form.innerHTML = "";
    addBtn.classList.remove("hidden");
    form.classList.remove("was-validated");

    addToPage();
    saveLocal();
  }
}

//UPDATING THE PAGE
function addToPage() {
  addBtn.classList.remove("hidden");
  resetLibraryContainer();
  for (let i = 0; i < myLibrary.length; i++) {
    let div = document.createElement("div");
    div.innerHTML = `
            <div class="card m-3" data-index="${myLibrary[i]}">
            <div class="card-header">${myLibrary[i].title}</div>
            <div class="card-body">
              <h5 class="card-title">${myLibrary[i].author}</h5>
              <p class="card-text">
                ${myLibrary[i].pages}
              </p>
              <a href="#" class="btn ${
                myLibrary[i].isRead === true
                  ? "btn-success"
                  : "btn-outline-success"
              } status">
              ${myLibrary[i].isRead === true ? "Read" : "Not read yet"}
           </a>
              <a href="#" class="btn btn-danger remove">Remove</a>
            </div>
          </div>
              `;
    document.querySelector(".library").appendChild(div);

    //REMOVE BUTTON
    div.querySelector(".remove").addEventListener("click", function () {
      removeFromLibrary(myLibrary[i]);
      saveLocal();
      document.querySelector(".library").removeChild(div);
    });

    //CHANGING ISREAD STATUS
    const statusBtn = div.querySelector(".status");
    statusBtn.innerHTML =
      myLibrary[i].isRead === true
        ? ` ${"Read"}<i class="fas fa-check pl-3"></i>
          `
        : `${"Not read yet"} <i class="fas fa-times pl-3"></i>`;
    statusBtn.addEventListener("click", function () {
      myLibrary[i].isRead = !myLibrary[i].isRead;
      statusBtn.innerHTML =
        myLibrary[i].isRead === true
          ? ` ${"Read"}<i class="fas fa-check pl-3"></i>
          `
          : `${"Not read yet"} <i class="fas fa-times pl-3"></i>`;
      statusBtn.classList.toggle("btn-outline-success");
      statusBtn.classList.toggle("btn-success");
    });
  }
}

//LOCAL STORAGE
function saveLocal() {
  localStorage.setItem("books", JSON.stringify(myLibrary));
}

function getLocalStorage() {
  if (localStorage.getItem("books") === null) {
    myLibrary.length = 0;
  } else {
    const booksFromStorage = JSON.parse(localStorage.getItem("books"));
    myLibrary = booksFromStorage;
  }
}

//ADDING BOOKS TO LIBRARY
function addBookToLibrary() {
  getLocalStorage();
  toggleForm();
  addToPage();
}

addBookToLibrary();
