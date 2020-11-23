//manejar el front end (DOM)
import ReservationService from './services/ReservationService';
const reservationService = new ReservationService();

import { format } from 'timeago.js';

class UI{//methodos que interactuen con el navegador//
    async renderReservations(){
        const reservation = await reservationService.getReservations();//obtiene los datos guardados//
        const reservationCardContainer = document.getElementById('reservations-cards');
        reservationCardContainer.innerHTML = '';

        
        reservation.forEach(reservation => {
            //crea el contenedor donde se pintaran los datos//
            const div = document.createElement('div');
            div.className = '';

            div.innerHTML = `
                <div class="card m-2 mt-4"> 
                    <div class="row"> 
                        <div class="col-md-4"> 
                            <img id ="image"src="${reservation.imagePath}" /> 
                            </div> 
                        <div class="col-md-8">"
                            <div class="card-block px-2">
                                <h4>${reservation.client_name}</h4>
                                <h4>${reservation.client_lastname}</h4>
                                <p>Numero de telefono: ${reservation.client_phone}</p>
                                <p>Inicio de reserva: ${reservation.init_reserv}</p>
                                <p>Fin de reserva: ${reservation.finish_reserv}</p>
                                <p>Numero de personas: ${reservation.number_person}</p>
                                <p>Tipo de paquete: ${reservation.type}</p>
                                <a href="#" class="btn btn-danger delete" _id="${reservation._id}">Eliminar</a><br/>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <p>${format(reservation.created_at)}</p>
                    </div>
                </div> 
            `;

            reservationCardContainer.appendChild(div);
            
        });
    }

    async addNewReservation(reservation){
        await reservationService.postReservations(reservation);
        this.clearReservationForm();//accede al metodo del servicio para guardar
        this.renderReservations();
    }

    clearReservationForm(){
        document.getElementById('reservation-form').reset();//resetea el formulario//
    }

    renderMessage(message, colorMessage, secondsToRemove){
        document.createElement('div');
        div.className = `alert alert-${colorMessage} message`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.col-md-4');
        const reservationForm = document.querySelector('#reservation-form');
        container.insertBefore(div, reservationForm);
        setTimeout(() => {
            document.querySelector('.message').remove();
        }, secondsToRemove);
    }

    async deleteReservation(reservationId){
        await reservationService.deleteReservations(reservationId);
        this.renderReservations();
    }
}

export default UI;