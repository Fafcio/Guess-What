
/**
 * Functions to retrieve input values
 * from user login form
 * @namespace
 */
var Form = {
    /**
    * Get user name from input
    * @returns {string}
    */
    getUserName: function () {
        const userNameInput = document.querySelector('#userName')

        return userNameInput.value?.trim()
    },

    /**
    * Get user type
    * @returns {'host'|'guest'}
    */
    getUserType: function () {
        const selectedInput = document.querySelector('input[name=userType]:checked')

        return selectedInput.value
    },

    /**
    * Get lobby type
    * @returns {'guess'|'tic-tac-toe'|'coin'}
    */
    getLobbyType: function () {
        const lobbyTypeInput = document.querySelector('#lobbyType')

        return lobbyTypeInput.options[lobbyTypeInput.selectedIndex].value
    },

    /**
    * Get lobby id
    * @returns {string}
    */
    getLobbyId: function () {
        const lobbyIdInput = document.querySelector('#lobbyId')

        return lobbyIdInput.value?.trim()
    }
}

// Handle #start-game button click
document.querySelector('#start-game').addEventListener('click', () => {
    const userName = Form.getUserName()
    const userType = Form.getUserType()

    if (!!!userName) { // Abort login when user name is missing
        alert('Missing user name')
        return
    }

    // Different login scenarios for different user types
    switch (userType) {
        case 'guest':
            const lobbyId = Form.getLobbyId()

            if (!!!lobbyId) { // Abort login when lobby id is missing
                alert('Missing lobby id')
                return
            }

            // User login
            User.login(userName)

            // Join lobby
            Lobby.join(lobbyId)

            break
        case 'host':
            const lobbyType = Form.getLobbyType()

            // User login
            User.login(userName)

            // Create lobby
            Lobby.create(lobbyType)
            break
        default:
            alert('Invalid user type')
            return
    }

    window.location.href = '/lobby/lobby.html'
})