//est variable inicializa express//
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();//SOLO PARA DESARROLLO//
}
console.log(process.env.NODE_ENV);
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');


//initializations//
const app = express();
require('./database')//para conectar la base de datos//


//settings//
//esto configura el servidor en el puerto 3000//
app.set('port', process.env.PORT || 3001);

//middlewares//
app.use(morgan('dev'));
//configura la imagen para subirla con un numero aleatorio concatenando la extension y la ruta donde se guarda con la libreria multer//
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));

//convierte los datos del formulario en un formato json//
app.use(express.urlencoded({extends: false}));
app.use(express.json());
app.use(cors());//permite acceder al servidor de prueba//

//ROUTES//
//me permite acceder a las rutas de la aplication como por ejemplo la api//
app.use('/api/reservations',require('./routes/reservations'));

//STATIC FILES//
//permite acceder a la carpeta publica para mostrarle la pagina al cliente//
app.use(express.static(path.join(__dirname, 'public')));

//start server//
//este inicializa el servidor//
app.listen(app.get('port'), ()=> {
    console.log('servidor en el puerto', app.get('port'));
})