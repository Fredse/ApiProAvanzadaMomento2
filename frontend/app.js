import './styles/app.css';
import './styles/bootstrap.min.css';

import UI from './UI';//que tiene los metodos del crud//

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderReservations();
});

//captura el evento de guardado del boton//
document.getElementById("reservation-form")
    .addEventListener('submit',  e => {//funcion flecha que recoge los datos a guardar
        const name = document.getElementById('client_name').value;
        const lastname = document.getElementById('client_lastname').value;
        const phone = document.getElementById('client_phone').value;
        const init = document.getElementById('init_reserv').value;
        const finish = document.getElementById('finish_reserv').value;
        const number = document.getElementById('number_person').value;
        const type = document.getElementById('type').value;
        const image = document.getElementById('image').files;
        
        const formData = new FormData();//crea el formulario virtual para guardarlo//
        formData.append('image', image[0]);
        formData.append('client_name', name);
        formData.append('client_lastname', lastname);
        formData.append('client_phone', phone);
        formData.append('init_reserv', init);
        formData.append('finish_reserv', finish);
        formData.append('number_person', number);
        formData.append('type', type);

        const ui = new UI();       //accede a la ui para guardar el libro// 
        ui.addNewReservation(formData);//agrega los datos ordenadamente//
        ui.renderMessage('Nueva reservacion Agregada','success', 3000);
        e.preventDefault();
    });

document.getElementById('reservations-cards')
    .addEventListener('click', e => {
        if(e.target.classList.contains('delete')){//detecta el elemento con la clase delete para eliminar
            const ui = new UI();
            ui.deleteReservation(e.target.getAttribute('_id'));
            ui.renderMessage('Reservacion Eliminada','danger', 3000);
        }
        e.preventDefault();
    });
