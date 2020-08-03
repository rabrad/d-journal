const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const auth = require('../../middleware/auth');
const {
  createNote,
  getNotes,
  getNote,
  deleteNote,
  updateNote,
  getReminderNotes,
  setReminder,
} = require('../../controllers/notes-controller');

// @route    POST api/notes
// @desc     Create a Note
// @access   Private

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('tags', 'Tags is required').not().isEmpty(),
      check('link', 'Link is required').not().isEmpty(),
    ],
  ],
  createNote
);

// @route    GET api/notes
// @desc     Get user notes
// @access   Private
router.get('/', auth, getNotes);

// @route    GET api/notes/reminder
// @desc     Get note reminder
// @access   Private
router.get('/reminder', auth, getReminderNotes);

// @route    GET api/notes/:id
// @desc     Get note by id
// @access   Private
router.get('/:id', auth, getNote);

// @route    DELETE api/notes/:id
// @desc     delete a note
// @access   Private
router.delete('/:id', auth, deleteNote);

// @route    PATCH api/notes/:id
// @desc     Update a Note
// @access   Private
router.patch('/:id', auth, updateNote);

// @route    PATCH api/notes/:id/reminder
// @desc     Set reminder
// @access   Private
router.patch('/:id/reminder', auth, setReminder);

module.exports = router;
