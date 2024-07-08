import mongoose from 'mongoose';


const tournamentSchema = new mongoose.Schema({
        tournamentName:{
            type: String,
            required: true
        },
        tournamentDates: {
            created:{type:Date},
            started:{type:Date},
            ended:{type:Date}
        },
        schedules:{
            type:String,
            required: true
        },
        organizerID:{
            type: String,
            required: true
        },
        gameType:{
            type: String,
            required: true
        }, // enum : [Squad, Solo, Duo]
        gameId:{
            type: number,
            required: true
        }, // Will take to 
        links:{
            type: String,
            required: true
        }, // Share, Upvote
        gameBannerPhoto:{
            type: String,
            required: true
        },
        results:[{
             type: String,
            required: true
        }],
        teamsRegistered:[
            {
                id:{},
                name:{},
                members:[] // ex list of uids registered
            }
        ],
        rounds:[{
            type: String,
            required: true
        }],
        teamSize:{
            type: String,
            required: true
        },
        prize:[{
            type: number,
            required:true
        }],
        howtoX:[
        ],
        rules:{
            type: String,
            required: true
        },
        slots:{
            type:number
        },
        email:{
            type: String,
            required: true
        },
        registeredNumber:{
            type:number
        }

})

export const Tournament = mongoose.model("Tournament", tournamentSchema)