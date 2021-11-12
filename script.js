let myLibrary = getLibrary();
const main = document.querySelector('main');
const containerDiv = document.querySelector('.container');
const bookName = document.getElementById('book-name');
const authorName = document.getElementById('author-name');
const pages = document.getElementById('pages');
const readStatus = document.getElementById('read-status');
displayLibrary(getLibrary());

function Book(name, author, pages, readStatus){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBookToLibrary(book, myLibrary){
    myLibrary.push(book);
}

function displayLibrary(myLibrary){
    containerDiv.innerHTML = '';
    myLibrary.forEach(book => {
        book.index = myLibrary.indexOf(book);
        containerDiv.appendChild(createCard(book));
    });
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
    clearPopup();
})

const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', () => {  
    if(bookName.value == '' || authorName.value == '' || pages.value == ''){
        alert('Please input all the fields!');
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
})

function storeLibrary(){
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

function getLibrary(){
    let lib = [];
    lib = JSON.parse(localStorage.getItem("library") || "[]");
    return lib;
}