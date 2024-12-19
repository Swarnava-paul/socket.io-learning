const express = require('express');
const { create } = require('node:domain');
const {createServer} = require('node:http');
const {Server} = require('socket.io');


const app = express();
const server = createServer(app);

const io = new Server(server,{
    cors : {
        origin : 'http://localhost:5173'
    },
    credentials : true
});


io.on('connection',(socket)=>{
    
    const currentUsers = [];
    const {handshake:{query:{userName}}} = socket;

    for ( let [id,socket] of io.of('/').sockets ) {
    //console.log(socket.handshake.query.userName);
    currentUsers.push({
        socketId : id,
        userName : socket.handshake.query.userName
    })
    }


    socket.emit('new-users',currentUsers);
    socket.broadcast.emit('new-users',currentUsers);
    socket.broadcast.emit('notification-of-user-joining',userName);

    socket.on('disconnect',()=>{
        const currentUsers = [];
        for ( let [id,socket] of io.of('/').sockets ) {
            //console.log(socket.handshake.query.userName);
            currentUsers.push({
                socketId : id,
                userName : socket.handshake.query.userName
            })
            }
            socket.broadcast.emit('new-users',currentUsers);
        console.log('a user disconnected');
    })
})



server.listen(8040,()=>console.log('server is running'));