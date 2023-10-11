const path = require('path');

const controller = {
    home: (req, res)=>{
        return res.render('home')
    }
};


module.exports = controller;

