const notes = require('./notes');
const yargs = require('yargs');
const chalk = require('chalk');
const { createNotes, getNotes, removeNotes, getList } = require('./notes');

yargs
    .command({
        command: 'add',
        describe: 'add notes',
        builder: {
            title: {
                describe: 'Notes Title',
                demandOption: true
            },
            body: {
                describe: 'body of the notes',
                demandOption: true
            }
        },
        handler: argv => {
            createNotes(argv.title, argv.body, { encoding: 'utf-8' });
        }
    })

yargs
    .command({
        command: 'remove',
        describe: 'remove notes',
        builder: {
            title: {
                describe: 'Notes Title',
                demandOption: true
            }
        },
        handler: argv => {
            removeNotes(argv.title);
        }
    })

yargs
    .command({
        command: 'list',
        describe: 'list notes',
        handler: argv => {
            getList()
        }
    })

yargs
    .command({
        command: 'read',
        describe: 'read notes',
        builder: {
            title: {
                describe: 'notes to retrieve',
                demandOption: true
            }
        },
        handler: argv => {
            getNotes(argv.title);
        }
    })

yargs.parse();