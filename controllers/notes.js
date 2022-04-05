const Note = require("../models/notes");

exports.getAllNotes = async () => {
    return await Note.find({})
}

exports.createNote = async (newNote) => {
 const note = await Note.create(newNote)
 note.save()
 return note
}

exports.updateNote = async (id, newNote) => {
    const note = await Note.findOneAndUpdate({id: id}, newNote)
    note.save()
    return note
}

exports.getNoteById = async (id) => {
    return await Note.findById(id)
}

exports.updateNoteById = async (id, note) => {
    return await Note.findByIdAndUpdate(id, note)
}

exports.deleteNoteById = async (id) => {
    return await Note.findByIdAndRemove(id)
}

exports.deleteNote = async (id) => {
    const note = await Note.findOneAndDelete({id})
    return note
}