const express = require("express")
const app = express()
const port = 8000
const path = require("path")
const Database = require('better-sqlite3')
const db = new Database('notes.db', {verbose: console.log});

// add an index route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

// Start the webserver
app.listen(port, () => console.log(`Listening on port ${port}`))

// Serve the static files
app.use(express.static('static'))

// Notes API

// Fetch all notes
app.get('/api/all_notes', (req, res) => {
    const all_notes = db.prepare("SELECT * FROM NOTES").all()
    res.status(200).send(all_notes)
})

app.get('/api/single_note/:id', (req, res) => {
    const single_note = db.prepare(
        "SELECT * FROM NOTES WHERE ID = ?").get(req.params.id)
    res.status(200).send(single_note)
})

//Handle database connections
//const row = db.prepare("SELECT * FROM notes where id = ?").get(1);
//console.log(row)
