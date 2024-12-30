import { Request, Response } from 'express';
import User from '../models/User';
import Thought from '../models/Thought';

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { user } = req.body;
    try {
        const newUser = await User.create({user});
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params.userId;
    const { updatedUser } = req.body;
    try {
        const user = await User.findOneAndUpdate({_id: id}, {$set: updatedUser}, {new: true});
        //do I want to runValidators?
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Could not update: No user with this id!' });
        }
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params.userId;
    try {
        const user = await User.findOneAndDelete({_id: id});
        if (user) {
            await Thought.deleteMany({_id: { $in: user.thoughts }});//Bonus here!
            res.json({ message: 'User and thoughts deleted!' });
        } else {
            res.status(404).json({message: 'No user with that ID!'});
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}