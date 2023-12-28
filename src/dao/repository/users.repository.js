import UserDTO from '../DTO/usuario.DTO.js'

export default class UserRepository {
    constructor(dao){
        this.dao = dao
    }
    getUsers = async () => {
        let result = await this.dao.getUser()
        return result
    }
    createUser = async (user) => {
        let userToInsert = new UserDTO(user)
        let result = await this.dao.createUser(userToInsert)
        return result
    }
}