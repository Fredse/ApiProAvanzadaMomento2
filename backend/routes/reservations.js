//para definir las rutas del servidor//
const {Router, response} = require('express');
const router = Router();
const {unlink} = require('fs-extra');
const path = require('path');

const Reservation = require('../models/Reservation')

//esta ruta accede a la pagina principal para que el cliente pueda entrar en formato json como objeto//
router.get('/', async (req, res) => {
    const reservation = await Reservation.find()//consulta todas las reservaciones guardadas para devolerlas
    res.json(reservation);//se devuelven todos los datos a la api//
});

router.post('/', async(req, res) => {
    const {client_name, client_lastname, client_phone, init_reserv, finish_reserv, number_person, type} = (req.body);
    const imagePath = '/uploads/' + req.file.filename;
    const newReservation = new Reservation({client_name,client_lastname, client_phone,init_reserv,finish_reserv, number_person, type, imagePath});
    await newReservation.save()//guarda de manera asincrona//
    res.json({message: 'Reservacion Guardada'});//responde al mensaje cuando es guardado//
});

router.delete('/:id', async (req, res) => {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);//elimina el id guardado con todos los datos//
    unlink(path.resolve('./backend/public/' + reservation.imagePath));//elimina las imagenes de uploads
    res.json({message: "Reserva eliminada"})//lanza el mensaje al ser eliminado//
});

//exporta la ruta para poder ser ejecutada
module.exports = router;