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

    let trash = document.createElement('div');
    trash.classList.add('trash');
    card.appendChild(trash);

    let deleteBook = document.createElement('button');
    deleteBook.classList.add('delete-btn');
    deleteBook.setAttribute('data-identifier', book.identifier);
    let svgHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-identifier=${book.identifier}><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" data-identifier=${book.identifier} /></svg>`;
    deleteBook.innerHTML = svgHTML;
    trash.appendChild(deleteBook);

    let delMsg = document.createElement('span');
    delMsg.classList.add('msg-box', 'del-msg', 'hide');
    trash.appendChild(delMsg);
    delMsg.setAttribute('id', `del-${book.identifier}`);
    let head = document.createElement('div');
    head.classList.add('book-head');
    card.appendChild(head);

    let bookTitle = document.createElement('h1');
    bookTitle.classList.add('book-title');
    bookTitle.setAttribute('data-identifier', book.identifier)
    bookTitle.textContent = book.title;
    head.appendChild(bookTitle);

    let titleMsg = document.createElement('span');
    titleMsg.classList.add('msg-box', 'title-msg', 'hide');
    titleMsg.setAttribute('id', `t-${book.identifier}`);
    titleMsg.textContent = '';
    head.appendChild(titleMsg);

    let authorLabel = document.createElement('div');
    authorLabel.classList.add('info-label');
    authorLabel.textContent = 'Author:'
    card.appendChild(authorLabel);

    let name = document.createElement('div');
    name.classList.add('name');
    card.appendChild(name);

    let authorName = document.createElement('a');
    authorName.classList.add('author');
    authorName.setAttribute('href', '#');
    authorName.setAttribute('data-identifier', book.identifier)
    authorName.textContent = book.author;
    name.appendChild(authorName);

    let authorMsg = document.createElement('span');
    authorMsg.classList.add('msg-box', 'author-msg', 'hide');
    authorMsg.setAttribute('id', `au-${book.identifier}`);
    name.appendChild(authorMsg);

    let pagesLabel = document.createElement('div');
    pagesLabel.classList.add('info-label');
    pagesLabel.textContent = 'Pages:'
    card.appendChild(pagesLabel);

    let pageNum = document.createElement('div');
    pageNum.classList.add('pages');
    pageNum.textContent = book.pages;
    card.appendChild(pageNum);

    let status = document.createElement('div');
    status.classList.add('status');
    card.appendChild(status);

    let readStatus = document.createElement('button');
    readStatus.classList.add('read-status', `${book.haveRead}`);
    readStatus.setAttribute('data-identifier', book.identifier)
    readStatus.textContent = book.readStatus();
    status.appendChild(readStatus);

    let statusMsg = document.createElement('span');
    statusMsg.classList.add('msg-box', 'status-msg', 'hide');
    statusMsg.setAttribute('id', `st-${book.identifier}`);
    status.appendChild(statusMsg);
   }
   deleteBook();
   changeStatus();
   search();
   hoverMsg();
   booksByAuthor();
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

//Remove a book from library
function deleteBook () {
    let deleteThisBook = document.querySelectorAll('.delete-btn');
    for(let i = 0; i<deleteThisBook.length; i++) {
        deleteThisBook[i].addEventListener('click', (e) => {
            let index = +deleteThisBook[i].getAttribute('data-identifier');
            let deleteItem = myLibrary.splice(index, 1);
            resetIdentifiers(index);
            displayLibrary();
            alert(`Delete ${deleteItem[0].info()}`);
            checkHide();
        });
    }
}

function checkHide () {
    const cards = document.querySelectorAll('.card');
    const by = document.querySelector('.books-by');           
    if (!by.className.includes('hide')) {
        cards.forEach(card => {
            if(card.children[3].children[0].textContent !== by.textContent) {
                card.classList.toggle('hide');
            }
        })
    }
}

function resetIdentifiers (index) {
    for (let i = index; i < myLibrary.length; i++) {
        myLibrary[i].identifier = i;
    }
}

//Change book read status
function changeStatus () {
    let status = document.querySelectorAll('.read-status')
    for (let i = 0; i < myLibrary.length; i++) {
        status[i].addEventListener('click', (e) => {
            let index = status[i].getAttribute('data-identifier');
            myLibrary[i].changeReadStatus();
            displayLibrary();
            checkHide();
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

//Hover Message Box
function hoverMsg () {
    const titleElement = document.querySelectorAll('.book-title');
    const authorElement = document.querySelectorAll('.author');
    const deleteElement = document.querySelectorAll('.delete-btn');
    const statusElement = document.querySelectorAll('.read-status');
    msgEvent(titleElement);
    msgEvent(authorElement);
    msgEvent(deleteElement);
    msgEvent(statusElement);
}

function msgEvent (nodeList) {
    const delMsg = document.querySelectorAll('.del-msg');
    const titleMsg = document.querySelectorAll('.title-msg');
    const authorMsg = document.querySelectorAll('.author-msg');
    const statusMsg = document.querySelectorAll('.status-msg');
    const msgBoxes = document.querySelectorAll('msg-box');
    
    nodeList.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const nodeClass = node.getAttribute('class');
            const identifier = +node.getAttribute('data-identifier');
            if (nodeClass === 'delete-btn' ||nodeClass === ''){
                const tracker = `del-${identifier}`;
                delMsg.forEach(del => {
                    del.textContent = 'Delete book';
                    const isVisible = del.getAttribute('id') === tracker;
                    del.classList.toggle('hide', !isVisible)
                })
            }else if (nodeClass === 'book-title') {
                const tracker = `t-${identifier}`;
                    titleMsg.forEach(title => {
                        title.textContent = node.textContent;
                        const isVisible = title.getAttribute('id') === tracker;
                        title.classList.toggle('hide', !isVisible)
                    })
            }else if (nodeClass === 'author') {
                const tracker = `au-${identifier}`;
                    authorMsg.forEach(author => {
                        author.textContent = node.textContent;
                        const isVisible = author.getAttribute('id') === tracker;
                        author.classList.toggle('hide', !isVisible)
                    })
            }else if (nodeClass === 'read-status yes' ||
                nodeClass === 'read-status no') {
                const tracker = `st-${identifier}`;
                statusMsg.forEach(status => {
                    status.textContent = 'Click to change status';
                    const isVisible = status.getAttribute('id') === tracker;
                    status.classList.toggle('hide', !isVisible)
                })

            }
        })
        node.addEventListener('mouseleave', () => {
            const nodeClass = node.getAttribute('class');
            const identifier = +node.getAttribute('data-identifier');
            if (nodeClass === 'delete-btn'){
                const tracker = `del-${identifier}`;
                const msg = document.getElementById(tracker);
                msg.classList.toggle('hide');
            }else if (nodeClass === 'book-title') {
                const tracker = `t-${identifier}`;
                const msg = document.getElementById(tracker);
                msg.classList.toggle('hide');
            }else if (nodeClass === 'author') {
                const tracker = `au-${identifier}`;
                const msg = document.getElementById(tracker);
                msg.classList.toggle('hide');
            }else if (nodeClass === 'read-status yes' ||
                nodeClass === 'read-status no') {
                const tracker = `st-${identifier}`;
                const msg = document.getElementById(tracker);
                msg.classList.toggle('hide');
            }
        })
    })
}

//Author Search
function booksByAuthor () {
    const authorLinks = document.querySelectorAll('.author');
    const cards = document.querySelectorAll('.card');

    authorLinks.forEach(author => {
        author.addEventListener('click', (e) => {
            const name = e.target.textContent;

            cards.forEach(card => {
                const identifier = +card.getAttribute('data-identifier');
                const isVisible = myLibrary[identifier].author === name;
                card.classList.toggle('hide', !isVisible);
            })
            back.classList.toggle('hide', false);
            by.textContent = name;
            by.classList.toggle('hide', false);
        })
    })
}

//Back button
const libraryName = document.querySelector('.library-name');

const back = document.createElement('button');
back.classList.add('back-to-library', 'hide');
back.textContent = '< BACK';
libraryName.appendChild(back);

const by = document.createElement('span');
by.classList.add('books-by', 'hide');
libraryName.appendChild(by);

//Back button event
back.addEventListener('click', () => {
    const books = document.querySelectorAll('.card');
    books.forEach(book => {
        book.classList.toggle('hide', false);
    })
    back.classList.toggle('hide');
    by.textContent = '';
    by.classList.toggle('hide');
})
