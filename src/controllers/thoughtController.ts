import { Request, Response } from 'express';
import Thought from '../models/Thought';

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
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById({thoughtId});
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
    const { thought } = req.body;
    try {
        const newThought = await Thought.create({thought});
        res.json(newThought);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const updateThought = async(req: Request, res: Response) => {
    const { newThought } = req.body;
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findOneAndUpdate({_id: thoughtId}, {$set: newThought}, {new: true});
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
    const { thoughtId } = req.params;
    try {
        const { reaction } = req.body;
        const thought = await Thought.findOneAndUpdate({_id: thoughtId}, {$addToSet: {reactions: reaction}}, {new: true});
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
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findOneAndDelete({_id: thoughtId});
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