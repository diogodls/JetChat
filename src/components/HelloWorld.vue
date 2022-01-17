<template>
  <div>

    <div v-if="!joined" class="menu" id="menu">
      <header class="menutitle mb-4">
        <img src="../assets/logojet.png" alt="Logo" style="margin-right:4px;">
        <h4 class="title">JetChat</h4>
      </header>

      <form action="" @submit.prevent="join()">
        <div class="login mb-4">
          <label class="label" for="login">Nome de usuário</label>
          <input type="text" name="login" id="login" class="input" placeholder="Nome de usuário..." v-model="currentUser">
        </div>
        
        <div class="btn">
          <input type="submit" value="Entrar" class="button">
        </div>
      </form>
      
    </div>



    <div v-if="joined" class="chat columns is-mobile">
      <div class="sidebar column is-2">
        <div class="">
          <h4 class="title mb-4 mt-4" style="color:white;">Usuários online:</h4>
        </div>
        <ul>
          <li v-for="(user, index) in userList" :key="index" style="color:white;">
            {{user.nome}}
          </li>
        </ul>
      </div>

      <div class="column">
        <ul style="height: 600px; overflow-y: auto;">
          
          <li v-for="message in messages" :key="message.id" class="messages">
            <strong>{{message.user}} :</strong> {{message.text}}
          </li>
        </ul>

        <div v-if="joined" class="msg">
          <div>
            <textarea v-model="text" class="text-message" v-on:keyup.enter="addMessage"></textarea>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io('45.77.151.150:3000');

export default {
  name: 'HelloWorld',
  props: {},

  data(){
    return{
      joined: false,
      currentUser: "",
      text: "",
      messages:[],
      id: 0,
      entrymessage: [],
      userList: []
    };
  },

  mounted(){

    socket.on("newuserList",users =>{
      this.userList = [];
      this.userList = users;
    })

    socket.on("userList",users =>{
        this.userList = users;
        console.log(this.userList)
    })

    socket.on("message:received", (data) => {
      this.messages = this.messages.concat(data)
    })

  },

  methods:{
    join(){
      let input = document.querySelector("#login")
      
      if(input.value != ""){
        this.joined = true
        let user = {
          nome: input.value.trim(),
          id: socket.id
        }
        socket.emit("userLogin", user)
        socket.on("newuserMessage", msg =>{
          this.entrymessage.push(msg)
        })
      }

    },
   

    addMessage(){
      const message = {
        id: new Date().getTime(),
        text: this.text,
        user: this.currentUser
      }
    
      this.messages = this.messages.concat(message),
      socket.emit('message', message),
    
      this.text = ""
    }
  }
}

</script>

<style lang="scss">

body{
  overflow: hidden;
}

.menu{
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  max-width: 500px;
  width: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

    .menutitle{
      display: flex;
      justify-content: center;
      align-items: center;
        img{
          object-fit: cover;
          height: 34px;
        }
    }

    form{
      display: flex;
      flex-direction: column;
      align-items: center;
        .button{
          display: flex;
          justify-content: center;
          border-radius: 20px;
          background-color: #103346;
          color: white;
        }
        .btn{
          display: flex;
          justify-content: center;
        }
        .login{
            max-width: 100%;
            width:100%;
        }
    }

    h4{
      font-size: 34px;
      color: #103346;
    }
}

.msg{
  height: 100vh;
  .text-message{
    width: 80%;
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
  }
  .input{
    width: 200px;
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
  }
}

.sidebar{
  display: flex;
  flex-flow: column;
  align-items: center; 
  
  .title{
    font-size: 19px;
  }
  
}

.messages{
  background-color: white;
}


</style>
