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

}

/**
 * Login to the game
 * @param {string} userName
 * @returns {User}
 */
User.login = (userName) => {
    const socket = io({
        auth: {
            name: userName
        }
    })

    return new User(userName, socket)
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
 * Join game lobby
 * @param {string} lobbyId id of a lobby to join
 * @param {User} me user that will join the lobby
 */
Lobby.join = (lobbyId, me) => {

}

/**
 * Create game lobby
 * @param {LobbyType} lobbyType game type of lobby
 * @param {User} me host of the lobby
 */
Lobby.create = (lobbyType, me) => {

}