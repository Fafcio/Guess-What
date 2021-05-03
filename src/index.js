import express from 'express'
import http from 'http'
import { Server as WebSocketServer } from 'socket.io'
import { LobbiesManager } from './lobby.js'
import { UsersManager } from './user.js'

// Create servers
const expressServer = express()
const internalServer = http.createServer(expressServer)
const socketServer = new WebSocketServer(internalServer)

// Server static files in 'public' folder
expressServer.use(express.static(
    'public'
))

// Start HTTP server
internalServer.listen(3000, () => {
    console.log('Listening...');
})

// Users and lobbies data storage/management
const usersManager = new UsersManager()
const lobbiesManager = new LobbiesManager()

// Handle WebSocket connection auth
socketServer.use((socket, next) => {
    // Get user name
    const userName = socket.handshake.auth['name']

    if (!!!userName) // Check if user name is provided
        next(new Error('No user name provided'))

    // Create user for this connection
    const user = usersManager.create(userName, socket)

    if (!!!user) // Check if user can be created
        next(new Error('User with given name already exist'))

    // User successfully created
    next()
})

// Handle WebSocket connection
socketServer.on('connect', socket => {
    // Single user context
    const user = usersManager.getBySocketId(socket.id)
    console.log(`${user.name} joined`);

    // Current user creates lobby
    socket.on('lobby create', (args, callback) => {
        // New lobby
        const lobby = lobbiesManager.create(
            args.type,
            user
        )

        // Send info about lobby
        callback({
            lobbyId: lobby.id
        })
    })

    // Current user joins existing lobby
    socket.on('lobby join', (args) => {
        // Lobby to join
        const lobby = lobbiesManager.get(
            args.lobbyId
        )

        lobby.addUser(user)
    })

    socket.on('disconnect', () => {
        console.log(`${user.name} left`);
    })
})