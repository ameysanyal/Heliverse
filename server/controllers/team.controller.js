import User from '../models/user.model.js'
import Team from '../models/team.model.js'

export const createTeam = async (req, res) => {
    try {
        const { users } = req.body; // Array of user IDs to form the team

        // Fetch users by IDs
        const teamUsers = await User.find({
            _id: { $in: users },
            available: true,
        });

        // Ensure all domains are unique
        const uniqueDomains = new Set(teamUsers.map(user => user.domain));
        if (uniqueDomains.size !== teamUsers.length) {
            return res.status(400).json({ message: 'Each user in the team must have a unique domain' });
        }

        // Create the team
        const team = new Team({ users: teamUsers.map(user => user._id) });
        await team.save();

        res.status(201).json({ message: 'Team created successfully', team });
    } catch (error) {
        res.status(500).json({ message: 'Error creating team', error });
    }
}

export const getTeam = async (req, res) => {
    try {
        const { urlId } = req.params;

        // Fetch team by ID
        const team = await Team.findById(urlId).populate('users');
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving team', error });
    }
}

export const deleteTeam = async (req, res) => {
    try {
        const { urlId } = req.params;
        const result = await User.findByIdAndDelete(urlId);

        if (!result) {
            return res.status(404).json({ message: "Team not found" });
        }
        return res.status(200).json({ message: 'Team deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting Team', error });
    }
}

export const deleteAllTeams = async (req, res) => {
    try {

        const result = await Team.deleteMany({})
        if (!result) {
            return res.status(400).json({ message: "Team not Found" })
        }
        return res.status(200).send({ message: "All Teams Deleted successfully" })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
}

export const getAllTeams = async (req, res) => {
    try {

        const allteam = await Team.find({}).populate('users');
        if (!allteam) {
            return res.status(404).json({ message: 'No team found' });
        }

        res.status(200).json(allteam);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving team', error });
    }
}

