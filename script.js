let myLibrary = [];
//constructor function to create book objects
function Book(title, author, pages, read) {
    this.title = title;
    this.author= author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        return `${title}, ${author}, ${pages}, ${read}.`;
    }
}
//function to toggle read status
Book.prototype.isRead = function() {
    if (this.read === true){
        this.read = false;
    }
    else {
        this.read = true;
    }
}
//function to add new books to end of library array
const addBookToLibrary = (book) => {
    myLibrary.push(book);
}

const closeButton = document.querySelector('.close-button');
const submitButton = document.querySelector('.submit-button');
const bookButton = document.getElementById('new-book');
const popupForm = document.getElementById('popup');
const overlay = document.getElementById('overlay');

let bookTitle = document.getElementById('title');
let bookAuthor = document.getElementById('author');
let bookPages = document.getElementById('pages');
let isRead = document.getElementById('read');
//add Event listeners to popup form
bookButton.addEventListener('click', () => {
    popupForm.style.display = "block";
    overlay.classList.add('active');
    document.getElementById('popup-form').reset();
})

const closePopup = () => {
    overlay.classList.remove('active');
    popupForm.style.display = "none";
}

//function to take data from form and create new book object using constructor
const submitForm = () => {
    if(bookTitle.value === "" || bookAuthor.value === "" || bookPages.value === "") {
        alert("invalid input");
    }
    else if(checkLibrary()){
        alert("library already contains that book");
    }
    else {
        let newBook = new Book(bookTitle.value.toLowerCase(), bookAuthor.value, bookPages.value, isRead.checked);
        addBookToLibrary(newBook);
        console.log(myLibrary);
        addBook();
        closePopup();
    }
}
//check if library already contains that book
const checkLibrary = () => {
    for(i = 0; i < myLibrary.length; i++) {
        if(Object.values(myLibrary[i])[0] === bookTitle.value.toLowerCase()){
            return true;
        }
    }
    return false;
}
        
const box = document.querySelector('.box');
//function to create 'card' for book and display on page
const addBook = () => {
    let newDiv = document.createElement('div');
    let newTitle = document.createElement('h2');
    let newAuthor = document.createElement('h2');
    let newPages = document.createElement('h2');
    let newRead = document.createElement('button');
    let newRemove = document.createElement('button');
    newTitle.textContent = myLibrary[myLibrary.length - 1].title;
    newAuthor.textContent = myLibrary[myLibrary.length - 1].author;
    newPages.textContent = myLibrary[myLibrary.length - 1].pages + " pages";
    if(myLibrary[myLibrary.length - 1].read === true) {
        newRead.textContent = "Read";
        newRead.style.backgroundColor = "#66ff99";
    }
    else {
        newRead.textContent = "Not Read";
        newRead.style.backgroundColor = "#ff3333"
    }
    newRemove.textContent ="Remove";
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newAuthor);
    newDiv.appendChild(newPages);
    newDiv.appendChild(newRead);
    newDiv.appendChild(newRemove);
    newRead.classList.add('read-button');
    newRemove.classList.add('remove-button');
    newDiv.classList.add('book');
    newDiv.setAttribute('data-index', myLibrary.length - 1);
    box.appendChild(newDiv);
    removeCard(newDiv);
    toggleRead(newDiv);
    
}
//function to remove card elements from display
const removeCard = (div) => {
    console.log(div.dataset.index);
    let removeButton = div.querySelector('.remove-button');
    removeButton.addEventListener('click', () => {
        div.remove();
        myLibrary.splice(div.dataset.index, 1);
    })
    console.log(removeButton);
}
    
   

//function to toggle read/not read
const toggleRead = (div) => {
    let readButton = div.querySelector('.read-button');
    readButton.addEventListener('click', () => {
         if (readButton.textContent === "Read") {
             readButton.textContent = "Not Read";
             readButton.style.backgroundColor = "#ff3333"
             
         }
         else {
             readButton.textContent = "Read";
             readButton.style.backgroundColor = "#66ff99"
         }
         myLibrary[div.dataset.index].isRead();
    })
}




    
    
    


