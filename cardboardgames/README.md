# Board Game Library

A simple web application for managing a board game library. It allows adding, displaying, and deleting games.

## Features

- Add a new board game (name, number of players, playtime, description).
- Display the list of games in three columns.
- Delete games from the list.

## Technologies

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: NestJS with a database managed by TypeORM

## Running the Project

### Backend
1. Start the API server:
   `bash`
   `npm run start`
2. The server runs by default on `http://localhost:3000.`

## Frontend
1. Open the `index.html` file in your browser (recommended: use a local server such as Live Server in VSCode).

## Project Structure
- index.html - The main page of the application.
- script.js - Application logic (API interaction, game list management).
- NestJS backend - Handles HTTP requests (`GET`, `POST`, `DELETE`) at `http://localhost:3000/games.`