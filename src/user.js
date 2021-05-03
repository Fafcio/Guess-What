import { find } from 'lodash-es'

export class User {
    /**
     * Create User instance
     * @param {string} name
     * @param {import('socket.io').Socket} socket 
     */
    constructor(name, socket) {
        this.name = name
        this.socket = socket
    }
}

export class UsersManager {
    /**
     * Managed users
     * @type {User[]}
     */
    #users = []

    /**
     * Create new user
     * @param {string} name 
     * @param {import('socket.io').Socket} socket
     * @returns {User?}
     */
    create(name, socket) {
        const user = new User(name, socket)

        // Check if user with the same name exist
        const isDuplicate = !!find(this.#users, u => {
            return u.name === user.name
        })

        if (isDuplicate) // User with given name already exist
            return undefined
        else { // Add user to the managed space
            this.#users.push(user)

            return user
        }
    }

    /**
     * Get user by its socket id
     * @param {string} socketId
     * @returns {User?}
     */
    getBySocketId(socketId) {
        // Find user by socket id
        return find(this.#users, u => u.socket.id === socketId)
    }
}