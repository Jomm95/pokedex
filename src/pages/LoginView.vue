<template>
  <div class='login-container'>
    <p>Who dares to open this Pokédex? Are you a trainer?</p>
    <form class="login-form" id="login-form" @submit.prevent='login' ref='loginForm'>
      <div class="nes-field">
        <label for="username">Your Name </label>
        <input id="username" class="nes-input" type="text" v-model='input.username' />
      </div>
      <div class="nes-field">
        <label for="password">Password </label>
        <input id="password" class="nes-input" type="password" v-model='input.password' />
      </div>
      <button class="btn btn-outline-dark" type="submit">
        Login
      </button>

      <p>Username is {{ input.username }}</p>
      <p>Password is {{ input.password }}</p>
    </form>
    <h3>Output: {{ output }}</h3>
  </div>

</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      input: {
        username: '',
        password: '',
      },
      output: '',
    }
  },
}
</script>

<style scoped>

.login-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nes-field {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}
</style>