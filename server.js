const express = require("express")
const app = express()
const port = 8000
const path = require("path")
const Database = require('better-sqlite3')
const db = new Database('notes.db', {verbose: console.log});

// parse request bodies with JSON
app.use(express.json())

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

// Fetch a single note
app.get('/api/single_note/:id', (req, res) => {
    const single_note = db.prepare(
        "SELECT * FROM NOTES WHERE id = ?"
    ).get(req.params.id)
    res.status(200).send(single_note)
})

// Create a note
app.post('/api/add_note', (req, res) => {
    console.log(req.body)
    const note = db.prepare(
        "INSERT INTO notes (title, body) VALUES (?, ?)"
    ).run(req.body.title, req.body.body)
    res.status(200).send(note)
})


// Update a note
app.post('/api/update_note/', (req, res) => {
    console.log(req.body)
    const updated_note = db.prepare(
        "UPDATE notes SET title = ?, body = ? WHERE id = ?"
    ).run(req.body.title, req.body.body, req.body.id)
    res.status(200).send(updated_note)
})
