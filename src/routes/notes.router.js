import { Router } from 'express';
import * as noteContoller from '../controllers/notes.controller.js';
import { isAuth } from '../middlewares/middlewares.js';
const router = Router();

router.post('/', isAuth, noteContoller.createNote);

router.get('/', isAuth, noteContoller.getNotes);

router.get('/find/:nid', isAuth, noteContoller.getNoteById);

router.put('/:nid', isAuth, noteContoller.updateNote);

router.delete('/:nid', isAuth, noteContoller.deleteNote);

router.post('/:nid', isAuth, noteContoller.toggleArchivedStatus);

router.get('/active', isAuth, noteContoller.getActiveNotes);

router.get('/archived', isAuth, noteContoller.getArchivedNotes);

export default router;
