const express = require('express');
const router = express.Router();
const {getAllNotes} = require("../controllers/notes")
/* GET home page. */
router.get('/', async function(req, res, next) {
  const notes = await getAllNotes()
  console.log(notes)
  res.render('index', { title: 'Express', notes });
});

module.exports = router;
