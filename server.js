const express=require('express')
const path=require('path');
const http=require('http');
const socketio=require('socket.io');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
  } = require('./utils/users');
  
const formatMessages=require('./utils/messages');
const app=express();

const server=http.createServer(app);
const io=socketio(server);
const PORT= 3000|| process.env.PORT;
const botname ="IUS Bot "
//making static
app.use(express.static(path.join(__dirname,'public')));
// run when client connects
io.on('connection',socket=>{
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    socket.on('joinRoom', ({ username, room }) => {
        //client joins,welcome 
    socket.emit('message',formatMessages(botname,'Welcome to Chat App'));

    //broadcaast (to all other than user)
    socket.broadcast.to(user.room).emit('message',formatMessages(botname,'New User has joined the chat'));
    });
    
   
  

    //isten chat msg
    socket.on('chatMessage',msg=>{
    io.emit('message',formatMessages('USER',msg));
      //when got disconnected(only to user)
      socket.on('disconnect',()=>{
        //io.emit to everyone
            io.emit('message',formatMessages(botname,'A user has left the chat'));
        })
});
})
server.listen(PORT,()=>console.log(`server running at Port ${PORT}`))