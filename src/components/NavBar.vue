<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
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
          <a v-if="isLogged && user" class="nav-link dropdown-toggle" href="#" id="loggedDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Bonjour {{user.firstname}}</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <!-- <router-link class="dropdown-item" type = "button" to="#">Éditer mon profil</router-link> -->
            <button class="dropdown-item text-muted" type = "button" href="#">Modifier mon profil</button>
            <button class="dropdown-item text-muted" type = "button" href="#">Reset mot de passe</button>
            <button class="dropdown-item" type = "button" href="#" @click="logout">Déconnexion</button>
          </div>
        </li>

        <li class="nav-item dropdown">  <!-- register form for keynote only -->
          <a v-if="!isLogged" class="nav-link dropdown-toggle" href="#" id="registerDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Inscription</a>
            <div class="dropdown-menu">
              <!-- <form class="px-4 py-3"> -->
                  <label for="lastname">Nom de famille :</label>
                  <input type="text" class="form-control" v-model="formGuest.lastname" id="lastname"/><br>
                  <label for="firstname">Prénom :</label>
                  <input type="text" class="form-control" v-model="formGuest.firstname" id="firstname"/><br>
                  <label for="email">Email :</label>
                  <input type="email" class="form-control" v-model="formGuest.email" id="email"/>
                  <small id="emailHelp" class="form-text text-muted">Votre email ne sera jamais communiqué à un tiers.</small><br>
                  <label for="phone">Tel. :</label>
                  <input type="text" class="form-control" v-model="formGuest.phone" id="phone"/>
                  <small id="phoneHelp" class="form-text text-muted">10 chiffres sans séparateur.</small>
                  <small id="phoneHelp" class="form-text text-muted">Votre numéro ne sera jamais communiqué à un tiers.</small><br>
                  <label for="password">Mot de passe :</label>
                  <input type="password" class="form-control" v-model="formGuest.password" id="password"/>
                  <small id="emailHelp" class="form-text text-muted">6 caractères minimum.</small><br>
                  <label for="password_conf">Mot de passe (confirmation) :</label>
                  <input type="password" class="form-control" v-model="formGuest.password_confirmation" id="password_confirmation"/><br>
                <button class="btn btn-primary" @click="registerNewGuest">Envoyer</button>
              <!-- </form> -->
            </div>
        </li>

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

      formGuest: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
      },

      formLogin: {
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

    registerNewGuest() {
      user.register(this.formGuest)
      .then(
        (response) => {

          this.formLogin.email = this.formGuest.email;
          this.formLogin.password = this.formGuest.password;

      user.login(this.formLogin)
      .then(
        (response) => {
          this.$root.$emit("logged", true);
          localStorage.setItem("api_token", response.data);
        }
      )
      }
      )
    },

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
