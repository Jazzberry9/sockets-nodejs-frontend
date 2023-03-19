const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnEnviar = document.querySelector('button');

const socket = io();


socket.on('connect', () => {
    // console.log('Conectado');
    btnEnviar.disabled = false;
});
socket.on('ultimo-ticket', (ultimo) => {
    // console.log('Conectado');
    lblNuevoTicket.innerHTML = `ticket ${ultimo}`
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnEnviar.disabled = true;
});

btnEnviar.addEventListener( 'click', () => {
    
    socket.emit( 'siguienteps', null, ( tickete ) => {
        lblNuevoTicket.innerHTML = tickete
    });

});