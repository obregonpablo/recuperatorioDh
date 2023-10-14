const path = require('path');

const controller = {
    login: (req, res) => {
        return res.render('login')
    },
    // processLogin: (req, res) =>{

    // },

    register: (req, res) =>{
        return res.render('register')
    }
}


module.exports = controller


