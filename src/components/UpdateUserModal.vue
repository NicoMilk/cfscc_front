<template>
  <div>
    <!-- MODAL UPDATE USER-->
    <div class="modal fade" id="updateUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Utilisateur</h5>
          </div>
          <div class="modal-body">
            <label for="lastname">Nom de famille :</label>
            <input type="text" class="form-control" v-model="user.lastname" id="lastname"/><br>
            <label for="firstname">Prénom :</label>
            <input type="text" class="form-control" v-model="user.firstname" id="firstname"/><br>
            <label for="email">Email :</label>
            <input type="email" class="form-control" v-model="user.email" id="email"/><br>
            <label for="phone">Tel. :</label>
            <input type="text" class="form-control" v-model="user.phone" id="phone"/><br>
            <label for="role">Role :</label>
            <select class="form-control" v-model="user.role" id="role">
              <option>Guest</option>
              <option>Member</option>
              <option>Admin</option>
            </select>
            <br>
          </div>
          <div class="modal-footer">
            <button @click="$emit('close')">Fermer</button>
            <!-- <button type="button" class="btn btn-primary" @click="registerNewUser">Mettre à jour</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Supprimer l'utilisateur</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>