import TicketDTO from '../DTO/ticket.DTO.js'

export default class TicketRepository {
    constructor(dao){
        this.dao = dao
    }
    getTickets = async () => {
        let result = await this.dao.getTickets()
        return result
    }
    getTicketById = async (tid) => {
        let result = await this.dao.getTicketById(tid)
        return result
    }
    createTicket = async (ticket) => {
        let ticketInsert = new TicketDTO(ticket)
        let result = await this.dao.createTicket(ticketInsert)
        return result
    }
    updateTicket = async (tid, newTicket) => {
        const result = this.dao.updateTicket(tid, newTicket)
        return result
    }
    deleteTicket = async (tid) => {
        const result = this.dao.deleteTicket(tid)
        return result
    }
}