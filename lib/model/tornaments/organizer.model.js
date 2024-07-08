import mongoose from "mongoose"
import { type } from "os"

const organizersSchema = new mongoose.Schema({
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
        type: String,
        required: true
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
	eventsCreated:[{type: mongoose.Schema.ObjectId, ref:'Tornament'}]
})

export const Organizer = mongoose.model("Organizer", organizersSchema)