import mongoose from 'mongoose';

const ticketCollection = "ticket";

const ticketSchema = new Schema({
  title: String,
  
  code: {
    type: String,
    required: true,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;
