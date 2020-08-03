const { validationResult } = require("express-validator");
var schedule = require("node-schedule");
const Note = require("../models/Note");
const User = require("../models/User");
const moment = require("moment");
const { reminderNote } = require("../emails/account");

// Create Note
const createNote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newNote = new Note({
      title: req.body.title,
      note: req.body.note,
      link: req.body.link,
      tags: req.body.tags.split(",").map((skill) => skill.trim()),
      user: req.user.id,
      reminder: req.body.reminder,
    });

    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get Notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort("createdAt -1");

    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get Reminder Note
const getReminderNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
      displayReminderNote: true,
    });

    console.log(notes);

    res.status(200).json(notes);
  } catch (error) {
    console.error(error.message);
  }
};

// Get Note by Id
const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ errors: [{ msg: "Note not found" }] });
    }

    // check if the note belongs to the user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: "User not authorized" }] });
    }

    res.json(note);
  } catch (err) {
    console.error(err.message);
    if ("ObjectId".length > 0 || "ObjectId" !== req.params.id) {
      res.status(400).json({ errors: [{ msg: "Note not found" }] });
    }
    res.status(500).send("Server Error");
  }
};

// Delete Note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(400).json({ errors: [{ msg: "Note not found" }] });
    }

    // check if the note belongs to the user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: "User not authorized" }] });
    }

    await note.remove();

    res.json({ msg: "Note removed" });
  } catch (err) {
    console.error(err.message);
    if ("ObjectId".length > 0) {
      res.status(400).json({ errors: [{ msg: "Note not found" }] });
    }
    res.status(500).send("Server Error");
  }
};

// Update Note
const updateNote = async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const note = await Note.findById(req.params.id).sort("updatedAt -1");
    if (!note) {
      return res.status(400).json({ errors: [{ msg: "Note not found" }] });
    }

    // check if the note belongs to the user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: "User not authorized" }] });
    }

    updates.forEach((update) => (note[update] = req.body[update]));
    await note.save();
    res.json({ msg: "Note Updated" });
  } catch (err) {
    console.error(err.message);
    if ("ObjectId".length > 0) {
      res.status(400).json({ errors: [{ msg: "Note not found" }] });
    }
    res.status(500).send("Server Error");
  }
};

// Set Reminder
const setReminder = async (req, res) => {
  const { reminder, kindOfReminder } = req.body;
  try {
    const note = await Note.findById(req.params.id);
    const { name, email } = await User.findById(req.user.id);
    if (!note) {
      return res.status(400).json({ errors: [{ msg: "Note not found" }] });
    }

    // check if the note belongs to the user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: "User not authorized" }] });
    }
    note.reminder = reminder;
    note.kindOfReminder = kindOfReminder;

    await note.save();

    let pattern;
    switch (note.kindOfReminder) {
      case "daily":
        pattern = "*0 0 * * *";
        break;
      case "weekly":
        pattern = "0 0 * * 1";
        break;
      case "monthly":
        pattern = "0 0 1 * *";
        break;
      case "yearly":
        pattern = "0 00 1 1/12 */1";
        break;
      default:
        break;
    }

    const j = schedule.scheduleJob(pattern, async function () {
      reminderNote(
        name,
        email,
        note.title,
        moment(note.reminder).format("MMMM Do YYYY, h:mm:ss a"),
        `${req.headers.origin}/${note._id}`
      );
      note.kindOfReminder = undefined;
      note.displayReminderNote = true;
      await note.save();
      if (!note.kindOfReminder) {
        j.cancel();
      }
    });

    res.status(201).json(note);
  } catch (error) {
    console.error(error.message);
    if ("ObjectId".length > 0) {
      res.status(400).json({ errors: [{ msg: "Note not found" }] });
    }
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  deleteNote,
  updateNote,
  getReminderNotes,
  setReminder,
};
