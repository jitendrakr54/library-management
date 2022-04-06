console.log("Library management");
// Book constructor
document.onload = showBooks();

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display constructor
function Display() {

}

// Add methods to prototype
Display.prototype.add = function (book) {
    console.log("Adding to UI");
        let books = localStorage.getItem('books');
        let booksArr = [];
        if(books) {
            booksArr = JSON.parse(books);
        }
        booksArr.push(book);
        localStorage.setItem('books', JSON.stringify(booksArr));
        showBooks();
}

Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

Display.prototype.validate = function(book) {
    if(book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    return true;
}

Display.prototype.showMessage = function(type, message) {
    let alertBox = document.getElementById('alertBox');
    let text = `
                    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>Message: </strong> ${message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
    alertBox.innerHTML = text;
    setTimeout(function(){
        alertBox.innerHTML = '';
    }, 2000);
}

function showBooks() {
    console.log("Showing books");
    let books = localStorage.getItem('books');
    let booksArr = [];
    if(books) {
        booksArr = JSON.parse(books);
    }

    let uiString = '';
    booksArr.forEach( function(element, index) {
        uiString += `
                    <tr>
                    <th scope="row">${index}</th>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    </tr>
                    `;
    });
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = uiString;
}

// Add submit event listener to Library libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit', submitLibraryForm);

function submitLibraryForm(e) {
    e.preventDefault();
    console.log("Library form submitted");

    let name = document.getElementById("bookName").value;
    let author = document.getElementById("bookAuthor").value;

    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
    let type;
    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.showMessage('success', 'Your book has been added successfully!');
    } else {
        display.showMessage('danger', 'This book can not be added!');
    }
}