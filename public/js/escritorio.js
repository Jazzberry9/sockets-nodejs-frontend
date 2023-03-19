//  referencias html
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

// obteniendo los params de la busqueda
const urlParams = new URLSearchParams( window.location.search);

if ( !urlParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es oglibatio, perro');
}

const desk = urlParams.get('escritorio');
lblEscritorio.innerHTML = desk;
divAlerta.style.display = 'none';

const socket = io();


socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});

socket.on('tickets-pendientes', (payload) =>{
    lblPendientes.innerHTML = payload;
})

btnAtender.addEventListener( 'click', () => {
    
    socket.emit( 'atendiendo-ticket', {desk}, ({ ok, msg, ticketete }) => {
        
        if (!ok){
            lblTicket.innerHTML = `Nadie, no hay mas tickets`;
            return divAlerta.style.display = '';
        }

        lblTicket.innerHTML = `ticket ${ticketete.numero}`;
    });

});