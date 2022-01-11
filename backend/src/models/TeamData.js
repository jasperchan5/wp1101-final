import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TeamNameSchema = new Schema({
    team: { type: String },
});
const TeamName = mongoose.model('teamname',TeamNameSchema);

const TeamDataSchema = new Schema({
    team: { type: String },
    time: { type: String }
});
const TeamData = mongoose.model('teamdata',TeamDataSchema);

const MatchSchema = new Schema({
    team_1: { type: String },
    team_2: { type: String },
    time: { type: String }
});
const Match = mongoose.model('match',MatchSchema);

export { TeamName, TeamData, Match };