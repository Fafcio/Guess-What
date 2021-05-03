import crypto from 'crypto'
import { find } from 'lodash-es'

/**
 * Lobby type
 * @readonly
 * @enum {string}
 */
export const LobbyType = {
    GUESS: 'guess',
}

/**
 * Server-side representation
 * of the game lobby
 */
export class Lobby {
    /**
     * Lobby users
     * @readonly
     * @type {Set<import('./user').User>}
     */
    #users = new Set()

    /**
     * Create Lobby instance
     * @param {string} id
     * @param {LobbyType} type
     * @param {import('./user').User} host
     */
    constructor(id, type, host) {
        /**
         * Lobby id
         * @readonly
         * @type {string}
         */
        this.id = id

        /**
         * Lobby type
         * @readonly
         * @type {LobbyType}
         */
        this.type = type

        /**
         * Lobby host
         * @readonly
         * @type {import('./user').User}
         */
        this.host = host
    }

    /**
     * Get list of all users in lobby
     * @returns {import('./user').User[]}
     */
    users() {
        return Array.from(this.#users)
    }

    /**
     * Add user to lobby
     * @param {import('./user').User} user
     */
    addUser(user) {
        // Add user
        this.#users.add(user)

        // Add user to the lobby
        user.socket.join(this.id)

        // Notify lobby about new user
        user.socket.to(this.id).emit('user join', {
            userName: user.name
        })

        // Auto-remove on disconnect
        user.socket.on('disconnect', () => {
            this.removeUser(user)
        })
    }

    /**
     * Remove user from lobby
     * @param {import('./user').User} user
     */
    removeUser(user) {
        // Remove user
        this.#users.delete(user)

        // Notify lobby about user removal
        user.socket.to(this.id).emit('user left', {
            userName: user.name
        })

        // Remove user from the lobby
        user.socket.leave(this.id)
    }
}

export class LobbiesManager {
    /**
     * Managed lobbies
     * @type {Lobby[]}
     */
    #lobbies = []

    /**
     * Create lobby
     * @param {LobbyType} type
     * @param {import('./user').User} host
     * @returns {Lobby?}
     */
    create(type, host) {
        let lobbyId

        // Generate lobby id
        while (true) {
            // Generate random lobby id
            lobbyId = crypto.randomBytes(8).toString('hex')

            const lobbyDuplicate = find(this.#lobbies, l => l.id === lobbyId)
            if (!!!lobbyDuplicate) // Check for duplicates
                break
        }

        // New lobby
        return new Lobby(lobbyId, type, host)
    }

    /**
     * Get lobby by id
     * @param {string} id 
     * @returns {Lobby?}
     */
    get(id) {
        return find(this.#lobbies, l => l.id === id)
    }

    /**
     * Get all lobbies
     * @returns {Lobby[]}
     */
    list() {
        return this.#lobbies
    }
}