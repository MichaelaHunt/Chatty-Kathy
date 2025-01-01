import { Router } from 'express';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController.js';


const router = Router();
// api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// api/users/:userId
router.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

export { router as userRouter };