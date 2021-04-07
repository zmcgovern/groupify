# Groupify Instructions

If you want to run the project, you must follow these steps:
1. Download files
1. Create a Spotify app on [the Spotify Developer site](https://developer.spotify.com/dashboard/).
1. Install Node.js (https://nodejs.org/en/)
1. Delete `package-lock.json`
1. Add `http://localhost:8888/auth/spotify/callback` as a redirect URI to your app profile.
1. Create a `.env` file with the following:

   ```
   CLIENT_ID=
   CLIENT_SECRET=
   ```

1. Copy the client ID and client secret and paste them into the `.env`.
1. Initialize Node in terminal.

   ```sh
   npm init
   ```

1. Install the dependencies in terminal.

   ```sh
   npm install
   ```

1. Run the application.

   ```sh
   node app.js
   ```

1. If you recieve the error that a module is missing, run below code in terminal one line at a time:

   ```
   npm install express
   npm install express-session
   npm install passport
   npm install consolidate
   npm install dotenv
   npm install request
   npm install mysql
   npm install passport-spotify 
   ```
1. Navigate to `http://localhost:8888/`.
