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
        haveReadIt === 'yes' ? status = 'already read' : status = 'not read yet';
        return status;
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

    let readStatus = document.createElement('div');
    readStatus.classList.add('read-status');
    readStatus.textContent = book.readStatus();
    card.appendChild(readStatus);
   }
   deleteBook();
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
addBookToLibrary('The Hobbit', 'J.R.R Tolkien', 295, 'yes');
addBookToLibrary('The Hobbit 2', 'J.R.R Tolkien', 299, 'no');
addBookToLibrary('The Hobbit: The Hobbit of the underground 3', 'J.R.R Tolkien', 299, 'no');
addBookToLibrary('The Hobbit 4', 'J.R.R Tolkien', 299, 'yes');
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