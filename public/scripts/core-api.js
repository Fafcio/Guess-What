// Client-side API to communicate with the server
//
// DO NOT INCLUDE THIS FILE DIRECTLY
// Only index.html should reference this file, 
// for the other pages use core.js file

/**
 * Game user
 * @constructor
 * @param {string} name
 * @param {import('socket.io').Socket}
 */
var User = function (name, socket) {
    /**
     * User name
     * @readonly
     * @type {string}
     */
    this.name = name

    /**
     * User connection socket
     * @readonly
     * @type {import('socket.io').Socket}
     */
    this.socket = socket
}

/**
 * User that is currently logged-in
 * Use User.login method to change this property
 * @readonly
 * @type {User?}
 */
User.me = undefined

/**
 * Login to the game
 * @param {string} userName
 * @returns {boolean}
 */
User.login = (userName) => {
    // User socket
    const socket = io({
        auth: { // User credentials
            name: userName
        }
    })

    // Check if connection exist
    if (socket.disconnected)
        return false

    // Create user
    User.me = new User(userName, socket)

    return true
}

/**
 * Lobby type
 * @readonly
 * @enum {string}
 */
var LobbyType = {
    GUESS: 'guess',
}

/**
 * Game lobby
 * @constructor
 */
var Lobby = function () {

}

/**
 * Current user lobby
 * Use Lobby.create or Lobby.join method
 * to change this property
 * @readonly
 * @type {Lobby?}
 */
Lobby.current = undefined

/**
 * Create game lobby
 * Current logged-in user will become host of
 * a newly created lobby
 * @param {LobbyType} lobbyType game type of lobby
 * @returns {boolean}
 */
Lobby.create = (lobbyType) => {
    // Check if there is logged-in user
    if (!!!User.me)
        return false

    User.me.socket.emit('lobby create', { // Lobby params
        type: lobbyType
    }, response => { // Response

    })

    return true
}

/**
 * Join game lobby
 * @param {string} lobbyId id of a lobby to join
 */
Lobby.join = (lobbyId) => {

}