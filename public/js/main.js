const chatForm=document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages');


// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

console.log(username, room);

const socket=io();

// / Join chatroom
socket.emit('joinRoom', { username, room });
socket.on('message',message=>{
    console.log(message);
    outputMessage(message);

      // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;

  
  
});

//messaage
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=e.target.elements.msg.value;
    
    //emiting to server
    socket.emit('chatMessage',msg);
    
    //clearing input
e.target.elements.msg.value='';
e.target.elements.msg.value.focus();

// console.log(msg);
})


//output to DOM
function outputMessage(message){
    const div =document.createElement('div');
    div.classList.add('message');
    div.innerHTML =`<p class="meta">${message.username}<span>${message.time}<span><p>
    <p class="text">
    ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div)
}
