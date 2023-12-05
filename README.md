# TFG_assignment

##### Objective:
    Developed some Node.js APIs to handle user registration, authentication and game dummy data using express for routing, MYSQL for user data, MongoDB for game data and RabbitMQ for event processing.

#### How to setup on your local machine
    -> git clone https://github.com/ShubhangShukla06/TFG_assignment.git
    -> npm install (this will install all dependencies)
    -> npm run dev (for run in development environment)

#### Usage
    ##### For register user
        -> http://localhost:3000/api/user/register (method: POST)
        ###### Requirement
            -> Need to pass JSON data in the request body in the mentioned format
            {
                "email": "tfg@gmail.com",
                "username": "TFG",
                "password": "Tfg@123"
            }
        -> This API save the user data to mysql db if it does not exist and fires the producer event to RabbitMQ and calls the subscriber event after 1.5 seconds to log registered user details in a text file.

    ##### For login user
        -> http://localhost:3000/api/user/login (method: POST)
        ###### Requirement
            -> Need to pass JSON data in the request body in the mentioned format
            {
                "email": "tfg@gmail.com",
                "password": "Tfg@123"
            }
        -> This API authenticates the user and returns JSON Web Token in response to that user if the user is authenticated.

    ##### To create a game
        -> http://localhost:3000/api/game/createGame (method: POST)
        ###### Requirement
            -> Need to pass JSON data in the request body in the mentioned format
            {
                "player_email": "tfg@gmail.com",
                "player_name": "Tfg",
                "game_name": "cricket",
                "game_result": "win"
            }
        -> This API saves a game in db if player's email is not exist

    ##### To retrieve game data for specific user
        -> http://localhost:3000/api/game/getGameByPlayerEmail (method: GET)
        ###### Requirement
            -> Need to pass JSON data in the request body in the mentioned format
            {
                "player_email": "tfg@gmail.com"
            }
        -> This API fetchs the game data of specific user

    ##### To update game data for specific user
        -> http://localhost:3000/api/game/updateGameByPlayerEmail (method: PUT)
        ###### Requirement
            -> Need to pass JSON data in the request body in the mentioned format
            {
                "player_email": "tfg@gmail.com",
                "player_name": "Tfg updated"
            }
        -> This API updates user data against matched user email

    ##### To delete a game
        -> http://localhost:3000/api/gamedeleteGameByPlayerEmail (method: DELETE)
        ###### Requirement
            -> Need to pass JSON data in the request body in the mentioned format
            {
                "player_email": "tfg@gmail.com"
            }

        -> This API will delete the game data against matched user email