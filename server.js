const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app)
const io = require('socket.io')(http);




app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var messages = [
    {name: "Tim", message: "hello"},
    {name: "Henry", message: "gwen"}
];

app.get('/messages',(req,res)=>{
    res.send(messages)
})

app.post('/messages',(req,res)=>{
    messages.push(req.body);
    io.emit('message',req.body);
    res.sendStatus(200)
})


var server = http.listen(3000, () => {
    console.log("server is listening on port",server.address().port);
});