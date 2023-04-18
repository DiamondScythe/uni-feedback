# University feedback system

### Project setup

```
npm install while in main folder

then cd into server folder

then npm install there too

if there are still module errors, delete package-lock.json files and retry the above steps

```

### MongoDB setup

```
The backend requires MongoDB to be installed and running locally on the machine with this connection string:

mongodb://localhost:27017

If MongoDB isn't installed ,go to the MongoDB website (https://www.mongodb.com/download-center/community) and download the appropriate version of MongoDB for your operating system. Then, follow instructions to start the mongodb server. You can check if the backend has connected to MongoDB successfully by seeing "connected to mongodb db" logged into the server console.

If MongoDB is installed, and Mongod service is running (connecting to MongoDB with MongoDB Compass is possible), but you still can't connect, try changing the connection string "dbURI" in server/src/app.js from "mongodb://localhost:27017/uni-feedback" to "mongodb://127.0.0.1:27017/uni-feedback"
```

### Compiles and hot-reloads for development (frontend)

```
Run this while in main folder:

npm run serve
```

### Compiles and hot-reloads for development (backend)

```
Run this while in server folder:

nodemon src/app.js

Install nodemon to server folder with npm if nodemdon hasn't been installed.
```
