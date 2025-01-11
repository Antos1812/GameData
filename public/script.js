
const API_URL = 'http://localhost:3000/games';

async function addGame(gameData){
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData),
        });
        const result = await response.json();
        if (response.ok){
            console.log("Games added");
            getGames();
            document.getElementById('gameForm').reset();
        } else {
            console.error('Error: Games added incorect' + result.message);
        }
    } catch (error){
        console.error('Network error: ' + error.message);
    }
}

async function getGames() {
    try {
        const response = await fetch(API_URL);
        const games = await response.json();
        const gamesListDiv = document.getElementById('gamesList');
        gamesListDiv.innerHTML = '';

        games.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.innerHTML = `<h3>${game.name}</h3>
                <p><strong>Czas gry:</strong> ${game.playtime} minut</p>
                <p><strong>Liczba graczy:</strong> ${game.playersnumber}</p>
                <p><strong>Opis:</strong> ${game.description}</p>`;
                gamesListDiv.appendChild(gameElement);
        });
    } catch (error){
        console.error('Network error: ' + error.message);
    }
}

document.getElementById('gameForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const newGame = {
        name: document.getElementById('name').value,
        playtime: parseInt(document.getElementById('playtime').value),
        playersnumber: parseInt(document.getElementById('playersnumber').value),
        description: document.getElementById('description').value,
    };
    addGame(newGame);
});



getGames();