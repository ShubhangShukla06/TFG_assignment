# TFG_assignment

##### Objective:
    Developed some Node.js APIs to handle user registration, authentication and game dummy data using express for routing, MYSQL for user data, MongoDB for game data and RabbitMQ for event processing.

#### How to configure RabbitMQ
    -> Download and install the RabbitMQ in your system by visiting https://www.rabbitmq.com/download.html
    -> Make sure before installing RabbitMQ, you need to install Erlang dependency by visiting https://www.erlang.org/patches/otp-25.3.2
    -> Open the browser and go to http://localhost:15672/ (if this URL is not working then open the RabbitMQ command prompt and run "rabbitmq-plugins enable rabbitmq_management" then refresh the browser)
    -> Login with default credentials
        username: guest
        password: guest

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
        -> This API saves the user data to MySQL db if it does not exist and fires the producer event to RabbitMQ and calls the subscriber event after 1.5 seconds to log registered user details in a text file.

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
        -> This API saves a game in db if the player's email does not exist

    ##### To retrieve game data for specific user
        -> http://localhost:3000/api/game/getGameByPlayerEmail (method: GET)
        ###### Requirement
            -> Need to pass JSON data in the request body in the mentioned format
            {
                "player_email": "tfg@gmail.com"
            }
        -> This API fetch the game data of the specific user

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

        -> This API will delete the game data against the matched user email
