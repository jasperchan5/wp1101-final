// createTeam(name: String!): Team!
// deleteTeam(name: String!): Team!
// updateTime(name: String!, time: [String!]!): Team!
// createMatch: [Match!]

const Mutation = {
    async createTeam(parent, { name }, { db, pubsub }, info){
        if(!name) throw new Error("Missing team name in mutation createTeam");
        const existing = await db.TeamDataModel.findOne({team: name});
        if(existing) return existing;
        else if(!existing){
            const teamdata = new db.TeamDataModel({team: name});
            teamdata.save();
            return teamdata;
        }
    },

    async deleteTeam(parent, { name }, { db, pubsub }, info){
        if(!name) throw new Error("Missing team name in mutation deleteTeam");
        const toDelete = await db.TeamDataModel.deleteOne({team: name});
        if(toDelete) return true;
        else return false;
    },

    async updateTime(parent, { name, time }, { db, pubsub }, info){
        console.log(name,time);
        if(!name) throw new Error("Missing team name in mutation updateTime");
        if(!time) throw new Error("Missing team time in mutation updateTime");
        const existing = await db.TeamDataModel.findOneAndUpdate({team: name}, {time: time}, {new: true});
        
        pubsub.publish(`team ${name}`, {
            time: time,
        });
        
        return existing;
    },

    // async createMatch(parent, { name, name2 }, { db, pubsub }, info){

    // }
}

export default Mutation;