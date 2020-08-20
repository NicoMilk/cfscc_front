<template>
  <div class="adminUsers container">
    <h1>Admin - Gérer les UTILISATEURS</h1>
      <button type="button" class="btn btn-primary mx-auto" data-toggle="modal" data-target="#newUserModal">Inscrire un nouvel utilisateur</button>
      <br>
      <br>
      <div class="content h-100 overflow-auto bg-light px-4" >  
        <div v-for="(user, index) in usersStore" :key="index">

          <div class="accordion" id="accordion">
            <div class="card">
              <div class="card-header" :id="'heading'+user.user_id">
                <h2 class="mb-0">
                  <button class="btn btn-link collapsed" @click="getUser(user.user_id)" type="button" data-toggle="collapse" :data-target="'#collapse'+user.user_id" aria-expanded="true" :aria-controls="'collapse'+user.user_id">
                    {{user.firstname}} {{user.lastname}} {{user.role}}
                  </button>
                </h2>
              </div>

              <div :id="'collapse'+user.user_id" class="collapse" :aria-labelledby="'heading'+user.user_id" data-parent="#accordion">
                <div class="card-body">
                  <label for="lastname">Nom de famille :</label>
                  <input type="text" class="form-control" v-model="selectedUser.lastname" id="lastname"/><br>
                  <label for="firstname">Prénom :</label>
                  <input type="text" class="form-control" v-model="selectedUser.firstname" id="firstname"/><br>
                  <!-- <label for="email">Email :</label>
                  <input type="email" class="form-control" v-model="selectedUser.email" id="email"/><br> -->
                  <label for="phone">Tel. :</label>
                  <input type="text" class="form-control" v-model="selectedUser.phone" id="phone"/>
                  <small id="phoneHelp" class="form-text text-muted">10 chiffres sans séparateur.</small><br>
                  <label for="role">Role :</label>
                  <select class="form-control" v-model="selectedUser.role" id="role">
                    <option>Guest</option>
                    <option>Member</option>
                    <option>Admin</option>
                  </select><br>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="updateUser(user.user_id)">Mettre à jour</button>
                    <!-- <button type="button" class="btn btn-secondary" data-dismiss="accordion">Annuler</button> -->
                    <button type="button" class="btn btn-danger" @click="destroyUser(user.user_id)">Supprimer l'utilisateur</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    <!-- MODAL NEW USER -->
    <div class="modal fade" id="newUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Nouvel Utilisateur</h5>
          </div>
          <div class="modal-body">
            <label for="lastname">Nom de famille :</label>
            <input type="text" class="form-control" v-model="form.lastname" id="lastname"/><br>
            <label for="firstname">Prénom :</label>
            <input type="text" class="form-control" v-model="form.firstname" id="firstname"/><br>
            <label for="email">Email :</label>
            <input type="email" class="form-control" v-model="form.email" id="email"/><br>
            <label for="phone">Tel. :</label>
            <input type="text" class="form-control" v-model="form.phone" id="phone"/><br>
            <label for="role">Role :</label>
            <select class="form-control" v-model="form.role" id="role">
              <option>Guest</option>
              <option>Member</option>
              <option>Admin</option>
            </select><br>
            <label for="password">Password :</label>
            <input type="password" class="form-control" v-model="form.password" id="password"/><br>
            <label for="password_conf">Password confirmation :</label>
            <input type="password" class="form-control" v-model="form.password_confirmation" id="password_confirmation"/><br>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-primary" @click="registerNewUser">Enregistrer</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import user from '@/apis/user.js'

export default {
  name: 'AdminUsers',

  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        role: ""
      },
      users:{},
      selectedUser: {},
      // id: "",
    };
  },

  props:{

  },

  mounted() {
    this.$store.dispatch("getUsers");

  },

  methods: {

    registerNewUser() {
      user.register(this.form)
      .then(
        (response) => {

        $(function () { // close modal after save
          $('#newUserModal').modal('toggle');
        });
          // this.$root.$emit("login", true);
          // this.$router.push({name : "Home"});
        }
      )
    },

    getUser(id/*, index*/) {
      user.getUser(id)
        .then(response => this.selectedUser = response.data);
    },

    updateUser(id) {
      user.updateUser(id, this.selectedUser)
    },

    destroyUser(id) {
      user.destroyUser(id)
    },

  },

  computed : {
    usersStore () {
        return this.$store.getters.getUsers;
    },

}


}
</script>
