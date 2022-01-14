// createTeam(name: String!): Team!
// deleteTeam(name: String!): Team!
// updateTime(name: String!, time: [String!]!): Team!
// createMatch: [Match!]

import moment from "moment"

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

    async createMatch(parent, args, { db, pubsub }, info){
        var matchedTime = []
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
                let currentDateNum = year*1000 + month*100 + day;
                // console.log(currentDateNum);   
                //t1拿出來的是字串,切割字串
                // console.log(t1);
                let t1Str = "" 
                t1.split("/").map((e) => t1Str += e)
                let t1Num = parseInt(t1Str)
                // console.log(t1Str);
                // console.log(t1Num);
                //check the date is not in matchedTime and the date is later than the date(continue)
                if(t1Num >= currentDateNum){
                    allUser.forEach((teamData2)=>{
                        if(teamData2.team !== teamData.team){
                            teamData2.time.forEach(async(t2) => {
                                //字元切割
                                let t2Str = "" 
                                t2.split("/").map((e) => t2Str += e)
                                let t2Num = parseInt(t2Str)
                                // console.log(t2Str);
                                if(t1Num === t2Num){
                                    //console.log(t1Num,t2Num);
                                    //console.log(`Save match ${teamData.team}_${teamData2.team} to db`);
                                    //if db 沒有 "a_b"match
                                    let teamArr = [teamData.team,teamData2.team];
                                    teamArr.sort();
                                    if(!await db.MatchModel.findOne({matchName: `${teamArr[0]}_${teamArr[1]}`})){
                                        if(!matchedTime.some((e) => e === t1)){
                                            console.log(`Save match ${teamArr[0]}_${teamArr[1]}, date:${t1} to db`);
                                            //存入"a_b"match(t1,t2)
                                            const matchdata = new db.MatchModel({matchName: `${teamArr[0]}_${teamArr[1]}`,time: t1});
                                            // console.log(matchdata);
                                            matchdata.save();
                                            matchedTime.push(t1);
                                            // console.log(matchedTime);
                                            return matchdata;
                                        }
                                    }
                                }
                            })
                        }
                    })
                }
            })
        });
            //for registered date in user time: teamA.time
                
            
                //check the date is not in matchedTime and the date is later than the date(continue)

            //for other user:teamB

                //if teamA.time == teamB.time

                    //db操作
                    //if db doesn't have teamA-teamB match 存入 
            //
    }
}

export default Mutation;