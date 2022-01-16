// createTeam(name: String!): Team!
// deleteTeam(name: String!): Team!
// updateTime(name: String!, time: [String!]!): Team!
// createMatch: [Match!]

import moment from "moment"

const Mutation = {

    async updateAdminData(parent, args, { db, pubsub }, info){
        const admindata = await db.AdminDataModel.findOne({admin: "Admin"});
        if(admindata) {
            const existing = await db.AdminDataModel.findOneAndUpdate({admin: "Admin"}, {isRegisterClosed: !(admindata.isRegisterClosed)}, {new: true});

            pubsub.publish('adminData', {
                adminData: existing,
            });
            return existing;
        }else if(!admindata) {
            const newAdmindata = new db.AdminDataModel({admin: "Admin", isRegisterClosed: false});
            newAdmindata.save();
            pubsub.publish('adminData', {
                adminData: newAdmindata,
            });
            return newAdmindata;
        }
    },

    async createTeam(parent, { name }, { db, pubsub }, info){
        if(!name) throw new Error("Missing team name in mutation createTeam");
        const existing = await db.TeamDataModel.findOne({team: name});
        if(existing) return existing;
        else if(!existing){
            const teamdata = new db.TeamDataModel({team: name});
            teamdata.save();
            pubsub.publish(`createTeam`, {
                createTeam: teamdata,
            });
            return teamdata;
        }
    },

    async deleteTeam(parent, { name }, { db, pubsub }, info){
        if(!name) throw new Error("Missing team name in mutation deleteTeam");
        const existing = await db.TeamDataModel.findOne({team: name});

        if(existing) {
            pubsub.publish(`deleteTeam`, {
                deleteTeam: existing,
            });

            const matchFound = await db.MatchModel.find({$or: [{team_1: name}, {team_2: name}]});
            const n = matchFound.length;
            for(let i = 0; i < n; i++){
                const matchToDelete = matchFound[i];
                await db.MatchModel.deleteOne(matchToDelete);
                pubsub.publish('allMatch', {
                    allMatch: {
                        mutation: "DELETED",
                        match: matchToDelete,
                    },
                });
                pubsub.publish(`team ${matchToDelete.team_1} match`, {
                    teamMatch: {
                        mutation: "DELETED",
                        match: matchToDelete,
                    },
                });
                pubsub.publish(`team ${matchToDelete.team_2} match`, {
                    teamMatch: {
                        mutation: "DELETED",
                        match: matchToDelete,
                    },
                });
            }

            await db.TeamDataModel.deleteOne({team: name});
            return true;
        }else return false;
    },

    async updateTime(parent, { name, time }, { db, pubsub }, info){
        console.log(name,time);
        const existing = await db.TeamDataModel.findOneAndUpdate({team: name}, {time: time}, {new: true});
        
        pubsub.publish(`team ${name}`, {
            time: time,
        });

        pubsub.publish(`allTeamTime`, {
            allTeamTime: {
                team: name,
                time: time,
            }
        });
        return existing;
    },

    async createMatch(parent, args, { db, pubsub }, info){
        var allMatchList = []
        var matchedTime = []
        var matchedNameList = []
        const currentTime = moment();
        //save all User by the ascending order of the amount of register time
        var allUser = []
        const allTeam = await db.TeamDataModel.find()
        allTeam.forEach((item) => {
            allUser.push(item)
        });
        
        allUser.sort((a,b) => a.time.length - b.time.length)
        allUser.forEach((teamData) => {
            //for user in ascTimeUserArray: teamA
            teamData.time.forEach((t1) => {
                
                // 處理 moment 抓下來的日期組合成數字
                let year = currentTime.year(), month = currentTime.month() + 1, day = currentTime.date();
                let currentDateNum = year*10000 + month*100 + day;
                // console.log(currentDateNum);   
                //t1拿出來的是字串,切割字串
                // console.log(t1);
                let t1Str = "" 
                t1.split("/").map((e, index) => {
                    if(index === 1 && e.length < 2){
                        t1Str += '0'
                    }else if(index === 2 && e.length < 2){
                        t1Str += '0'
                    }t1Str += e
                })
                let t1Num = parseInt(t1Str)
                // console.log(t1Str);
                // console.log(t1Num);
                //check the date is not in matchedTime and the date is later than the date(continue)
                if(t1Num >= currentDateNum){
                    allUser.forEach(async (teamData2) => {
                        if(teamData2.team !== teamData.team){
                            const matchNameNow = [teamData.team,teamData2.team].sort().join('_');
                            const matchFound = await db.MatchModel.findOne({matchName: matchNameNow});
                            //if db 沒有 "a_b"match
                            if(!matchFound && !matchedNameList.some((e) => e === matchNameNow)){
                                teamData2.time.forEach(async(t2) => {
                                    if(t1 === t2){
                                        //console.log(t1Num,t2Num);
                                        const timeFound = await db.MatchModel.findOne({time: t1});
                                        const matchFound = await db.MatchModel.findOne({matchName: matchNameNow});
                                        if(!timeFound && !matchedTime.some((e) => e === t1) && !matchFound && !matchedNameList.some((e) => e === matchNameNow)){
                                            console.log(`Save match ${matchNameNow}, date:${t1} to db`);
                                            //存入"a_b"match(t1,t2)
                                            const matchdata = new db.MatchModel({
                                                matchName: matchNameNow,
                                                team_1: teamData.team,
                                                team_2: teamData2.team,
                                                time: t1,
                                            });
                                            // console.log(matchdata);
                                            matchdata.save();
                                            pubsub.publish('allMatch', {
                                                allMatch: {
                                                    mutation: "CREATED",
                                                    match: matchdata,
                                                },
                                            });
                                            pubsub.publish(`team ${teamData.team} match`, {
                                                teamMatch: {
                                                    mutation: "CREATED",
                                                    match: matchdata,
                                                },
                                            });
                                            pubsub.publish(`team ${teamData2.team} match`, {
                                                teamMatch: {
                                                    mutation: "CREATED",
                                                    match: matchdata,
                                                },
                                            });
                                            matchedTime.push(t1);
                                            matchedNameList.push(matchNameNow);
                                            // console.log(matchedTime);
                                            allMatchList.push(matchdata);
                                            // console.log(allMatchList);
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            })
        });
        return allMatchList;
    },
}

export default Mutation;