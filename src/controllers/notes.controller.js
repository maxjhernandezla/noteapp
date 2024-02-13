import * as notesService from '../services/notes.service.js';

const createNote = async (req, res) => {
  try {
    const result = await notesService.createNote(req.body, req.user);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await notesService.getNotes(req.user.id);
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await notesService.getNoteById(req.params.nid);
    res.status(200).send(note);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const result = await notesService.updateNote(req.params.nid, {
      ...req.body,
    });
    res.status(203).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const result = await notesService.deleteNote(req.params.nid);
    res.status(203).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const toggleArchivedStatus = async (req, res) => {
  try {
    const result = await notesService.toggleArchivedStatus(req.params.nid);
    res.status(203).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getActiveNotes = async (req, res) => {
  try {
    const result = await notesService.getActiveNotes(req.user);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getArchivedNotes = async (req, res) => {
  try {
    const result = await notesService.getArchivedNotes(req.user);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export {
  createNote,
  getNotes,
  updateNote,
  getNoteById,
  deleteNote,
  toggleArchivedStatus,
  getActiveNotes,
  getArchivedNotes,
};
