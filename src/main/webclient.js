const config = require('../config')
var ioServer = require('socket.io')
let io,iolist
module.exports = {
  open
}

function open () {
  if (io) {
    io.close()
    io = null
  }
  io = ioServer(config.SOCKET_PORT)
  iolist = {}
  io.on('connection', function (socket) {
    iolist[socket.id] = socket
    socket.on('addtorrent', function (data) {
      if (data && data.url) {
        console.log(data)
      }
    })
    socket.on('disconnect', function (e) {
      delete iolist[socket.id]
      socket.close()
    })
    socket.on('error', function (error) {
      console.log(error)
    })
    socket.emit('news', {w: 'test'})
  })
  io.on('disconnect', function () {
    console.log('disconnect')
    io.close()
  })
}
