import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
});

// Middleware to enforce single document in collection
teamSchema.pre('save', async function (next) {
    const existingTeam = await mongoose.models.Team.findOne({});
    if (existingTeam && existingTeam._id.toString() !== this._id.toString()) {
        const error = new Error('A team already exists. Only one team can be created.');
        return next(error);
    }
    next();
});


const Team = mongoose.model('Team', teamSchema);

export default Team


// Schema Definition:

// The users field is an array of ObjectId references to User documents, similar to before.
//     Pre - save Middleware:

// Before saving a document, the middleware checks if there is already a document(existingTeam) in the Team collection.
// If a team already exists, and the _id of the current document does not match the existing one(meaning you're trying to create a new team rather than updating the existing one), it throws an error, preventing the save operation.
// Single Team Enforcement:

//         This effectively limits the collection to a single document, ensuring that only one team can be created in the database.
// This approach is useful when you want to enforce a singleton pattern at the database level, ensuring that only one team exists.