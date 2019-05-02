const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
// this is the database for now
const db = [
    'this is the app/ current database'
];

// when Get request comes in, send back all messages
app.get('/api', (req, res) => {
    res.json(db);
});

//when post request comes in, add message to array of messages
app.post('/api', (req, res) => {
    console.log(req.body.message);
    db.push(req.body.message);
    res.json({
        'message': req.body.message
        
    })
});
app.listen(3000, () => {
    console.log('App is running');
});