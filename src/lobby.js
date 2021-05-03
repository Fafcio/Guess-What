import crypto from 'crypto'

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
         * Lobby users
         * @type {import('./user').User[]}
         */
        this.users = [host]
    }


}

export class LobbiesManager {
    /**
     * Managed lobbies
     * @type {Lobby[]}
     */
    #lobbies = []

    list() {

    }

    create() {

    }
}