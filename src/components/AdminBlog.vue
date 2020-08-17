<template>
  <div class="adminBlog container">
    <h1>Ceci est la gestion du BLOG pour ADMIN</h1>
      <button type="button" class="btn btn-primary mx-auto" data-toggle="modal" data-target="#newBlogpostModal">Écrire un nouvel article</button>
      <br>
      <br>
      <div class="content h-100 overflow-auto bg-light px-4" >                 
          <div v-for="(blogpost, index) in blogpostsStore" :key="index">
              <div>
                <strong>{{blogpost.title}}</strong>                
                <p>Date : {{blogpost.created_at}}</p>                
                <p>Maj : {{blogpost.updated_at}}</p>
                <!-- <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#destroyModal">Supprimer</button> -->
                <button type="button" class="btn btn-danger" @click="destroyBlogpost(blogpost.blogpost_id)" >Supprimer</button>
                <hr>
              </div> 
          </div>
      </div>

      <!-- MODAL NEW BLOGPOST -->
      <div class="modal fade" id="newBlogpostModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Nouvel article</h5>
            </div>
            <div class="modal-body">
              <label for="title">Titre :</label>
              <input type="text" class="form-control" v-model="form.title" id="title"/><br>
              <label for="content">Texte :</label>
              <textarea class="form-control" v-model="form.content" id="content" rows="5"></textarea><br>
              
              <!-- AUTHOR SECTION -->
              <!-- <label for="author">Auteur :</label>
              <select class="form-control" v-model="form.author_id" id="author">
                <option>1</option>
              </select><br> -->
            
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
              <button type="button" class="btn btn-primary" @click="registerNewBlogpost">Enregistrer</button>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL DESTROY BLOGPOST -->
      <!-- <div class="modal fade" id="destroyModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <h5 class="modal-title" id="exampleModalLongTitle">Êtes-vous sûr de vouloir supprimer ?</h5>
              <p>Cette action est irréversible</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
              <button type="button" class="btn btn-danger">Supprimer</button>
            </div>
          </div>
        </div>
      </div> -->

  </div>
</template>

<script>
// @ is an alias to /src
import blogpost from '@/apis/blogpost.js'

export default {
  name: 'AdminBlog',

  data() {
    return {
      form: {
        title: "",
        author_id: "",
        content: "",
      },

    };
  },


  props:{

  },

  mounted() {
    this.$store.dispatch("getBlogposts");
  },

  methods: {

    registerNewBlogpost() {
      blogpost.storeBlogpost(this.form)
      // .then(
      //   (response) => {
          // this.$root.$emit("login", true);
          // this.$router.push({name : "Home"});
        // }
      // )
    },

    destroyBlogpost(id) {
      blogpost.destroyBlogpost(id)
    },
    
  },

  computed : {
    blogpostsStore () {
        return this.$store.getters.getBlogposts;
    },  

}


}
</script>
