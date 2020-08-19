<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/">CFSCC_logo</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/calendar">Calendrier</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dps">DPS</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">A propos</router-link>
        </li>
        <li class="nav-item dropdown">
          <a v-if="isLogged && isAdmin" class="nav-link dropdown-toggle" href="#" id="adminDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Admin
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <router-link class="dropdown-item" type = "button" to="/admin/members">Utilisateurs</router-link>
            <router-link class="dropdown-item" type = "button" to="/admin/events">Évènements</router-link>
            <router-link class="dropdown-item" type = "button" to="/admin/blog">Blog</router-link>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a v-if="isLogged" class="nav-link dropdown-toggle" href="#" id="loggedDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Bonjour {{user.firstname}}</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <!-- <router-link class="dropdown-item" type = "button" to="#">Éditer mon profil</router-link> -->
            <button class="dropdown-item" type = "button" href="#" @click="logout">Déconnexion</button>
          </div>
        </li>

        <!-- <li class="nav-item">
          <router-link v-if ="!isLogged" class="nav-link" to="/login">Connexion</router-link>
        </li> -->

          <li class="nav-item dropdown">
            <a v-if="!isLogged" class="nav-link dropdown-toggle" href="#" id="loginDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Connexion</a>
              <div class="dropdown-menu">
                <!-- <form class="px-4 py-3"> -->
                  <div class="form-group">
                    <label for="exampleDropdownFormEmail1">Email :</label>
                    <input type="email" class="form-control" v-model="form.email" id="email1" placeholder="email@example.com">
                  </div>
                  <div class="form-group">
                    <label for="exampleDropdownFormPassword1">Password :</label>
                    <input type="password" class="form-control" v-model="form.password" id="password" placeholder="Password">
                  </div>
                  <button class="btn btn-primary" @click="login">Envoyer</button>
                <!-- </form> -->
              </div>
          </li>

      </ul>
    </div>
  </nav>
</template>

<script>
// @ is an alias to /src
import user from '@/apis/user.js'

export default {
  name: 'NavBar',
  props: {

  },

  data() {
    return {
      isLogged: false,
      isAdmin: false,
      user: null,

      form: {
        email: "",
        password: "",
      },

    };
  },

  updated() {
    if (this.isLogged && !this.user) {
      user.auth().then(response => {
        this.user = response.data;

      if(this.user.role == "admin") {
        this.isAdmin = true;
      }

      });
    }
  },

  mounted() {
    this.$root.$on('logged', () =>{
      this.isLogged = true;
    });

    this.isLogged = !!localStorage.getItem('api_token');

    if (this.isLogged) {
      user.auth().then(response => {
        this.user = response.data;
      if(this.user.role == "admin") {
        this.isAdmin = true;
      }
      });
    }
  },

  methods: {

    login() {
      user.login(this.form)
      .then(
        (response) => {
          this.$root.$emit("logged", true);
          // this.$root.$emit("admin", true);  // WARNING
          localStorage.setItem("api_token", response.data);
        }
      )

      // user.auth()
      // .then(response => {
      //   this.user = response.data;
      //   if(this.user.role == "admin") {
      //   this.isAdmin = true;
      //   }
      // });

    },

    logout() {
      user.logout().then(() => {
        localStorage.removeItem('api_token');
        this.isLogged = false;
        this.isAdmin = false;
        this.user = null;
        this.$router.push({name : "Home"});
      });
    }
},

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.dropdown-menu {
  min-width: 20rem;
  padding: 0.5rem;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
/* a {
  color: #42b983;
} */
</style>
