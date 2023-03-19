const lblTicket1 = document.querySelector('#lblTicket1')
const lblEscritorio1 = document.querySelector('#lblEscritorio1')

const lblTicket2 = document.querySelector('#lblTicket2')
const lblEscritorio2 = document.querySelector('#lblEscritorio2')

const lblTicket3 = document.querySelector('#lblTicket3')
const lblEscritorio3 = document.querySelector('#lblEscritorio3')

const lblTicket4 = document.querySelector('#lblTicket4')
const lblEscritorio4 = document.querySelector('#lblEscritorio4')


const socket = io();

socket.on('estado-actual', payload => {

    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    const [ churrasco1, churrasco2, churrasco3 , churrasco4 ] = payload;

    if( churrasco1 ){
        lblTicket1.innerHTML = 'ticket ' + churrasco1.numero
        lblEscritorio1.innerHTML = 'Escritorio ' + churrasco1.escritorio
    }
    if (churrasco2){    
        lblTicket2.innerHTML = 'ticket ' + churrasco2.numero
        lblEscritorio2.innerHTML = 'Escritorio2 ' + churrasco2.escritorio
    }
    if (churrasco3){
        lblTicket3.innerHTML = 'ticket ' + churrasco3.numero
        lblEscritorio3.innerHTML = 'Escritorio3 ' + churrasco3.escritorio
    }
    if (churrasco4){    
        lblTicket4.innerHTML = 'ticket ' + churrasco4.numero
        lblEscritorio4.innerHTML = 'Escritorio4 ' + churrasco4.escritorio
    }
});