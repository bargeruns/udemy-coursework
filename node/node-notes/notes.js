const fs = require('fs');
const _  = require('lodash');

const fetchNotes = () => {
  try {
    let notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
  let notes = fetchNotes();
  const note = {title, body};
  let duplicates = notes.filter((note) => note.title === title);

  if (duplicates.length) {
    return console.log(`Could not save note. A note with the title ${title} already exists.`);
  }

  notes.push(note);
  saveNotes(notes);
  console.log('----');
  console.log('Created note:');
  console.log('Title:', note.title);
  console.log('Body:', note.body);
  return note;
};

const getAll = () => {
  const notes = fetchNotes();
  if (!notes.length) {
    console.log('** No notes found. Add one using the `add` command!');
    return undefined;
  }
  console.log(`-- Found ${notes.length} notes:`);
  _.each(fetchNotes(), (note) => {
    console.log('*', note.title, '--', note.body);
  });
};

const getNote = (title) => {
  let note = _.find(fetchNotes(), {title: title});
  if (!note) {
    console.log('* No notes found with the title', title);
    return undefined;
  }
  console.log('*', note.title, '--', note.body);
};

const removeNote = (title) => {
  let notes = fetchNotes().filter((note) => note.title !== title);
  saveNotes(notes);
  console.log('Removed note with title,', title);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
}
