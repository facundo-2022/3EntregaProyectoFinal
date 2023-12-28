import config from '../../config/config.js'
import Ticket from '../clases/ticket.dao.js'


switch (config.persistence) {
    case "MONGO":
        const TicketMongo = require ('../classes/ticket.dao.js')
        Ticket = new TicketMongo ();
        break
    case "MEMORY":
        const TicketMemory= require('../memory/ticket.memory.js');
        Ticket = new TicketMemory;
        break;
}


export default Ticket;