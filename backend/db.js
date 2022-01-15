import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AdminDataSchema = new Schema({
    admin: { type: String },
    isRegisterClosed: { type: Boolean },
});
const AdminDataModel = mongoose.model('admindata', AdminDataSchema);

const TeamDataSchema = new Schema({
    team: { type: String },
    time: [{ type: String }]
});
const TeamDataModel = mongoose.model('teamdata',TeamDataSchema);

const MatchSchema = new Schema({
    matchName: { type: String },
    team_1: { type: String },
    team_2: { type: String },
    time: { type: String }
});
const MatchModel = mongoose.model('match',MatchSchema);

export { AdminDataModel, TeamDataModel, MatchModel };