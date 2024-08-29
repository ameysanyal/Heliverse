import User from '../models/user.model.js'

export const createUser = async (req, res) => {

    let { avatar } = req.body
    if (!avatar) {
        avatar = "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
    }
    try {
        const { first_name, last_name, email, gender, domain, available } = req.body;

        if (!first_name || !last_name || !email || !gender || !domain) {
            return res.status(400).send({
                message: 'Send all the required fields',
            });
        }


        // Fetch the user with the highest id
        const lastUser = await User.findOne().sort({ id: -1 });

        // Determine the new id by incrementing the highest id found
        const newId = lastUser ? lastUser.id + 1 : 1;

        const newUser = { id: newId, first_name, last_name, email, gender, avatar, domain, available };
        console.log(newUser)
        const user = await User.create(newUser);
        return res.status(201).json({
            msg: "User Created Sucessfully",
            userId: user._id.toString(),
        });
    }
    catch (error) {
        console.log(`post request in erro backend`);
        return res.status(500).json({ message: error.message });
    }
}


export const getUsers = async (req, res) => {

    try {
        const { domain, gender, available, search, page = 1, limit = 20 } = req.query;

        // Build query object based on filters
        let query = {};
        if (domain) query.domain = domain;
        if (gender) query.gender = gender;
        if (available !== '') query.available = available === 'true';

        // Add search logic
        if (search) {
            // Create a regular expression for the search term (case-insensitive)
            const searchRegex = new RegExp(search, 'i');

            // Build the query to search for first_name or last_name
            query.$or = [
                { first_name: searchRegex },
                { last_name: searchRegex },
            ];
        }

        console.log('Query:', query);
        // Get total number of users matching the query (for pagination)
        const totalUsers = await User.countDocuments(query);

        let skip;
        // Pagination logic
        if (totalUsers > 20) {
            skip = (page - 1) * limit;
        }
        else {
            skip = 0
        }

        console.log(skip)
        const users = await User.find(query).sort({ id: 1 }).skip(skip).limit(parseInt(limit));

        res.status(200).json({
            total: totalUsers,
            page: parseInt(page),
            pages: Math.ceil(totalUsers / limit),
            users,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

export const getUserdetails = async (req, res) => {
    try {
        const { urlId } = req.params;
        const user = await User.findById(urlId)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { first_name, last_name, email, gender, avatar, domain, available } = req.body;

        const newData = {
            first_name,
            last_name,
            email,
            gender,
            avatar,
            domain,
            available
        }

        if (!first_name || !last_name || !email || !gender || !domain) {
            return res.status(400).json({
                message: 'Send all the required fields',
            });
        }

        const { urlId } = req.params;

        const result = await User.findByIdAndUpdate(urlId, newData);
        if (!result) {
            return response.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: 'User updated successfully', user: req.body });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { urlId } = req.params;
        const result = await User.findByIdAndDelete(urlId)

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: 'User deleted successfully' })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
}



