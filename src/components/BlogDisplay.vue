<template>
  <div class="blogDisplay container">
    <h1>Bienvenue au CFSCC !</h1>
    <h4>(Comité Français de Secourisme - Circonscription de Chennevières)</h4>
    <br>
    <h5>Dernières actus :</h5>

      <div class="content h-100 overflow-auto bg-light px-0" >                 
          <div v-for="(blogpost, index) in blogpostsStore" :key="index">
              <div class="p-2">
                <strong>{{blogpost.title}}</strong>                
                <p>Date : {{blogpost.created_at}}</p>                
                <p>Maj : {{blogpost.updated_at}}</p>                
                <p>{{blogpost.content}}</p>
                <hr>
              </div> 
          </div>
      </div>

    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'BlogDisplay',

  props:{

  },

  mounted() {
    this.$store.dispatch("getBlogposts");
  },

  methods: {

  },

  computed : {
    blogpostsStore () {
        return this.$store.getters.getBlogposts;
    },  

}


}
</script>
