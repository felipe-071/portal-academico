const DbConnection = require('../config/DbConnection');

class User {

    findUsers() { //Como o js não espera o retorno padrão e o bd é algo externo a ele, precisa-se criar uma promessa
        return new Promise((resolve, reject) => {
            DbConnection.connection().query("SELECT * FROM usuario", (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }

}

module.exports = new User();