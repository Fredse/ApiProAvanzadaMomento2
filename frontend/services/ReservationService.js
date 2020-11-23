//es una clase que contiene metodos que se puede reutilizar//

class ReservationService{
    constructor(){//se ejecuta cuando instanciamos la clase
        this.URI = '/api/reservations';//donde se encuentra la api
    }

    async getReservations(){//obtiene todas las reservaciones
        const response = await fetch(this.URI);
        const reservation = await response.json();
        return reservation;
    }

    async postReservations(reservation){//guarda las reservaciones
        const response = await fetch(this.URI, {
            method: 'POST',
            body: reservation
        });
        const data = await response.json();
        console.log(data);
    }

    async deleteReservations(reservationId){//elimina la reservacion segun el id
        const res = await fetch(`${this.URI}/${reservationId}` , {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        const data = await res.json()
        console.log(data);
    }
}

export default ReservationService;