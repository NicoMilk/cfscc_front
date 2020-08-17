<template>
  <div class="adminEvents container">
    <h1>Ceci est la gestion des ÉVÈNEMENTS pour ADMIN</h1>
      <button type="button" class="btn btn-primary mx-auto" data-toggle="modal" data-target="#newEventModal">Créer un nouvel évènement</button>
      <br>
      <br>
      <div class="content h-100 overflow-auto bg-light px-4" >                 
          <div v-for="(event, index) in eventsStore" :key="index">
              <div>
                <strong>{{event.type}}</strong>                
                <p>Date : {{event.date_start}}</p>                
                <p>Places restantes : {{event.slots_left}}</p>                
                <p>Inscrits : {{event.registered}}</p>
                <button type="button" class="btn btn-danger" @click="destroyEvent(event.event_id)" >Supprimer</button>
                <hr>            
              </div> 
          </div>
      </div>

      <!-- MODAL NEW EVENT -->
      <div class="modal fade" id="newEventModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Nouvel Évènement</h5>
            </div>
            <div class="modal-body">
              <label for="type">Type :</label>
              <select class="form-control" v-model="form.type" id="type">
                <option>PSC1</option>
                <option>PSE1</option>
                <option>PSE2</option>
                <option>RECYCLAGE</option>
                <option>DPS</option>
                <option>Garde en caserne</option>
                <option>Divers</option>
              </select><br>
              <label for="description">Description :</label>
              <textarea class="form-control" v-model="form.description" id="description" rows="5"></textarea><br>
              <label for="date_start">Date de début :</label>
              <input type="date" class="form-control" v-model="form.date_start" id="date_start"/><br>
              <label for="date_end">Date de fin :</label>
              <input type="date" class="form-control" v-model="form.date_end" id="date_end"/><br>
              <label for="price">Prix. :</label>
              <input type="text" class="form-control" v-model="form.price" id="price"/><br>
              <label for="slots_left">Places restantes :</label>
              <input type="text" class="form-control" v-model="form.slots_left" id="slots_left"/><br>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
              <button type="button" class="btn btn-primary" @click="registerNewEvent">Enregistrer</button>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
// @ is an alias to /src
import user from '@/apis/user.js'
import event from '@/apis/event.js'

export default {
  name: 'AdminEvents',

  data() {
    return {
      form: {
        type: "",
        description: "",
        date_start: "",
        date_end: "",
        price: "",
        slots_left: ""
      },
    };
  },

  props:{

  },

  mounted() {
    this.$store.dispatch("getEvents");
  },

  methods: {

    registerNewEvent() {
      event.storeEvent(this.form)
      .then(
        (response) => {
          this.$router.push({name : "Home"});
        }
      )
    },

    destroyEvent(id) {
      event.destroyEvent(id)
    },

  },

  computed : {
    eventsStore () {
        return this.$store.getters.getEvents;
    },  

}


}
</script>
