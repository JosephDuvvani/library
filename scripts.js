const myLibrary = [];


function Book(title, author, pages, haveReadIt) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveReadIt;
    this.identifier;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${this.readStatus()}`;
    };

    this.readStatus = function () {
        let status = '';
        this.haveRead === 'yes' ? status = 'already read' : status = 'not read yet';
        return status;
    }
}

Book.prototype.changeReadStatus = function () {
    if (this.haveRead === 'yes') {
        return this.haveRead = 'no'
    }else {
        return this.haveRead = 'yes';
    }
}

function addBookToLibrary(title, author, pages, haveReadIt) {
    let newBook = new Book(title, author, pages, haveReadIt);
    let identifier = myLibrary.length;
    newBook.identifier = identifier;
    myLibrary.push(newBook);
}

const libraryDisplay = document.querySelector('.books');

function displayLibrary() {
   libraryDisplay.textContent = '';
   for(let book of myLibrary){
    let card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-identifier', book.identifier);
    libraryDisplay.appendChild(card);

    let deleteBook = document.createElement('button');
    deleteBook.classList.add('delete-btn');
    deleteBook.setAttribute('data-identifier', book.identifier);
    card.appendChild(deleteBook);
    let svgHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-identifier=${book.identifier}><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" data-identifier=${book.identifier} /></svg>`;
    deleteBook.innerHTML = svgHTML;
    card.appendChild(deleteBook);

    let bookTitle = document.createElement('h1');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = book.title;
    card.appendChild(bookTitle);

    let authorLabel = document.createElement('div');
    authorLabel.classList.add('info-label');
    authorLabel.textContent = 'Author:'
    card.appendChild(authorLabel);

    let authorName = document.createElement('a');
    authorName.classList.add('author');
    authorName.setAttribute('href', '#');
    authorName.textContent = book.author;
    card.appendChild(authorName);

    let pagesLabel = document.createElement('div');
    pagesLabel.classList.add('info-label');
    pagesLabel.textContent = 'Pages:'
    card.appendChild(pagesLabel);

    let pageNum = document.createElement('div');
    pageNum.classList.add('pages');
    pageNum.textContent = book.pages;
    card.appendChild(pageNum);

    let readStatus = document.createElement('button');
    readStatus.classList.add('read-status', `${book.haveRead}`);
    readStatus.setAttribute('data-identifier', book.identifier)
    readStatus.textContent = book.readStatus();
    card.appendChild(readStatus);
   }
   deleteBook();
   changeStatus();
   search();
}

const showNewBookForm = document.querySelector('.new-book');
const formDialog = document.querySelector('#form-dialog');
const closeBtn = document.querySelector('#close-btn');
const addBook = document.querySelector('#add-book');

showNewBookForm.addEventListener('click', () => {
    formDialog.showModal();
});

closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    formDialog.close();
});

addBook.addEventListener('click', (e) => {
    e.preventDefault();
    let inputTitle = document.querySelector('#title');
    let inputAuthor = document.querySelector('#author');
    let inputPages = document.querySelector('#pages');
    let readStatus = document.querySelector('input[name="have-read-book"]:checked');

// Validate input
    if (inputTitle.value == '' ||
        inputAuthor.value == '' ||
        inputPages.value == ''||
        readStatus == null) {
            return alert('Form incomplete');
        }else if (checkOnlySpacesInput(inputTitle.value) || 
                checkOnlySpacesInput(inputAuthor.value) ||
                checkOnlySpacesInput(inputPages.value)) {
                    return alert('Input cannot be only spaces!');
                }

    addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, readStatus.value);
    displayLibrary();
    clearForm();
    formDialog.close();
});

// Check if input is only spaces
function checkOnlySpacesInput (input) {
    let spacesInput = input.split('');
    let spaceCounter = 0;

    for (let x of spacesInput) {
        if (x == ' ') spaceCounter++;
    }
    if (spaceCounter === input.length){
        return true;
    } else {
        return false;
    }
}

// Clear form
function clearForm () {
    let inputTitle = document.querySelector('#title');
    let inputAuthor = document.querySelector('#author');
    let inputPages = document.querySelector('#pages');
    let readStatus = document.querySelector('input[name="have-read-book"]:checked');

    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
    readStatus.checked = false;
}

// Dummy Books
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 323, 'yes');                         //First published July 11, 1960
addBookToLibrary('Romeo and Juliet', 'William Shakespeare', 281, 'no');                      //First published January 1, 1597  
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, 'yes');                     //First published April 10, 1925
addBookToLibrary('1984', 'George Orwell', 290, 'no');
displayLibrary();

function deleteBook () {
    let deleteThisBook = document.querySelectorAll('.delete-btn');
    for(let i = 0; i<deleteThisBook.length; i++) {
        deleteThisBook[i].addEventListener('click', (e) => {
            let index = +deleteThisBook[i].getAttribute('data-identifier');
            let deleteItem = myLibrary.splice(index, 1);
            resetIdentifiers(index);
            displayLibrary();
            alert(`Delete ${deleteItem[0].info()}`);
        });
    }
}

function resetIdentifiers (index) {
    for (let i = index; i < myLibrary.length; i++) {
        myLibrary[i].identifier = i;
    }
}

function changeStatus () {
    let status = document.querySelectorAll('.read-status')
    for (let i = 0; i < myLibrary.length; i++) {
        status[i].addEventListener('click', (e) => {
            let index = status[i].getAttribute('data-identifier');
            myLibrary[i].changeReadStatus();
            displayLibrary();
        });
    }
}

//Search Bar
function search () {
    const searchBar = document.querySelector('[data-search]');
    const cards = document.querySelectorAll('.card');

    searchBar.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        console.log(value)
        cards.forEach(card => {
            const identifier = +card.getAttribute('data-identifier');
            const title = myLibrary[identifier].title.toLowerCase();
            const author = myLibrary[identifier].author.toLowerCase();
            console.log(title);
            console.log(author);
            const isVisible = title.includes(value) || author.includes(value);
            card.classList.toggle('hide', !isVisible);
            console.log(isVisible)
        })
    })
}
