module.exports = io => {

    // handle incoming connections from clients
    io.on('connection', (socket) => {

        socket.on('joinRoom', room => {
            console.log('joined room', room);
            
            socket.join(room)
        })
        // once a client has connected, we expect to get a ping from them saying what room they want to join
        socket.on('assignMsg', (newMsg = {
            room: 'roomExample',
            creatorId: 0,
            txt: 'Pukiiii?',
            at: 1532595342052
        }) => {
            // if (socket.room) socket.leave(socket.room);
            // socket.room = newMsg.room;
            // socket.join(newMsg.room);

            if (socket.room !== newMsg.room){
                socket.leave(socket.room);
                socket.join(newMsg.room);
            }

            console.log('Mi Ze Ba?', newMsg)
            io.sockets.in(newMsg.room).emit('renderMsg', newMsg)
        });



    });

    // // now, it's easy to send a message to just the clients in a given room
    // room = "abc123";
    // io.sockets.in(room).emit('message', 'what is going on, party people?');

    // // this message will NOT go to the client defined above
    // io.sockets.in('foobar').emit('message', 'anyone in this room yet?');



}

// io.emit('dodo', 'hey!')
// setTimeout(() => io.emit('dodo', 'whassssup?!!!'), 5000);