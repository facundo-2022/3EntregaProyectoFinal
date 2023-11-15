import ticketModel from "../models/ticket.model.js";

export default class ticket{
  
getAllTickets = async () => {
    try {
      const tickets = await Ticket.find();
      return tickets;
    } catch (error) {
      console.log(error)
      return null
    }
  }

 getTicketById = async(ticketId) => {
    try {
      const ticket = await Ticket.findById(ticketId);
        return ticket;
    } catch (error) {
      console.log(error)
      return null
    }
  }
 createTicket = async(ticketData)=> {
    try {   
        const newTicket = await Ticket.create(ticketData);
        return newTicket;
    } catch (error) {
        console.log(error)
        return null
    }
  }

   updateTicket = async(ticketId, updatedTicketData) =>{
    try {
      const updatedTicket = await Ticket.findByIdAndUpdate(
        ticketId,
        updatedTicketData,
        { 
        ticketId,
        updatedTicketData,
  

        ticketId,
        updat

        ticketId
new: true } // Devuelve el documento actualizado
      );
    return updatedTicket;
    } catch (error) {
        console.log(error)
        return null
    }
  }

  
 
deleteTicket = async(ticketId) => {
    try  {  
    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);
      return deletedTicket;
    } catch (error) {
        console.log(error)
        return null
  }
}


}