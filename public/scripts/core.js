// Import this this file to assert 
// core-api.js can be used in the iframes

/**
 * Import object defined in parent window
 * Used in iframes
 * @param {string} objectName 
 */
const importWindowObject = objectName => {
    if (!window.hasOwnProperty(objectName)) {
        window[objectName] = window.parent[objectName]
    }
}

importWindowObject('User')
importWindowObject('LobbyType')
importWindowObject('Lobby')
