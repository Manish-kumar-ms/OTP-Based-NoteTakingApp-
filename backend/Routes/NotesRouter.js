import express from 'express'
import { createNote, deleteNote, getAllNotes } from '../Controller/NotesController.js';
import { ensureAuthenticated } from '../Middleware/auth.js';


const router=express.Router();

router.post('/createNotes',ensureAuthenticated,createNote);
router.delete('/deleteNotes/:id',ensureAuthenticated,deleteNote);
router.get('/getAllNotes',ensureAuthenticated,getAllNotes);

export default router;