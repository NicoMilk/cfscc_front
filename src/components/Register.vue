<template>
  <div class="register">
    <h1>This is a REGISTER page</h1>

          <label for="lastname">Nom de famille :</label>
          <input type="text" v-model="form.lastname" id="lastname"/><br>
          <label for="firstname">Prénom :</label>
          <input type="text" v-model="form.firstname" id="firstname"/><br>
          <label for="email">Email :</label>
          <input type="email" v-model="form.email" id="email"/><br>
          <label for="phone">Tel. :</label>
          <input type="text" v-model="form.phone" id="phone"/><br>
          <label for="password">Password :</label>
          <input type="password" v-model="form.password" id="password"/><br>
          <label for="password_conf">Password confirmation :</label>
          <input type="password" v-model="form.password_confirmation" id="password_confirmation"/><br>
          <!-- <button>Envoyer</button> -->
          <button @click="registerNewUser">Envoyer</button>

  </div>
</template>

<script>
// @ is an alias to /src
import user from '@/apis/user.js'

export default {
  name: 'Register',

  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: ""
      },
    };
  },

  methods: {

    registerNewUser() {
      user.register(this.form)
      .then(
        (response) => {
          // this.$root.$emit("login", true);
          this.$router.push({name : "Home"});
        }
      )
    }
  }

}
</script>
