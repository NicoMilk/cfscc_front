<template>
  <div class="adminBlog container">
    <h1>Admin - Gérer le BLOG</h1>
      <button type="button" class="btn btn-primary mx-auto" data-toggle="modal" data-target="#newBlogpostModal">Écrire un nouvel article</button>
      <br>
      <br>
      <div class="content h-100 overflow-auto bg-light px-4" >                 
          <div v-for="(blogpost, index) in blogpostsStore" :key="index">
            <div class="accordion" id="accordion">
              <div class="card">
                <div class="card-header" :id="'heading'+blogpost.blogpost_id">
                  <h2 class="mb-0">
                    <button class="btn btn-link collapsed" @click="getBlogpost(blogpost.blogpost_id)" type="button" data-toggle="collapse" :data-target="'#collapse'+blogpost.blogpost_id" aria-expanded="true" :aria-controls="'collapse'+blogpost.blogpost_id">
                      <strong>{{blogpost.title}}</strong>                
                      <p>Date : {{blogpost.created_at}}</p>                
                      <p>Maj : {{blogpost.updated_at}}</p>
                    </button> 
                  </h2>
                </div>
              <div :id="'collapse'+blogpost.blogpost_id" class="collapse" :aria-labelledby="'heading'+blogpost.blogpost_id" data-parent="#accordion">
                <div class="card-body">
                  <label for="title">Titre :</label>
                  <input type="text" class="form-control" v-model="selectedBlogpost.title" id="title"/><br>
                  <label for="content">Texte :</label>
                  <textarea class="form-control" v-model="selectedBlogpost.content" id="content" rows="10"></textarea><br>
                  <!-- AUTHOR SECTION -->
                  <!-- <label for="author">Auteur :</label>
                  <select class="form-control" v-model="selectedBlogpost.author_id" id="author">
                    <option></option> // loop through authors
                  </select><br> -->
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="updateBlogpost(blogpost.blogpost_id)">Mettre à jour</button>
                    <!-- <button type="button" class="btn btn-secondary" data-dismiss="accordion">Annuler</button> -->
                    <button type="button" class="btn btn-danger" @click="destroyBlogpost(blogpost.blogpost_id)">Supprimer l'évènement</button>
                  </div>
                </div>
              </div>
            </div>
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
              <textarea class="form-control" v-model="form.content" id="content" rows="10"></textarea><br>
              
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

      selectedBlogpost: {},
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
    },

    getBlogpost(id) {
      blogpost.getBlogpost(id)
        .then(response => this.selectedBlogpost = response.data);
    },

    updateBlogpost(id) {
      blogpost.updateBlogpost(id, this.selectedBlogpost)
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
