const fs = require('fs');
const yargs = require('yargs');
const _ = require('lodash');

const notes = require('./notes');
const argv = yargs
  .command('add', 'Add a new note to the database', {
    title: {
      describe: 'Note title',
      demand: true,
      alias: 't'
    },
    body: {
      describe: 'Note body',
      demand: true,
      alias: 'b'
    }
  })
  .command('remove', 'Remove a note from the database', {
    title: {
      describe: 'Title of note to delete',
      demand: true,
      alias: 't'
    }
  })
  .command('read', 'Read a single note', {
    title: {
      describe: 'Title of note',
      demand: true,
      alias: 't'
    }
  })
  .command('list', 'List all notes')
  .help()
  .argv;

const command = argv._[0];

if (command === 'add') {
  return notes.addNote(argv.title, argv.body);
}

if (command === 'remove') {
  return notes.removeNote(argv.title);
}

if (command === 'list') {
  return notes.getAll();
}

if (command === 'read') {
  return notes.getNote(argv.title);
}
