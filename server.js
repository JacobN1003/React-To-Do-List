const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todos = require('./api');

const app = express();
app.use(bodyParser.json())

//configure and connect to MongoDB
const db = require('./config/keys').mongoURI;
mongoose.connect(db)
    .then(() => console.log('MongoDB connected..'))
    .catch(err => console.log(err));

//use routes
app.use('/todos', todos);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));