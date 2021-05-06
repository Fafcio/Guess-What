
// Create lobby
document.querySelector('#create-button').addEventListener('click', () => {
    const userNameElement = document.querySelector('#userNameHost')
    const lobbyTypeElement = document.querySelector('#lobbyType')

    const userName = userNameElement.value
    const lobbyType = lobbyTypeElement.options[lobbyTypeElement.selectedIndex].value

    // Create lobby
    if (!!userName && !!lobbyType) {
        // User login
        User.login(userName)
        console.log(lobbyType);
        // Create lobby
        Lobby.create(lobbyType)
    }
})

// Join lobby
document.querySelector('#join-button').addEventListener('click', () => {
    const userNameElement = document.querySelector('#userNameGuest')
    const lobbyIdElement = document.querySelector('#lobbyId')

    const userName = userNameElement.value
    const lobbyId = lobbyIdElement.value

    // Join if both inputs are filled
    if (!!userName && !!lobbyId) {
        // User login
        User.login(userName)

        // Join lobby
        Lobby.join(lobbyId)
    }
})