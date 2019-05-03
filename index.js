const express = require('express');
const http = require('http');
const app = express();
//  create plain server that uses express app
const server = http.createServer(app);

const WebSocket = require('ws');
const wss = new WebSocket.Server({
    server,  // piggybacking on plain http server
    path: '/chat' // listen on only one route, allows express to continue to listen on custom routes
});

app.use(express.urlencoded({extended: true}));
// this is the database for now
const db = [
    'this is the app/ current database'
];

wss.on('connection', (socket) => {
    console.log('new connection');
    socket.send(JSON.stringify(db));
    socket.on('message', (data) => {
        console.log(data);
        db.push(data);
        console.log(db);
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify(data));
            }
        });
        // socket.send(data);

    });
});

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
server.listen(3000, () => {
    console.log('App is running');
});