export default class TicketDTO {
    constructor(ticket){
        this.code = ticket.code,
        this.purchase_datetime =  Date.now(),
        this.amount = ticket.amount
        this.purcheaser = ticket.purcheaser
    }
}