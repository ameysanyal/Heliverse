import express from 'express'
import { createTeam, getTeam, updateTeam } from '../controllers/team.controller.js'
const router = express.Router();

router.post('/', createTeam)
router.get('/:urlId', getTeam)

router.put('/:urlId', updateTeam)
// router.put('/:urlId', updateTeam)

// router.get('/', getAllTeams)
// router.delete('/:urlId', deleteTeam)
// router.delete('/', deleteAllTeams)


export default router;

