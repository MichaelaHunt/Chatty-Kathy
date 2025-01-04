import { Router } from 'express';
import { addReaction, createThought, deleteAllThoughts, deleteThought, getAllThoughts, getThoughtById, removeReaction, updateThought } from '../../controllers/thoughtController.js';

const router = Router();

// api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought)
    .delete(deleteAllThoughts);

// api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions/')
    .post(addReaction)

// api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

export { router as thoughtRouter };