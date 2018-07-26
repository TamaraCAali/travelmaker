module.exports = io => {

    io.on('connection', socket => {
        console.log('Someone connected!!!!!@!!!!!')

        io.emit('dodo', 'hey!')
        setTimeout(() => io.emit('dodo', 'whassssup?!!!'), 5000);

        socket.on('chatRequested', data => {
            console.log('socket succeed', data)
        })

        socket.on('koko', data => {
            console.log('koko happened!, got:', data)
        })
    })
}
