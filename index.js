const { Socket } = require('engine.io');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});
  
let users = []



io.on('connection', (socket) => {
    console.log(`user ${socket.id} is connected`)

    socket.on("userLogin", user =>{
        users.push(user);
        socket.name = user.nome
        console.log(users);
        socket.emit("userList", users);
        socket.broadcast.emit("userList", users)
        socket.msg = `${user.nome} entrou`
        socket.emit("newuserMessage", socket.msg)
        socket.broadcast.emit("newuserMessage", socket.msg)
    })
    
    socket.on('message', data =>{
        socket.broadcast.emit('message:received', data)
    })

    socket.on('disconnect', () =>{
        console.log(`user ${socket.id} is disconnected`)
        
        let newuserList = users.filter((user)=> user.nome != socket.name )
        users = newuserList
       
        socket.broadcast.emit("newuserList", users)

    })
})



server.listen(3000, () => {
    console.log('listening on *:3000');
  });