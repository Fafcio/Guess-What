const gameFrame = document.getElementById('game-frame')
const gameName = document.getElementById('room-name')

switch (Lobby.current.type) {
    case 'flip-a-coin':
        gameFrame.src = '/games/flip-a-coin/coin.html'
        gameName.textContent = 'Rzut monetą'
        break;
    case 'number-game':
        gameFrame.src = '/games/number-game/number.html'
        gameName.textContent = 'Zgadywanie'
        break;
    case 'snake':
        gameFrame.src = '/games/snake/snake.html'
        gameName.textContent = 'Wonrz'
        break;
}