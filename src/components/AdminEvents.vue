<template>
  <div class="adminEvents container">
    <h1>Admin - Gérer les ÉVÈNEMENTS</h1>
      <button type="button" class="btn btn-primary mx-auto" data-toggle="modal" data-target="#newEventModal">Créer un nouvel évènement</button>
      <br>
      <br>
      <div class="content h-100 overflow-auto bg-light px-4" >                 
        <div v-for="(event, index) in eventsStore" :key="index">
          <div class="accordion" id="accordion">
            <div class="card">
              <div class="card-header" :id="'heading'+event.event_id">
                <h2 class="mb-0 d-flex justify-content-between align-items-center">
                  <button class="btn btn-link collapsed" @click="getEvent(event.event_id)" type="button" data-toggle="collapse" :data-target="'#collapse'+event.event_id" aria-expanded="true" :aria-controls="'collapse'+event.event_id">
                    <strong>{{event.type}}</strong>                
                    <p>Date : {{event.date_start}}</p>                
                    <p>Places restantes : {{event.slots_left}}</p>                
                    <p>Inscrits : {{event.registered}}</p>
                  </button>
                  <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Voir les inscrits
                  </button> -->
                </h2>
              </div>

              <div :id="'collapse'+event.event_id" class="collapse" :aria-labelledby="'heading'+event.event_id" data-parent="#accordion">
                <div class="card-body">
                  <strong>Inscrits :</strong>
                    <div v-for="(eventUser, index) in eventUsers" :key="index">
                      <div class="d-flex justify-content-between align-items-center">
                        <p>{{eventUser.firstname}} {{eventUser.lastname}}</p>
                        <button class="btn btn-danger" @click="destroyRegistrationUser(eventUser.reg_id)" type="submit">Désinscrire</button>
                      </div>
                        <hr>
                    </div>
                  <strong>Modifier l'évènement :</strong>
                  <br>
                  <label for="type">Type :</label>
                  <select class="form-control" v-model="selectedEvent.type" id="type">
                    <option>PSC1</option>
                    <option>PSE1</option>
                    <option>PSE2</option>
                    <option>RECYCLAGE</option>
                    <option>DPS</option>
                    <option>Garde en caserne</option>
                    <option>Divers</option>
                  </select><br>
                  <label for="description">Description :</label>
                  <textarea class="form-control" v-model="selectedEvent.description" id="description" rows="5"></textarea><br>
                  <label for="date_start">Date de début :</label>
                  <input type="date" class="form-control" v-model="selectedEvent.date_start" id="date_start"/><br>
                  <label for="date_end">Date de fin :</label>
                  <input type="date" class="form-control" v-model="selectedEvent.date_end" id="date_end"/><br>
                  <label for="price">Prix :</label>
                  <input type="text" class="form-control" v-model="selectedEvent.price" id="price"/><br>
                  <label for="slots_left">Places restantes :</label>
                  <input type="text" class="form-control" v-model="selectedEvent.slots_left" id="slots_left"/><br>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="updateEvent(event.event_id)">Mettre à jour</button>
                    <!-- <button type="button" class="btn btn-secondary" data-dismiss="accordion">Annuler</button> -->
                    <button type="button" class="btn btn-danger" @click="destroyEvent(event.event_id)">Supprimer l'évènement</button>
                  </div>
                </div>
              </div>
            </div>
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
              <label for="price">Prix :</label>
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
import registration from '@/apis/registration.js'

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

      selectedEvent: {},
      eventUsers: {},
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

    getEvent(id) {
      event.getEvent(id)
        .then(response => this.selectedEvent = response.data);
      registration.getEventUsers(id)
        .then(response => this.eventUsers = response.data);console.log(this.eventUser);
    },

    destroyRegistrationUser(reg_id) {
      registration.destroyRegistration(reg_id)
    },

    updateEvent(id) {
      event.updateEvent(id, this.selectedEvent)
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
