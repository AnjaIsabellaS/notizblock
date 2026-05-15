let notesTitles = ['Ba', 'Aufgabe'];
let notes = ['banana', 'rasen mähen'];

let trashNotesTitles = [];
let trashNotes = [];


function renderNotes() {
    getFromLocalStorageNotes();
    getFromLocalStorageNotesTitles();

    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";
    
    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        const note = notes[indexNote];
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
}


function renderTrashNotes() {
    getFromLocalStorageTrashNotes();
    getFromLocalStorageTrashNotesTitles();


    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";
    
    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
}


function getNoteTemplate(indexNote) {
    return `<p>+ title: ${notesTitles[indexNote]} -> ${notes[indexNote]}<button onclick="pushToTrash(${indexNote})">In den Papierkorb</button></p>`;
}

function getTrashNoteTemplate(indexTrashNote) {
    return `<p>+ title: ${trashNotesTitles[indexTrashNote]} -> ${trashNotes[indexTrashNote]}<button onclick="deleteNote(${indexTrashNote})">Löschen</button></p>`;
}


function addNote() {
    let noteInputRef = document.getElementById('note_input');
    let noteInput = noteInputRef.value;
    
    if (noteInput !== "") { 
        notes.push(noteInput);
        notesTitles.push(noteInput); 
        
        saveToLocalStorageNotesTitles();
        saveToLocalStorageNotes();
        renderNotes();
        noteInputRef.value = "";
    }
}


function saveToLocalStorageNotesTitles() {
    localStorage.setItem("notesTitles", JSON.stringify(notesTitles));
}

function saveToLocalStorageNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}


function getFromLocalStorageNotes() {
    
    let myArrNote = JSON.parse(localStorage.getItem("notes"));
    
    if (myArrNote === null) {
         return; 
    }

    notes = myArrNote; // Wird bei null niemals ausgeführt
}


function getFromLocalStorageNotesTitles() {
    
    let myArrNoteTitle = JSON.parse(localStorage.getItem("notesTitles"));
    
    if (myArrNoteTitle === null) {
         return; 
    }

    notesTitles = myArrNoteTitle; // Wird bei null niemals ausgeführt
}



function pushToTrash(indexNote) {
    let trashNote = notes.splice(indexNote, 1);
    trashNotes.push(trashNote[0]);
    let trashNoteTitle = notesTitles.splice(indexNote, 1);
    trashNotesTitles.push(trashNoteTitle[0]);

    saveToLocalStorageNotes();
    saveToLocalStorageNotesTitles();

    saveToLocalStorageTrashNotesTitles();
    saveToLocalStorageTrashNotes();
    renderNotes();

    renderTrashNotes();
}

   
function saveToLocalStorageTrashNotesTitles() {
    localStorage.setItem("trashNotesTitles", JSON.stringify(trashNotesTitles));
}

function saveToLocalStorageTrashNotes() {
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
}

function getFromLocalStorageTrashNotes() {
    
    let myArrTrashNote = JSON.parse(localStorage.getItem("trashNotes"));
    
    if (myArrTrashNote === null) {
         return; 
    }

    trashNotes = myArrTrashNote; // Wird bei null niemals ausgeführt
}


function getFromLocalStorageTrashNotesTitles() {
    
    let myArrNoteTrashTitle = JSON.parse(localStorage.getItem("trashNotesTitles"));
    
    if (myArrNoteTrashTitle === null) {
         return; 
    }

    trashNotesTitles = myArrNoteTrashTitle; // Wird bei null niemals ausgeführt
}

function deleteNote(indexNote) {
    trashNotes.splice(indexNote, 1);
    trashNotesTitles.splice(indexNote, 1); 

    // WICHTIG: Den geleerten Papierkorb im Speicher aktualisieren!
    saveToLocalStorageTrashNotes();
    saveToLocalStorageTrashNotesTitles();

    renderNotes();
    renderTrashNotes();
}



