const myLibrary = [];

function Book(title, author, pages, haveReadIt) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveReadIt;
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
    myLibrary.push(newBook);
}

const libraryDisplay = document.querySelector('.books');

function displayLibrary() {
   for(let book of myLibrary){
    let card = document.createElement('div');
    card.classList.add('card');
    libraryDisplay.appendChild(card);

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
}