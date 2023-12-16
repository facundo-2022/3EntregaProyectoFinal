import ticketModel from "../models/ticket.model.js";

export default class ticket{
  
   async getAllTickets() {
    try {
      const tickets = await ticketModel.getAllTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTicketById(tid) {
   
    try {
      let result = await ticketModel.getTicketById({_id: tid});
      return result;
    } catch (error) {
      console.log(error)
      return null
    }
  }
 
  async createTicket(code, purchase_datatime, amount, purchase) {
  
    try {
      const newTicket = await ticketModel.create({ code, purchase_datatime, amount, purchase });
      return newTicket
    } catch (error) {
      console.log(error)
      return null
     
    }
  }

  async saveTicket (ticket) {
    try {
        // Crea una nueva instancia de tu modelo de ticket
        const newTicket = new ticketModel({
            code: ticket.code,
            purchase_datetime: ticket.purchase_datetime,
            amount: ticket.amount,
            purchase: ticket.purchase
        });

        // Guarda el nuevo ticket en la base de datos
        const savedTicket = await newTicket.save();

        return savedTicket; // Devuelve el ticket guardado con cualquier información adicional generada por la base de datos
    } catch (error) {
        console.log(error)
        return null 
    }
};
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