// createTeam(name: String!): Team!
// deleteTeam(name: String!): Team!
// updateTime(name: String!, time: [String!]!): Team!
// createMatch: [Match!]
import moment from "moment";

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
        return existing;
    },
    async createMatch(parent, args, { db, pubsub }, info){
        var matchedTime = []
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
                console.log(t1);
            //for registered date in user time: teamA.time
            //time is array, t in time
                    //未做:t1拿出來的是字串,切割字串
                    //check the date is not in matchedTime and the date is later than the date(continue)
                    if(t1 >= moment().subtract(1,"days") && matchedTime.indexof(t1) === -1){
                        allUser.forEach((teamData2)=>{
                            if(teamData2.team !== teamData.team){
                                teamData2.time.forEach((t2) => {
                                    //未做字元切割

                                        if(t1 === t2){
                                            //if db 沒有 "a_b"match
                                            if(db.MatchModel.findOne({name: `${t1}_${t2}`}) === null){
                                                //存入"a_b"match(t1,t2)
                                                const matchdata = new db.MatchModel({matchName: ${t1}_${t2},time: t1});
                                                matchdata.save();
                                                return true;
                                            }
                                            else return false;
                                        }
                                })
                            }
                        })
                    } 
            })
        });
    }

export default Mutation;



/*
    async createMatch(parent, { db, pubsub }, info){
        var matchedTime = []
        //get date of today
        currentTime = moment()
        //save all User by the ascending order of the amount of register time
        var allUser = []
        db.TeamDataModel.find().forEach((item) => {
            allUser.push(item)
        });
        
        allUser.sort((a,b) => a.time.length - b.time.length)

        allUser.forEach((teamData) => {
            //for user in ascTimeUserArray: teamA
            teamData.forEach((time1) => {
            //for registered date in user time: teamA.time
            //time is array,t in time
                time1.forEach((t1) => {
                    //未做:t1拿出來的是字串,切割字串
                    
                    //check the date is not in matchedTime and the date is later than the date(continue)
                    if(t1 >= moment().subtract(1,"days") && matchedTime.indexof(t1) === -1){
                        allUser.forEach((teamData2)=>{
                            if(teamData2.team !== teamData.team){
                                teamData2.forEach((time2) => {
                                    time2.forEach((t2) =>{
                                    //未做字元切割

                                        if(t1 === t2){
                                            //if db 沒有 "a-b"match
                                                //存入"a-b"match(t1,t2)
                                        }
                                    })
                                })
                            }
                        })
                    }
                })
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
*/



           //for registered date in user time: teamA.time
                
            
                //check the date is not in matchedTime and the date is later than the date(continue)

            //for other user:teamB

                //if teamA.time == teamB.time

                    //db操作
                    //if db doesn't have teamA-teamB match 存入 
            //