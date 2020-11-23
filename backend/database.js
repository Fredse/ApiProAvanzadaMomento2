//conectar a la base datos con mongo db//
const mongoose = require('mongoose');

//requerir la variable de entorno con la direccion de la base de datos//
console.log(process.env.MONGODB_URI);

//accede a la aplicacion y crea una base de datos con el nombre hotel y permite la conexion//
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
    .then(db => console.log('db is conected'))//evento satisfactorio
    .catch(err => console.error(err))//error//