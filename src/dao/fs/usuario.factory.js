import config from '../../config/config.js'
import User from '../clases/usuario.dao.js';

switch (config.persistence) {
    case "MONGO":
        const UserMongo = require ('../clases/usuario.dao.js')
        User = new UserMongo ();
        break;
    case "MEMORY":
        const UserMemory= require('../memory/usuario.memory.js');
        User = new UserMemory;
        break;
}

export default User;