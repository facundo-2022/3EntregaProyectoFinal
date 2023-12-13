import mongoose from "mongoose";


const ticketCollection = 'ticket'

const ticketSchema = new mongoose.Schema({
    code:{type: String, required: true},
    purchease_datatime: {type: String },
    amount: {type: Number, required: true},
    purcheaser:{type: String}
})

const ticketModel = mongoose.model(ticketCollection, ticketSchema)


export default ticketModel