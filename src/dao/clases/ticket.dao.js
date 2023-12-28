import ticketModel from "../models/ticket.model.js";

export default class ticket{
  
    getAllTickets = async() => {
    try {
      const tickets = await ticketModel.getAllTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

   getTicketById = async(tid) => {
   
    try {
     const result = await ticketModel.findOne({_id: tid});
      return result;
    } catch (error) {
      console.log(error)
      return null
    }
  }
 
  createTicket = async(code, purchase_datatime, amount, purchase) =>  {
  
    try {
      const newTicket = await ticketModel.create({ code, purchase_datatime, amount, purchase });
      return newTicket
    } catch (error) {
      console.log(error)
      return null
     
    }
  }

  saveTicket= async() => {
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
   deleteTicket = async(tid) => {
    const { ticketId } = req.params;

    try {
      const result = await ticketModel.deleteOne({ _id: tid })
      return result
      }catch (error) {
      console.log(error)
            return null
          }
}
}