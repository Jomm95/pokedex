<template>
  <div class="login-wrapper">
    <div class='login-container'>
      <h2>Who dares to open this Pokédex? Are you a trainer?</h2>
      <form class="login-form" id="login-form" @submit.prevent='login' ref='loginForm'>
        <div class="nes-field">
          <label for="username">Your Name </label>
          <input id="username" class="nes-input" type="text" v-model='input.username' required />
        </div>
        <div class="nes-field">
          <label for="password">Password </label>
          <input id="password" class="nes-input" type="password" v-model='input.password' required />
        </div>
        <button class="nes-btn" type="submit">
          Login
        </button>

        <!-- <p>Username is {{ input.username }}</p>
        <p>Password is {{ input.password }}</p> -->
      </form>
      <h3>{{ output }}</h3>
    </div>
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

.login-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-image: url(../assets/rayquaza-emerald-2.webp); */
  background-image: url(../assets/wyy5o7rqhp4a1.gif);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-size: 0.8rem;
}

h2 {
  background-color: rgba(248, 249, 250, 0.5);
  border-radius: 20px;
  padding: 2rem 1rem;
  margin: 2rem 1rem;

}

.login-container {
  margin-top: 53vh;
}
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(248, 249, 250, 0.5);
  margin: 2rem 1rem;
  border-radius: 20px;
  padding-bottom: 1rem;
}

.nes-field {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}


@media only screen and (max-width: 1024px) {

}

@media only screen and (max-width: 768px) {
  h2 {
    font-size: 0.7rem;
  }
  .login-form {
    font-size: 0.5rem;
  }
}

@media only screen and (max-width: 480px) {

  h2 {
    font-size: 0.7rem;
  }
  .login-form {
    font-size: 0.5rem;
  }
  .nes-field {
    width:50%;
  }
}
</style>