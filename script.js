let myLibrary = [new Book("Sapiens", "Yuval Noah Harari", 200, "No")];
let listContainer = document.getElementById("list-container");
function Book(title, author, numPages, previouslyRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.previouslyRead = previouslyRead;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.previouslyRead}`;
    }
}


function addBookToLibrary() {
    let newTitle = document.getElementById("title").value;
    let newAuthor = document.getElementById("author").value;
    let newNumPages = document.getElementById("pages").value;
    let newPrevRead;
    let prevReadRadios = document.querySelectorAll("input[name='prevRead']");
    for(let radio of prevReadRadios) {
        if(radio.checked) {
            newPrevRead = radio.value;
            break;
        }
    }

    let newBook = new Book(newTitle, newAuthor, newNumPages, newPrevRead);
    console.log(newBook.info());
    myLibrary.push(newBook);
}

function addBookToList() {

    let cardTitle = document.createElement("div");
    cardTitle.innerText = myLibrary[myLibrary.length - 1].title;
    cardTitle.setAttribute("data-row-index", myLibrary.length - 1);
    cardTitle.classList.add("list-item")
    document.getElementById("list-container").appendChild(cardTitle);

    let cardAuthor = document.createElement("div");
    cardAuthor.innerText = myLibrary[myLibrary.length - 1].author;
    cardAuthor.setAttribute("data-row-index", myLibrary.length - 1);
    cardAuthor.classList.add("list-item")
    document.getElementById("list-container").appendChild(cardAuthor);

    let cardNumPages = document.createElement("div");
    cardNumPages.innerText = myLibrary[myLibrary.length - 1].numPages;
    cardNumPages.setAttribute("data-row-index", myLibrary.length - 1);
    cardNumPages.classList.add("list-item")
    document.getElementById("list-container").appendChild(cardNumPages);

    let cardPrevRead = document.createElement("div");
    cardPrevRead.innerText = myLibrary[myLibrary.length - 1].previouslyRead;
    cardPrevRead.setAttribute("data-row-index", myLibrary.length - 1);
    cardPrevRead.classList.add("prev-read-box");
    cardPrevRead.classList.add("list-item")
    document.getElementById("list-container").appendChild(cardPrevRead);

    let removeButton = document.createElement("button");
    removeButton.innerText = "Remove Book";
    removeButton.classList.add("list-item");
    removeButton.classList.add("remove-button");
    removeButton.setAttribute("data-book-key", myLibrary.length - 1);
    document.getElementById("list-container").appendChild(removeButton);
        
}

document.addEventListener('click', function(event) {
    if(event.target.classList.contains("remove-button")) {
        removeBookFromList(event.target.getAttribute("data-book-key"));
    }
}, false);

function removeBookFromList(index) {
    myLibrary.splice(index, 1);

    let removedDivs = document.querySelectorAll(`div[data-row-index='${index}']`);
    for(let i = 0; i < removedDivs.length; i++) {
        removedDivs[i].remove();
    }
    let removedButton = document.querySelector(`button[data-book-key='${index}']`);
    removedButton.remove();
    
}

document.getElementById("new-book-button").addEventListener("click", function() {
    document.getElementById("new-book-info").style.visibility = 'visible';
    document.querySelector("body").style.background = "grey";

});

document.addEventListener('click', function(event) {
    if(event.target.classList.contains("prev-read-box")) {
        changePrevReadValue(event.target);
    }
});

function changePrevReadValue(box) {
    if(box.innerText === "No") {
        box.innerText = "Yes";
    }
    else {
        box.innerText = "No";
    }
}


document.getElementById("new-book-info").addEventListener("submit", function(e) {
    if(document.getElementById("title").value != '' && document.getElementById("author").value != '' && document.getElementById("pages").value != '') {
        addBookToLibrary();
        addBookToList();
    
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("pages").value = '';
    
        document.getElementById("new-book-info").style.visibility = 'hidden';
        document.querySelector("body").style.background = "white";
    
    
        e.preventDefault();
    }

});

addBookToList();
myLibrary.push(new Book("Dune", "Frank Herbert", 500, "Yes"));
addBookToList();