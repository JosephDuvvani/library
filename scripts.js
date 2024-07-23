const myLibrary = [];

function Book(title, author, pages, haveReadIt) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveReadIt;
    this.info = function() {
        let readStatus;
        haveReadIt === 'yes' ? readStatus = 'already read' : readStatus = 'not read yet';
        return `${title} by ${author}, ${pages} pages, ${readStatus}`;
    };
}

function addBookToLibrary(title, author, pages, haveReadIt) {
    let newBook = new Book(title, author, pages, haveReadIt);
    myLibrary.push(newBook);
}