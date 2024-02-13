// import * as noteManager from '../dao/managers/notes.mongo.manager.js';
import * as noteManager from '../dao/managers/notes.prisma.manager.js';

const createNote = async (note, user) => {
  if (!note.title) throw new Error('Incomplete values');
  const newNote = {
    title: note.title,
    content: note.content,
    userId: user.id,
  };
  const result = await noteManager.create(newNote);
  return result;
};

const getNotes = async (uid) => {
  const notes = await noteManager.getAll(uid);
  return notes;
};

const getNoteById = async (nid) => {
  const note = await noteManager.getById(nid);
  if (!note) throw new Error('Note not found');
  return note;
};

const updateNote = async (nid, newNote) => {
  const note = await noteManager.getById(nid);
  const updatedNote = { ...note, ...newNote };
  const result = await noteManager.update(updatedNote);
  return result;
};

const deleteNote = async (nid) => {
  const note = await getNoteById(nid);
  const result = await noteManager.deleteById(note.id);
  return result;
};

const toggleArchivedStatus = async (nid) => {
  const note = await getNoteById(nid);
  note.archived = !note.archived;
  const result = await noteManager.update(note);
  return result;
};

const getActiveNotes = async (user) => {
  const userId = user.id;
  const archived = { archived: false };
  const notes = await noteManager.getAll(userId, archived);
  return notes;
};

const getArchivedNotes = async (user) => {
  const userId = user.id;
  const archived = { archived: true };
  const notes = await noteManager.getAll(userId, archived);
  return notes;
};

export {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  toggleArchivedStatus,
  getActiveNotes,
  getArchivedNotes,
};
