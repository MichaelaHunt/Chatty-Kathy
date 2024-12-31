import { Router } from 'express';
import { addReaction, createThought, deleteThought, getAllThoughts, getThoughtById, removeReaction, updateThought } from '../../controllers/thoughtController';

const router = Router();

// api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions/:reactionId')
    .post(addReaction)
    .delete(removeReaction);

export { router as thoughtRouter };