<template>
  <div class="blogDisplay container">
    <h1>This is the HOME/BLOG page (infinite scroll intended)</h1>

      <div class="content h-100 overflow-auto bg-light px-4" >                 
          <div v-for="(blogpost, index) in blogpostsStore" :key="index">
              <div>
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
