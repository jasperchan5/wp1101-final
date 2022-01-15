// teamName(team: String!): Boolean!
// allTeam: [Team!]
// teamTime(team: String!): Team!
// allTime: [Team!]
// teamMatch(team: String!): Match!
// allMatch: [Match!]

const Query = {

    adminData: async (parent, args, { db, pubsub }, info) => {
        const admindata = await db.AdminDataModel.findOne({admin: "Admin"});
        if(admindata) {
            return admindata;
        }else if(!admindata) {
            const newAdmindata = new db.AdminDataModel({admin: "Admin", isRegisterClosed: false});
            newAdmindata.save();
            return newAdmindata;
        }
    },
    
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
    //僅顯示登入者隊伍的對戰組合
    teamMatch: async (parent, { team }, { db, pubsub }, info) => {
        if(!team) throw new Error("Missing team name in query teamMatch");
        const matchdata = await db.MatchModel.find({$or: [{team_1: team}, {team_2: team}]});
        return matchdata;
    },

    allMatch: async (parent, args, { db, pubsub }, info) => {
        const matchdata = await db.MatchModel.find();
        // console.log(matchdata);
        return matchdata;
    },
}

export default Query;