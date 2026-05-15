let notesTitles = ['Ba', 'Aufgabe'];
let notes = ['banana', 'rasen mähen'];

let trashNotesTitles = [];
let trashNotes = [];

let archivNotesTitles = [];
let archivNotes = [];


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

function renderArchivNotes() {
    let archivContentRef = document.getElementById('archiv_content');
    archivContentRef.innerHTML = "";
    
    for (let indexArchivNote = 0; indexArchivNote < archivNotes.length; indexArchivNote++) {
         archivContentRef.innerHTML += getArchivNoteTemplate(indexArchivNote);
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
    return `
    <div class="note">
        <h3>${notesTitles[indexNote]}</h3>
        <p>${notes[indexNote]}</p>
        <div>
            <button onclick="pushToTrash(${indexNote})" class="btn">X</button>
            <button onclick="noteToArchiv(${indexNote})" class="btn">A</button>
        </div>
    </div>
    `;
}


function getArchivNoteTemplate(indexArchivNote) {
    return `
    <div class="note">
        <h3>${archivNotesTitles[indexArchivNote]}</h3>
        <p>${archivNotes[indexArchivNote]}</p>
        <div>
            <button onclick="archivToTrash(${indexArchivNote})" class="btn">X</button>
            <button onclick="archivToNote(${indexArchivNote})" class="btn">N</button>
        </div>
    </div>
    `;
}

function getTrashNoteTemplate(indexTrashNote) {
    return `
    <div class="note">
        <h3>${trashNotesTitles[indexTrashNote]}</h3>
        <p>${trashNotes[indexTrashNote]}</p>
        <div>
            <button onclick="deleteNote(${indexTrashNote})" class="btn">X</button>
            <button onclick="trashToNote(${indexTrashNote})" class="btn">N</button>
            `;
}


function addNote() {
    let noteInputRef = document.getElementById('note_input');
    let noteTitleInputRef = document.getElementById('note_input_title');
    let noteInput = noteInputRef.value;
    let noteTitle = noteTitleInputRef.value;
    
    if (noteInput == "" || noteTitle == "") { 
        return
    }

        notes.push(noteInput);
        notesTitles.push(noteTitle); 
        
        saveToLocalStorageNotesTitles();
        saveToLocalStorageNotes();
        renderNotes();
        noteInputRef.value = "";
        noteTitleInputRef.value = "";
    
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


function noteToArchiv(indexArchivNote) {
    let archivNote = notes.splice(indexArchivNote, 1);
    archivNotes.push(archivNote[0]);
    let archivNoteTitle = notesTitles.splice(indexArchivNote, 1);
    archivNotesTitles.push(archivNoteTitle[0]);

    saveToLocalStorageNotes();
    saveToLocalStorageNotesTitles();

    saveToLocalStorageArchivNotes();
    saveToLocalStorageArchivNotesTitles();

    renderNotes();
    renderArchivNotes();
}

function saveToLocalStorageArchivNotes() {
    localStorage.setItem("archivNotes", JSON.stringify(archivNotes));
}

function saveToLocalStorageArchivNotesTitles() {
    localStorage.setItem("archivNotesTitles", JSON.stringify(archivNotesTitles));
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



