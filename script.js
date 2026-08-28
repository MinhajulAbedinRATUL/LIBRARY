const myLibrary = [];

function Book (author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
};

Book.prototype.status = function (ischecked) {
    this.read = ischecked;
}

function addBookToLibrary(author, title, pages, read) {
    myLibrary.push(new Book(author, title, pages, read));
};

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const status = document.querySelector("#status");
const button = document.querySelector("input[type='submit']");
const form = document.querySelector("form");
const bookList = document.querySelector("#books");

function display(book) {

    const div = document.createElement("div");
    const t = document.createElement("p");
    const a = document.createElement("p");
    const p = document.createElement("p");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const b = document.createElement("button");
    
    bookList.appendChild(div);
    div.appendChild(t);
    div.appendChild(a);
    div.appendChild(p);
    div.appendChild(label);
    div.appendChild(b);

    t.textContent = book.title;
    a.textContent = book.author;
    p.textContent = book.pages;
    label.textContent = "Read";
    label.appendChild(input);
    b.textContent = "Remove";

    div.setAttribute("class", "book");
    div.setAttribute("data-id", book.id);
    input.setAttribute("type", "checkbox");
    input.checked = book.read;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary(author.value, title.value , pages.value, status.checked);
    bookList.innerHTML = "";
    for (const book of myLibrary) {
    display(book);
    }
    form.reset();
})

bookList.addEventListener('click', (e) => {
    let target = e.target.tagName;
    let book = e.target.closest('.book');
    if(!book) return;
    let myLibraryBook = myLibrary.find(item => item.id == book.getAttribute("data-id"));
    if(target === 'INPUT') myLibraryBook.status(e.target.checked);

    else if(e.target.tagName === "BUTTON") { 
        myLibrary.splice(myLibrary.indexOf(myLibraryBook), 1);
        bookList.removeChild(book);
    }    
});