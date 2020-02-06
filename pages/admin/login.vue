<template>
  <div class="wrapper">
    <div class="container_login">
      <h1>Welcome</h1>

      <form @submit.prevent="login" class="form">
        <input v-model="formEmail" name="email" type="text" placeholder="Email">
        <input v-model="formPassword" name="password" type="password" placeholder="Password">
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>

    <ul class="bg-bubbles">
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
    </ul>
  </div>
</template>
<style scoped>
  .wrapper {
    background: #f67e7d;
    background: -webkit-linear-gradient(top left,#f67e7d 0%,#d4b5b5 100%);
    background: -moz-linear-gradient(top left,#f67e7d 0%,#d4b5b5 100%);
    background: -o-linear-gradient(top left,#f67e7d 0%,#d4b5b5 100%);
    background: linear-gradient(to bottom right,#f67e7d 0%,#d4b5b5 100%);
    position: relative;
    left: 0;
    width: 100%;
    height: calc( 100vh - 36px);
    margin:0;
    overflow: hidden;
  }
  .v-content__wrap{
    margin: 0;
  }
  .container{
    max-width: unset;
    padding: 0;
    margin: 0;
  }
  .container_login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    margin: 0 auto;
    padding: 80px 0 0 0;
    text-align: center;
    box-sizing: border-box;
    z-index: 2
  ;
  }
  .container_login h1 {
    font-size: 40px;
    transition-duration: 1s;
    font-weight: 200;
    color: white;
  }
  form {
    padding: 20px 0;
    position: relative;
    z-index: 2;
  }
  form input {
    display: block;
    appearance: none;
    outline: 0;
    border: 1px solid rgba(255,255,255,0.4);
    background-color: rgba(255,255,255,0.2);
    width: 250px;
    border-radius: 3px;
    padding: 10px 15px;
    margin: 0 auto 10px auto;
    text-align: center;
    font-size: 18px;
    color: white;
    transition-duration: 0.25s;
    font-weight: 300;
  }
  form input:hover {
    background-color: rgba(255,255,255,0.4);
  }
  form input:focus {
    background-color: white;
    width: 300px;
    color: #f67e7d;
  }
  form button {
    appearance: none;
    outline: 0;
    background-color: white;
    border: 0;
    padding: 10px 15px;
    color: #f67e7d;
    border-radius: 3px;
    width: 250px;
    cursor: pointer;
    font-size: 18px;
    transition-duration: 0.25s;
  }
  form button:hover {
    background-color: #f5f7f9;
  }
  .bg-bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc( 100vh - 36px);
    z-index: 1;
  }
  .bg-bubbles li {
    position: absolute;
    list-style: none;
    display: block;
    width: 40px;
    height: 40px;
    background-color: rgba(255,255,255,0.15);
    bottom: -160px;
    -webkit-animation: square 25s infinite;
    animation: square 25s infinite;
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
  }
  .bg-bubbles li:nth-child(1) {
    left: 10%;
  }
  .bg-bubbles li:nth-child(2) {
    left: 20%;
    width: 80px;
    height: 80px;
    animation-delay: 2s;
    animation-duration: 17s;
  }
  .bg-bubbles li:nth-child(3) {
    left: 25%;
    animation-delay: 4s;
  }
  .bg-bubbles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-duration: 22s;
    background-color: rgba(255,255,255,0.25);
  }
  .bg-bubbles li:nth-child(5) {
    left: 70%;
  }
  .bg-bubbles li:nth-child(6) {
    left: 80%;
    width: 120px;
    height: 120px;
    animation-delay: 3s;
    background-color: rgba(255,255,255,0.2);
  }
  .bg-bubbles li:nth-child(7) {
    left: 32%;
    width: 160px;
    height: 160px;
    animation-delay: 7s;
  }
  .bg-bubbles li:nth-child(8) {
    left: 55%;
    width: 20px;
    height: 20px;
    animation-delay: 15s;
    animation-duration: 40s;
  }
  .bg-bubbles li:nth-child(9) {
    left: 25%;
    width: 10px;
    height: 10px;
    animation-delay: 2s;
    animation-duration: 60s;
    background-color: rgba(255,255,255,0.3);
  }
  .bg-bubbles li:nth-child(10) {
    left: 90%;
    width: 160px;
    height: 160px;
    animation-delay: 11s;
  }
  @-webkit-keyframes square {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-120vh) rotate(600deg);
    }
  }
  @keyframes square {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-120vh) rotate(600deg);
    }
  }

</style>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      title: 'Login',
      meta_desc: '',
      formError: null,
      formEmail: '',
      formPassword: ''
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.meta_desc }
      ]
    }
  },
  methods: {
    async login () {
      try {
        await this.$store.dispatch('login', {
          email: this.formEmail,
          password: this.formPassword
        })
        this.formEmail = ''
        this.formPassword = ''
        this.formError = null
      } catch (e) {
        this.formError = e.message
      }
    },
    async logout () {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>
