const fs = require('fs');
const chalk = require('chalk');

const saveNotesCallback = (err) => {
    if (err) {
        console.log(chalk.red('unable to create notes'));
        throw err;
    }
    console.log(chalk.green('Sucess!!'));
};

const getNotes = (title) => {
    const notes = loadNotes();
    let note = notes.filter(note => note.title === title);
    if (note.length !== 0)
        console.log(chalk.yellow(`title : ${note[0].title} \nbody  : ${note[0].body}`));
    else
        console.log(chalk.red('Note Not Found'));
}

const createNotes = (title, body) => {
    let notes = loadNotes();
    const duplicateNotes = notes.filter(note => {
        if (note.title == title) {
            note.body = note.body + ', ' + body;
            return true;
        }
        return false;
    }
    )
    if (duplicateNotes.length === 0) {
        notes.push({ title, body })
        saveNotes(notes);
    }
    else
        saveNotes(duplicateNotes);
}

const removeNotes = (title) => {
    let notes = loadNotes();
    const len1 = notes.length;
    notes = notes.filter(note => note.title !== title);
    const len2 = notes.length;
    if (len1 !== len2)
        saveNotes(notes);
    else
        console.log(chalk.red("Notes Not Found!!"))
}

const saveNotes = (notes) => {
    const notesString = JSON.stringify(notes);
    fs.writeFile('notes.json', notesString, saveNotesCallback)
}

const loadNotes = () => {
    const notesBuffer = fs.readFileSync('notes.json');
    const notesString = notesBuffer.toString();
    return JSON.parse(notesString);
}

const getList = () => {
    const notes = loadNotes();
    notes.forEach(note => console.log(chalk.yellow(note.title)));
}

module.exports = {
    getNotes,
    createNotes,
    removeNotes,
    getList
}