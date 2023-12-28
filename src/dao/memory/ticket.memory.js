
const fs = new Contenedor () 

export default class Ticket {
    constructor() {
        this.data = []
    }
    
    getTicket = async () => {
        return fs.getAll()
    }

    getTicketById = async (tid) => {
        return fs.getById(tid)
    }

    createTicket = async (ticket) => {
        fs(ticket)
    }

    deleteTicket = async (tid) => {
        fs.deleteById(tid)
    }
    
    updateTicket = async (tid) => {
        fs.updateObject(tid)
    }
}