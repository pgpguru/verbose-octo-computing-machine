// Importing express package
const express = require('express');

const path = require('path');
// Importaning the notes database file 'db.json'
const db = require('./db/db.json');
const routes = require('./routes/notes')

const PORT = process.env.PORT || 3001;
// Initialize our app variable by setting it to the value of express()
// The app object denotes the Express application
const app = express();

// This setups the Express app allowing middleware software to handle and parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static content for the app from the “public” directory in the application directory:
app.use(express.static('public'));


// Routes HTTP GET requests to the specified path in this case 'index.html' in the public folder.
// THIS ==> app.use([path,] callback [, callback...]).... IS THE BASIC SYNTAX.
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Routes HTTP GET requests to the specified path in this case 'index.html' in the public folder.
app.get('/notes' , (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.use('/api/notes' , routes)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
