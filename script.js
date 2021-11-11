let myLibrary = [];

const main = document.querySelector('main');

function Book(name, author, pages, readStatus){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function displayLibrary(myLibrary){
    myLibrary.forEach(book => book.displayBook());
}

function addBookToLibrary(book){
    myLibrary.push(book);
}


displayLibrary(myLibrary);

const card = document.createElement('div');
const popup = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');

const newBookBtn = document.querySelector('.new-book');
newBookBtn.addEventListener('click', () => {
    popup.classList.add('active');
    overlay.classList.add('active');
});

overlay.addEventListener('click', () => {
    popup.classList.remove('active');
    overlay.classList.remove('active');
})