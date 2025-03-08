import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",   
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text:{
            type: String,
        },
        image:{
            type:String
        },
    },
    {
        timestamps: true
    }
);

 const Message = mongoose.model("Message", messageSchema);

 export default Message;

// Uses mongoose.Schema.Types.ObjectId because it references a User in the database.
// The ref: "User" means that senderId and receiverId reference the User collection.
// Creates a Mongoose model named "Message", based on the messageSchema.
// This model will be used to create, read, update, and delete messages in the database.
