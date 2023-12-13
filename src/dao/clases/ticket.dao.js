import ticketModel from "../models/ticket.model.js";

export default class ticket{
  
/*   async getAllTickets(req, res) {
    try {
      const tickets = await ticketModel.getAllTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTicketById(req, res) {
    const { ticketId } = req.params;
    try {
      const ticket = await ticket.getTicketById(ticketId);
      if (ticket) {
        res.json(ticket);
      } else {
        res.status(404).json({ message: 'Ticket no existe' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
 */
  async createTicket(code, purchease_datatime, amount, purchease) {
  
    try {
      const newTicket = await ticketModel.create({ code, purchease_datatime, amount, purchease });
      return newTicket
    } catch (error) {
      console.log(error)
      return null
     
    }
  }


  /* async deleteTicket(req, res) {
    const { ticketId } = req.params;

    try {
      const deletedTicket = await ticket.deleteTicket(ticketId);
      if (deletedTicket) {
        res.json({ message: 'Ticket eliminado correctamente' });
      } else {
        res.status(404).json({ message: 'Ticket no existe' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }





 */
}