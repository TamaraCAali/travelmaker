module.exports = io => {

    // handle incoming connections from clients
    io.on('connection', (socket) => {
        socket.on('joinRoom', room => {
            socket.join(room)
            setTimeout(() => console.log('join room ', room, socket.rooms), 1000)
        })
        socket.on('leaveRoom', room => {
            // console.log('room ' + room + 'was left.')
            socket.leave(room)
            setTimeout(() => console.log('room left', socket.rooms), 1000)

        })
        // once a client has connected, we expect to get a ping from them saying what room they want to join
        socket.on('assignMsg', (newMsg = {
            room: 'roomExample',
            creator: {
                _id: 'iddddd',
                img: 'https://romero.co.il/wp-content/uploads/2018/01/%D7%A8%D7%95%D7%9E%D7%A8%D7%95-%D7%9C%D7%91-%D7%90%D7%99%D7%99%D7%A7%D7%95%D7%9F-300x300.png',
                fullName: 'Muki Bnaya'
            },
            txt: 'Pukiiii?',
            at: 1532595342052
        }) => {
            // if (socket.room) socket.leave(socket.room);
            // socket.room = newMsg.room;
            // socket.join(newMsg.room);
            // socket.join(newMsg.room);

            // console.log('Mi Ze Ba?', newMsg)
            io.sockets.in(newMsg.room).emit('renderMsg', newMsg)
        });
        socket.on('assignPushNtf', pushNtf => {
            io.sockets.in(pushNtf.ntfRoom).emit('renderPushNtf', pushNtf);
            // setTimeout(() => console.log('socket before rendering pushNtf', socket.rooms), 1000)
            // if (!socket.rooms[pushNtf.chatRoom]) {
            //     setTimeout(() => console.log('socket before rendering pushNtf', socket.rooms), 1000)
            //     setTimeout(() => console.log('pushNtf', pushNtf), 1000)
            //     io.sockets.in(pushNtf.ntfRoom).emit('renderPushNtf', pushNtf);
            // }
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