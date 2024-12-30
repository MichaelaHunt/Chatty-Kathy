import { Router } from 'express';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../../controllers/userController';


const router = Router();
// api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser)

// api/users/:userId
router.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

export { router as userRouter };