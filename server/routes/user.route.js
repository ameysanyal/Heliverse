import express from 'express'
import { getUsers, getUserdetails, createUser, updateUser, deleteUser } from '../controllers/user.controller.js'
const router = express.Router();

router.get('/', getUsers)
router.get('/:urlId', getUserdetails)
router.post('/', createUser)
router.put('/:urlId', updateUser)
router.delete('/:urlId', deleteUser)


export default router;

