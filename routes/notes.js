const express = require('express');
const router = express.Router();
const {getAllNotes, createNote, getNoteById, updateNoteById, deleteNoteById} = require('../controllers/notes')

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const notes = await getAllNotes()
    console.log(notes);
    res.render("Components/NewNotesEditor", {notes, title: "New note"});  
});

router.get('/:id', async function(req, res, next) {
    const note = await getNoteById(req.params.id)
    res.render('Components/NotesEditor', {note})
})
router.post('/:id', async function(req, res, next) {
    const note = await updateNoteById(req.params.id, req.body)
    res.redirect('/')
})

router.delete('/:id', async function(req, res, next) {
    await deleteNoteById(req.params.id)
    res.redirect('/')
})

router.post('/', async function(req, res, next) {
    const newNote = req.body
    console.log(newNote)
    const note = await createNote(newNote)
    res.redirect('/')
})

module.exports = router;
