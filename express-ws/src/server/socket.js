import {Server} from 'socket.io'
const app = require('express')()
const http = require('http')
const server = http.createServer(app)

export default function connect() {
  try {
    const EVENTS = {
      NEW_CHAT_MESSAGE: 'newChatMessage',
      USER_LEFT_CHAT: 'useDisconnected'
    }
    const io = new Server(server)
    io.on('connection', socket => {
      console.log(`Client ${socket.id} connected`)

      socket.on(EVENTS.NEW_CHAT_MESSAGE, ({to, ...data}) => {
        io.emit(EVENTS.NEW_CHAT_MESSAGE, data)
      })

      socket.on('disconnect', () => {
        console.log(`Client ${socket.id} diconnected`)
        socket.broadcast.emit(EVENTS.USER_LEFT_CHAT, {message: 'an user left the chat'})
      })
    })
    const port = process.env.SOCKET_PORT
    if (!port) throw Error('must define a SOCKET_PORT in .env')

    server.listen(port, () => {
      console.log('ws listening on *:', port)
    })
  } catch (error) {
    console.log(`error`, error)
    console.log('Error creating websocket')
  }
}
