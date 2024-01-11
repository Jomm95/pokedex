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
      <button class="nes-btn" type="submit">
        Login
      </button>

      <p>Username is {{ input.username }}</p>
      <p>Password is {{ input.password }}</p>
    </form>
    <h3>Output: {{ output }}</h3>
  </div>

</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


export default {
  name: 'LoginView',
  setup() {
    const store = useStore();
    const router = useRouter();
    const input = ref({
      username: '',
      password: '',
    });
    const output = ref('');
    const login = () => {
      const username = input.value.username.trim();

      if (username) {
        store.dispatch('login', username);
        // Assuming the login is successful, set the username and navigate to the homepage
        store.dispatch('setUsername', input.value.username);
        router.push({ name: 'home' });
      } else {
        output.value = 'Please enter a valid username.';
      }

    }

    return {
      input,
      output,
      login,
    };
  }
}

// Assuming the login is successful, set the username and navigate to the homepage
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