import express from 'express'
import { createTeam, getTeam, deleteTeam, deleteAllTeams, getAllTeams } from '../controllers/team.controller.js'
const router = express.Router();

router.post('/', createTeam)
router.get('/:urlId', getTeam)
router.get('/', getAllTeams)
router.delete('/:urlId', deleteTeam)
router.delete('/', deleteAllTeams)


export default router;

