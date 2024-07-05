import mongoose from 'mongoose';


const tournamentSchema = new mongoose.Schema({
        _id:{
            type:number
        },
        tournamentName:{
            type: String,
            required: true
        },
        tournamentDates: {
            created:{type:Date},
            started:{type:Date},
            ended:{type:Date}
        },
        schedules:{},
        organizerID:{},
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
        gameBannerPhoto:{},
        results:[],
        teamsRegistered:[
            {
                id:{},
                name:{},
                members:[] // ex list of uids registered
            }
        ],
        rounds:[],
        teamSize:{
            type: String,
            required: true
        },
        prize:[],
        howtoX:[],
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