<template>
  <div id="app">
    <NavBar/>
      <!-- <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/register">Register</router-link> |
          <router-link to="/login">Login</router-link> |
          <a href="#" @click="logout">Logout</a> |
          <router-link to="/calendar">Calendrier</router-link> |
          <router-link to="/dps">DPS</router-link> |
          <router-link to="/about">About</router-link> |
          <router-link to="/admin/members">Utilisateurs (admin)</router-link> |
          <router-link to="/admin/events">Evènements (admin)</router-link> |
          <router-link to="/admin/blog">Blog (admin)</router-link>
      </div> -->
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
// import User from '@/apis/user.js'

export default {
  name: 'App',
  components: {
    NavBar
  },

// methods: {
//   logout() {
//     User.logout().then(() => {
//       localStorage.removeItem('api_token');
//       // this.user = null;
//     });
//   }
// },

  // data() {
  //   return {
  //     isLogged: false,
  //     user: null,
  //   };
  // },

  //   updated() {
  //       if (this.isLogged) {
  //         user.auth().then(response => {
  //           this.user = response.data;
  //         });
  //       }
  //   },

  //   mounted() {
  //   this.$root.$on('logged', () =>{
  //     this.isLogged = true;
  //   });

  //   this.isLogged = !!localStorage.getItem('api_token');

  //   if (this.isLogged) {
  //     user.auth().then(response => {
  //       this.user = response.data;
  //     });
  //   }
  // },

}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
