let myLibrary = getLibrary();
const main = document.querySelector('main');
const containerDiv = document.querySelector('.container');
const bookName = document.getElementById('book-name');
const authorName = document.getElementById('author-name');
const pages = document.getElementById('pages');
const readStatus = document.getElementById('read-status');
const menu = document.querySelector('.menu');
const totalBooks = document.getElementById('total-books');
const totalReadBooks = document.getElementById('total-read-books');
const totalPages = document.getElementById('total-pages');
const totalReadPages = document.getElementById('total-read-pages');
const clearLibBtn = document.getElementById('clear-lib');

let readCount = () => {
    let readBooks = 0, pagesRead = 0, pages = 0;
    myLibrary.forEach((element) => {
        pages += Number(element.pages);
        if(element.readStatus == true){
            readBooks++;
            pagesRead += Number(element.pages);
        }
    });
    return [readBooks, pagesRead, pages];
}

displayLibrary(getLibrary());

class Book {
    constructor(name, author, pages, readStatus) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
}

function addBookToLibrary(book, myLibrary){
    myLibrary.push(book);
}

function displayLibrary(myLibrary){
    containerDiv.innerHTML = '';

    if(myLibrary.length == 0){
        const emptyMsg = document.createElement('div');
        emptyMsg.id = 'empty-msg'
        emptyMsg.classList.add('empty-msg');
        containerDiv.appendChild(emptyMsg);
        emptyMsg.addEventListener('click', () => {
            popup.classList.add('active');
            overlay.classList.add('active');
        });
    }
    
    myLibrary.forEach(book => {
        book.index = myLibrary.indexOf(book);
        containerDiv.appendChild(createCard(book));
    });

    updateMenu();
}

function createCard(Book){
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = `"${Book.name}"`;
    
    const authorDiv = document.createElement('div');
    authorDiv.classList.add('author');
    authorDiv.textContent = Book.author;
    
    const pagesDiv = document.createElement('div');
    pagesDiv.classList.add('pages');
    pagesDiv.textContent = `Pages : ${Book.pages}`;
    
    const statusDiv = document.createElement('div');
    statusDiv.classList.add('status');
    const readLabel = document.createElement('label');
    readLabel.for = 'checkbox';
    readLabel.classList.add('read');
    readLabel.textContent = 'Read?';
    
    const readCheckbox = document.createElement('input');
    readCheckbox.id = 'read-status-checkbox';
    readCheckbox.type = 'checkbox';
    readCheckbox.dataset.index = Book.index;
    readCheckbox.checked = Book.readStatus;
    
    const removeBtnDiv = document.createElement('button');
    removeBtnDiv.classList.add('delete');
    removeBtnDiv.id = 'remove-book-btn';
    removeBtnDiv.dataset.index = Book.index;
    
    statusDiv.appendChild(readLabel);
    statusDiv.appendChild(readCheckbox);
    
    cardDiv.appendChild(titleDiv);
    cardDiv.appendChild(authorDiv);
    cardDiv.appendChild(pagesDiv);
    cardDiv.appendChild(statusDiv);
    cardDiv.appendChild(removeBtnDiv);

    return cardDiv;
}

const popup = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');

const newBookBtn = document.querySelector('.new-book');
newBookBtn.addEventListener('click', () => {
    popup.classList.add('active');
    overlay.classList.add('active');
});

overlay.addEventListener('click', () => {
    menu.classList.remove('active');
    clearPopup();
})

const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', () => {  
    if(bookName.value == '' || authorName.value == '' || pages.value == ''){
        alert('Please input all the fields!');
        return;
    }

    if(pages.value <= 0){
        alert('Please input valid no. of pages!');
        return;
    }
         
    const book = new Book(bookName.value, authorName.value, pages.value, readStatus.checked);
    addBookToLibrary(book, myLibrary);
    storeLibrary(myLibrary);
    clearPopup();
    displayLibrary(myLibrary);
});

function clearPopup(){
    bookName.value = '';
    authorName.value = '';
    pages.value = '';
    readStatus.checked = false;
    popup.classList.remove('active');
    overlay.classList.remove('active');
}

document.body.addEventListener('click', (e) => {
    if(e.target.id == 'remove-book-btn'){
        myLibrary.splice(e.target.dataset.index, 1);
        storeLibrary();
        displayLibrary(myLibrary);
    }
});

document.body.addEventListener('click', (e) => {
    if(e.target.id == 'read-status-checkbox'){
        let currentStatus = myLibrary[e.target.dataset.index].readStatus;
        if(currentStatus == false){
            myLibrary[e.target.dataset.index].readStatus = true;
        }
        else myLibrary[e.target.dataset.index].readStatus = false;

        storeLibrary();
        displayLibrary(myLibrary);
    }
});

function storeLibrary(){
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

function getLibrary(){
    let lib = [];
    lib = JSON.parse(localStorage.getItem("library") || "[]");
    return lib;
}

const menuBtn = document.querySelector('.menu-btn');
menuBtn.addEventListener('click', () => {
    menu.classList.add('active');
    overlay.classList.add('active');
});

const menuCloseBtn = document.getElementById('menu-close');
menuCloseBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    menu.classList.remove('active');
});

function updateMenu(){
    totalBooks.textContent = `Total no. of books : ${myLibrary.length}`;
    totalReadBooks.textContent = `Total no. of books read : ${readCount()[0]}`;
    totalReadPages.textContent = `Total no. of pages read : ${readCount()[1]}`;
    totalPages.textContent = `Total no. of pages : ${readCount()[2]}`;
}

clearLibBtn.addEventListener('click', () =>{
    myLibrary.splice(0, myLibrary.length);
    storeLibrary();
    displayLibrary(myLibrary);
});