import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

export const getAllThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getThoughtById = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({
                message: 'Thought not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const createThought = async(req: Request, res: Response) => {
    try {
        const newThought = await Thought.create(req.body);
        //add to the user's thoughts array next
        await User.findOneAndUpdate({_id: req.body.userId}, {$addToSet: {thoughts: newThought._id}});
        res.json(newThought);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const updateThought = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body}, {new: true});
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({ message: 'Could not update: No thought with this id!' });
        }
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const deleteThought = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});
        if (thought) {
            res.json({message: "Thought deleted!"});
        } else {
            res.status(404).json({message: 'No thought with that ID!'});
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const addReaction = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$addToSet: {reactions: req.body}}, {new: true});
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({message: 'No thought with that ID!'});
        }
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const removeReaction = async(req: Request, res: Response) => {
    const { thoughtId, reactionId } = req.params;
    try {
        const thought = await Thought.findOneAndUpdate({_id: thoughtId}, {$pull: {reactions: {reactionId: reactionId}}}, {new: true});
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({message: 'No thought with that ID!'});
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const deleteAllThoughts = async(_req: Request, res: Response) => {//Added this on my own for presentation purposes. Deletes all reactions and thoughts.
    try {
        await Thought.deleteMany({});
        res.json({message: "All Thoughts deleted!"});
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}