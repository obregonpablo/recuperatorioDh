const path = require('path');

const controller = {
    home: (req, res)=>{
        return res.render('home')
    }
};


module.exports = controller;

    // login: (req, res)=>{
    //     res.sendFile(path.resolve('./views/login.html'))
    // },
    // register: (req, res)=>{
    //     res.sendFile(path.resolve('./views/register.html'))
    // }