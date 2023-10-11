const express = require('express');
const path = require('path');
const app = express();


const mainRouter = require('./routes/mainRouter')
const userRouter = require('./routes/userRouter')

app.use(express.static('public'));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.listen(3000, () =>{
    console.log("Servidor corriendo en el puerto 3000")
})

app.use('/', mainRouter)

app.use('/user', userRouter)


