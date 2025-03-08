import cloudinary from '../lib/cloudinary.js';
import { getReceiverSocketId, io } from '../lib/socket.js';
import Message from '../models/message.model.js';
import User from "../models/user.model.js";


export const getUsersForSidebar = async(req, res) => {

    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        res.status(200).json(filteredUser);

    } catch (error) {
        console.error("Error in getUsersForSidebar: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
};

// For Chat box and History of Chats
export const getMessages = async(req, res) => {

    try {
        const { id:userToChatId } = req.params
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
        
    }

}

export const sendMessage = async (req, res) => {

    try {
        const { text, image} = req.body;
        const {id: receiverId } = req.params;
        const senderId = req.user._id;

        // Checking if user sends an Image
        let imageUrl;
        if (image) {
            // Upload based images to Cloudinary
            const uploadResponse = await cloudinary.uploader.upload( image);
            imageUrl = uploadResponse.secure_url;
            // console.log("Image URL:", imageUrl)
        }

        // console.log("Saving to MongoDB:", { senderId, receiverId, text, imageUrl }); // Testing Purpose

        const newMessage = new Message ({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });  

        // Saving it to dataBase 
        await newMessage.save();

        // todo: realtime functionality goes here => socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }


        //send a response back
        res.status(201).json(newMessage);

    } catch (error) {

        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error: " Internal server error"});
        
    }
};