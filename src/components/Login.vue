<template>
  <div class="login container">
    <h1>This is the LOGIN page</h1>

          <label for="email">Email :</label>
          <input type="email" class="form-control" v-model="form.email" id="email"/><br>
          <label for="password">Password :</label>
          <input type="password" class="form-control" v-model="form.password" id="password"/><br>
          <button class="btn btn-primary" @click="login">Envoyer</button>

  </div>
</template>

<script>
// @ is an alias to /src
import user from '@/apis/user.js'

export default {
  name: 'Login',

  data() {

    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  methods: {

    login() {
      user.login(this.form)
      .then(
        (response) => {
          this.$root.$emit("logged", true);
          this.$root.$emit("admin", true);
          localStorage.setItem("api_token", response.data);
          this.$router.push({name : "Home"});
        }
      )
    }
  }

}
</script>
