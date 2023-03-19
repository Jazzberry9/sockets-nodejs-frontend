const cors  = require("cors");
const TicketControl = require("../models/ticketControl");


const ticketControl = new TicketControl;


const socketController = (socket) => {

    // cuando un cliente se conecta
    socket.emit('estado-actual', ticketControl.ultimos4 );
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    
    socket.on('siguienteps', ( payload, callback ) => {
        
        const siguientex = ticketControl.siguiente();
        callback(siguientex);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
    })
    socket.on('atendiendo-ticket', ( {desk}, callback ) => {
        
        if( !desk ){
            return callback({
                ok: false,
                msg: 'desk es obligatorio'
            })
        }

        const ticketete = ticketControl.atenderTicker( desk );

        // notificar cambios ultimos 4
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4 );

        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        if ( !ticketete ){
            callback({
                ok: false,
                msg: 'No quedan mas tickets para atender'
            })
        } else {
            callback({
                ok:true,
                ticketete
            })
            
        }
    })

}



module.exports = {
    socketController
}

