import ticket from '../dao/clases/ticket.dao.js'

const ticketService = new ticket()

  export const getAllTickets = async (req, res) => {
   
      let tickets = await ticketService.getAllTickets();
      res.send({status: "success", result: tickets})
     /*  res.status(500).json({ error: error.message }); */
    
  }

 export const getTicketById = async (req, res) =>{
      let result = await ticketService.getTicketById(ticketId);
      res.send({status: "success", result: result})
    }

export const  createTicket = async (req, res) =>{
    const ticket = req.body
    let result = await ticketService.createTicket(ticket)
    res.send({status: "success", result: result})
 
  }

   
 export const deleteTicket = async(req, res) => {
    const { ticketId } = req.params;

    let result = await ticketService.deleteTicket(ticketId);
    res.send({status: "success", result: result})
}



