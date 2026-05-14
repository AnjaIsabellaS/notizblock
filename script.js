

let notes = ['banana', 'rasen mähen'];

let trashNotes = [];

function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";
    
    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        const note = notes[indexNote];
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }

}


function renderTrashNotes() {
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";
    
    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }

}


function getNoteTemplate(indexNote) {
    return `<p>+ ${notes[indexNote]}<button onclick="pushToTrash(${indexNote})">In den Papierkorb</button></p>`;
}

function getTrashNoteTemplate(indexTrashNote) {
    return `<p>+ ${trashNotes[indexTrashNote]}<button onclick="deleteNote(${indexTrashNote})">Löschen</button></p>`;
}


function addNote() {
    let noteInputRef = document.getElementById('note_input');
    let noteInput = noteInputRef.value; 

    notes.push(noteInput);

    renderNotes();

    noteInputRef.value = "";

}


function pushToTrash(indexNote) {
    let trashNote = notes.splice(indexNote, 1);
    trashNotes.push(trashNote);
    renderNotes();
    renderTrashNotes();
}

function deleteNote(indexNote) {
    trashNotes.splice(indexNote, 1);
    renderNotes();
    renderTrashNotes();
}



//notizen archivieren