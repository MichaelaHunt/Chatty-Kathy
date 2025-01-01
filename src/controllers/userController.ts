import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

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
    const { updatedUser } = req.body;
    try {
        const user = await User.findOneAndUpdate({_id: req.params.userId}, {$set: updatedUser}, {new: true});
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
    try {
        const user = await User.findOneAndDelete({_id: req.params.userId});
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

export const addFriend = async (req: Request, res: Response) => {
    //I'm going to make this so that it is one way since it wasn't specified if it should be both ways like in most social media today
    const { userId, friendId } = req.params;
    try {
        const user = await User.findOneAndUpdate({_id: userId}, {$addToSet: { friends: friendId }}, {new: true});
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Could not update: No user with this id!' });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const removeFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;
    try {
         const user = await User.findOneAndUpdate({_id: userId}, {$pull: {friends: friendId}}, {new: true});
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({message: 'No user with that ID!'});
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}