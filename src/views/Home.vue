<template>
  <div class="home">
    <BlogDisplay/>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogDisplay from '@/components/BlogDisplay.vue'
import user from '@/apis/user.js'

export default {
  name: 'Home',
  components: {
    BlogDisplay,
  },

    data() {
      return {
      isLogged: false,
      isAdmin: false,
      user: null,
      };
    },

    updated() {
      if (this.isLogged && !this.user) {
        user.auth().then(response => {
          this.user = response.data;
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

    // methods: {
    //   logout() {
    //     user.logout().then(() => {
    //       localStorage.removeItem('api_token');
    //       this.user = null;
    //     });
    //   }
    // },
}
</script>
