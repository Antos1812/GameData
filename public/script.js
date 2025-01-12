
const API_URL = 'http://localhost:3000/games';

const preCredentials = {
    email: 'test@example.com',
    password: '1234',
};

async function loginUser(credentials) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        
        const result = await response.json();
        
        if (credentials.email === preCredentials.email && credentials.password === preCredentials.password) {  // for later,  response.ok && result.access_token

            localStorage.setItem('jwt_token', result.access_token); 
            alert("Logged in successfully!");
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('gameForm').style.display = 'block';
            window.location.href = "dashboard.html";

        } else {
            document.getElementById('loginError').style.display = 'block'; 
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loginError').style.display = 'block';
    }
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const credentials = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    loginUser(credentials);
});

async function addGame(gameData){
    try {
        const token = localStorage.getItem('jwt_token');
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(gameData),
        });
        const result = await response.json();
        if (response.ok){
            console.log("Games added");
            getGames();
            document.getElementById('gameForm').reset();
        } else {
            console.error('Error: Games added incorrect' + result.message);
        }
    } catch (error){
        console.error('Network error: ' + error.message);
    }
}

async function getGames() {
    const token = localStorage.getItem('jwt_token');

    try {
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const games = await response.json();
        const gamesListDiv = document.getElementById('gamesList');
        gamesListDiv.innerHTML = '';

        games.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.innerHTML = `<h3>${game.name}</h3>
                <p><strong>Czas gry:</strong> ${game.playtime} minut</p>
                <p><strong>Liczba graczy:</strong> ${game.playersnumber}</p>
                <p><strong>Opis:</strong> ${game.description}</p>
                <button onclick="deleteGame(${game.id})">Delete</button>`;
                gamesListDiv.appendChild(gameElement);
        });
    } catch (error){
        console.error('Network error: ' + error.message);
    }
}

async function deleteGame(gameId) {
    const token = localStorage.getItem('jwt_token');

    try{
        const response = await fetch(`${API_URL}/${gameId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            console.log("Game deleted");
            getGames();
        } else {
            console.error('Error in deleting game');
        }
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

window.onload = function() {
    if(localStorage.getItem('jwt_token')){
        document.getElementById('gameForm').style.display = 'block';
        document.getElementById('loginForm').style.display = 'none';
        getGames();
    } else {
        document.getElementById('gameForm').style.display = 'none';
    }
};

getGames();