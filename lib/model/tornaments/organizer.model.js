import mongoose from "mongoose"

const organizersSchema = new mongoose.Schema({
    _id:{
        type:Number
    },
	orgName:{
        type: String,
        required: true
    },
	orgEmail:{
        type: String,
        required: true
    },
	description:{
        type: String,
        required: true
    },
	bannerPhoto:{

    },
	faActivated:{
        type: String,
        required: true
    },
	createdAt:{
        timestamps:true
    },
	socials:{
        type: String,
        required:true
    },
	members:{
        type: String,
        required: true
    },
	eventsCreated:[]
})

export const Organizer = mongoose.model("Organizer", organizersSchema)