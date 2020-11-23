const {Schema, model} = require('mongoose');

//genera los datos del modelo a guardar
const ReservationSchema = new Schema({
    client_name: {type: String, required:true},
    client_lastname: {type: String, required: true},
    client_phone: {type: String},
    init_reserv: {type: String, required: true},
    finish_reserv:{type: String, required: true},
    number_person:{type: String, required:true},
    type:{type:String, required: true},
    imagePath: {type: String},
    created_at:{type: Date, default: Date.now}
});

//exporta el squema del modelo para ser utilizaaado en otros lados//
module.exports = model('Reservation', ReservationSchema);