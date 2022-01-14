// teamName(team: String!): Boolean!
// allTeam: [Team!]
// teamTime(team: String!): Team!
// allTime: [Team!]
// teamMatch(team: String!): Match!
// allMatch: [Match!]

const Query = {

    teamName: async (parent, args, { db, pubsub }, info) => {
        const teamdata = await db.TeamDataModel.find();
        return teamdata;
    },

    allTeam: async (parent, args, { db, pubsub }, info) => {
        const teamdata = await db.TeamDataModel.find();
        return teamdata;
    },

    teamTime: async (parent, { team }, { db, pubsub }, info) => {
        if(!team) throw new Error("Missing team name in query teamTime");
        const teamdata = await db.TeamDataModel.findOne({team: team});
        return teamdata;
    },

    timeMatch: async (parent, { time }, { db, pubsub }, info) => {
        const teamdata = await db.TeamDataModel.find({time: time});
        return teamdata;
    },

    teamMatch: async (parent, { team }, { db, pubsub }, info) => {
        if(!team) throw new Error("Missing team name in query teamMatch");
        const matchdata = await db.MatchModel.findOne({team: team});
        return matchdata;
    },

    allMatch: async (parent, args, { db, pubsub }, info) => {
        const matchdata = await db.MatchModel.find();
        // console.log(matchdata);
        return matchdata;
    },
}

export default Query;