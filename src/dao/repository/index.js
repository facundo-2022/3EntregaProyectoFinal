import Products from '../factory/product.factory.js'
import ProductRepository from './products.repository.js'
import Users from  '../factory/user.factory.js'
import UsersRepository from './users.repository.js'
import Carts from  '../factory/cart.factory.js'
import CartsRepository from './carts.repository.js'
import Tickets from '../factory/ticket.factory.js'
import TicketsRepository from'./tickets.repository.js'


const productsService = new ProductRepository(new Products())
const userService = new UsersRepository(new Users())
const cartService = new CartsRepository (new Carts())
const ticketService = new TicketsRepository (new Tickets())

export default {productsService, userService, cartService, ticketService}