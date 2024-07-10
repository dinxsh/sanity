import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log('already connected to database')
        return
    }

    try{
        const db = await mongoose.connect(process.env.MONGODB_URL || '')

        connection.isConnected = db.connections[0].readyState

        console.log("DB Connected successfully")
    }
    catch(error){
        console.log("Database connection failed: ", error)
    }
}

export default dbConnect;