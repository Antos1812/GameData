const API_URL = 'http://localhost:3000/games';

async function addGame(gameData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData),
        });
        const result = await response.json();
        if (response.ok) {
            console.log("Game added");
            getGames();
            document.getElementById('gameForm').reset();
        } else {
            console.error('Error: Game not added - ' + result.message);
        }
    } catch (error) {
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
            gameElement.innerHTML = 
                `<h3>${game.name}</h3>
                <p><strong>Czas gry:</strong> ${game.playtime} minut</p>
                <p><strong>Liczba graczy:</strong> ${game.playersnumber}</p>
                <p><strong>Opis:</strong> ${game.description}</p>
                <button onclick="deleteGame(${game.id})">Delete</button>`;
            gamesListDiv.appendChild(gameElement);
        });
    } catch (error) {
        console.error('Network error: ' + error.message);
    }
}

async function deleteGame(gameId) {
    try {
        const response = await fetch(`${API_URL}/${gameId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            console.log("Game deleted");
            getGames();
        } else {
            console.error('Error in deleting game');
        }
    } catch (error) {
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

window.onload = function () {
    document.getElementById('gameForm').style.display = 'block';


    getGames();
};

function Setdarktheme(){

        const body = document.body;
        body.style.backgroundImage = 'linear-gradient(rgb(62, 58, 80),rgb(62, 58, 80))';
        body.style.color = 'white';

        const form = document.getElementById("gameForm");
        form.style.backgroundImage = 'linear-gradient(rgb(79, 77, 88),rgb(79, 77, 88))'

        const para = document.querySelectorAll('p');
        para.forEach(p => p.style.color = 'white');

        const h = document.querySelectorAll('h1,h2');
        h.forEach(p => p.style.color = 'white');
}; 






getGames();
