import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// const TeamNameSchema = new Schema({
//     team: { type: String },
// });
// const TeamNameModel = mongoose.model('teamname',TeamNameSchema);

const TeamDataSchema = new Schema({
    team: { type: String },
    time: [{ type: String }]
});
const TeamDataModel = mongoose.model('teamdata',TeamDataSchema);

const MatchSchema = new Schema({
    matchName: { type: String },
    time: { type: String }
});
const MatchModel = mongoose.model('match',MatchSchema);

export { /*TeamNameModel,*/ TeamDataModel, MatchModel };