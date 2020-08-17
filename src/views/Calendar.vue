<template>
  <div class="calendar container">
    <h1>Ceci est le CALENDRIER</h1>
      <div class="content h-100 overflow-auto bg-light px-4" >                 
          <div v-for="(event, index) in eventsStore" :key="index">
              <div>
                <strong>{{event.type}}</strong>                
                <p>Date : {{event.date_start}}</p>                
                <p v-if="event.slots_left != null">Places restantes : {{event.slots_left}}</p>                
                <p>Inscrits : {{event.registered}}</p>
                <button v-if="(event.type == 'PSC1'|| event.type == 'PSE1'|| event.type == 'PSE2'|| event.type == 'RECYCLAGE') && !isLogged" type="button" class="btn btn-primary" data-toggle="modal" data-target="#newGuestModal">Créer un compte et m'inscrire</button>
                <!-- <button v-if="(event.type == 'Poste'|| event.type == 'Garde en caserne'|| event.type == 'Divers') && (isAdmin || isMember)" type="button" class="btn btn-primary" data-toggle="modal" data-target="#newGuestModal">Je m'inscris</button> -->
                <button v-else-if="isLogged" @click="storeRegistration(event.event_id)" type="button" class="btn btn-primary">Je m'inscris !</button>
                <!-- <button v-else-if="event.type != 'PSC1' && !isLogged" @click="storeRegistration(event.event_id)" type="button" class="btn btn-primary">Je m'inscris !</button> -->
                <hr>            
              </div> 
          </div>
      </div>

      <!-- MODAL NEW GUEST -->
      <div class="modal fade" id="newGuestModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Inscription</h5>
            </div>
            <div class="modal-body form-group">
              <label for="lastname">Nom de famille :</label>
              <input type="text" class="form-control" v-model="formGuest.lastname" id="lastname"/><br>
              <label for="firstname">Prénom :</label>
              <input type="text" class="form-control" v-model="formGuest.firstname" id="firstname"/><br>
              <label for="email">Email :</label>
              <input type="email" class="form-control" v-model="formGuest.email" id="email"/>
              <small id="emailHelp" class="form-text text-muted">Votre email ne sera jamais communiqué à un tiers.</small><br>
              <label for="phone">Tel. :</label>
              <input type="text" class="form-control" v-model="formGuest.phone" id="phone"/>
              <small id="phoneHelp" class="form-text text-muted">10 chiffres sans séparateur.</small>
              <small id="phoneHelp" class="form-text text-muted">Votre numéro ne sera jamais communiqué à un tiers.</small><br>
              <label for="password">Mot de passe :</label>
              <input type="password" class="form-control" v-model="formGuest.password" id="password"/>
              <small id="emailHelp" class="form-text text-muted">6 caractères minimum.</small><br>
              <label for="password_conf">Mot de passe (confirmation) :</label>
              <input type="password" class="form-control" v-model="formGuest.password_confirmation" id="password_confirmation"/><br>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
              <button type="button" class="btn btn-primary" @click="registerNewGuest">Enregistrer</button>
            </div>
          </div>
        </div>
      </div>

    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import user from '@/apis/user.js'
import registration from '@/apis/registration.js'

export default {
  name: 'Calendar',

  data() {
    return {
      isLogged: false,
      isAdmin: false,
      isMember: false,

      formEvent: {
        event_id: "",
        user_id: "",
      },

      formGuest: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
      },

      formLogin: {
        email: "",
        password: "",
      },
    };
  },

  props:{

  },

  updated() {
    if (this.isLogged && !this.user) {
      user.auth().then(response => {
        this.user = response.data;
      });
    }
  },


  mounted() {
    this.$store.dispatch("getEvents");

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

      if(this.user.role == "member") {
        this.isMember = true;
      }

      if(this.user.role == "guest") {
        this.isGuest = true;
      }

      });
    }
  },

  methods: {

    registerNewGuest() {
      user.register(this.formGuest)
      .then(
        (response) => {

      this.formLogin.email = this.formGuest.email;
      this.formLogin.password = this.formGuest.password;

      user.login(this.formLogin)
      .then(
        (response) => {
          this.$root.$emit("logged", true);
          // this.$root.$emit("admin", true);  // WARNING
          localStorage.setItem("api_token", response.data);
        }
      )
      .then (
        (response) => {

      this.storeRegistration(this.event_id)  // TODO implement (envoie le token précédent ???)
      // await storeRegistration(this.event_id)  // TODO implement (envoie le token précédent ???)
      })
      }
      )
    },


    async storeRegistration(event_id) {

      const response = await user.auth()

      this.formEvent.user_id = response.data.user_id;
      this.formEvent.event_id = this.event_id;

      registration.storeRegistration(this.formEvent)
      .then(
        (response) => {
          this.$router.push({name : "Home"});
        }
      )
    }
  },

  computed : {
    eventsStore () {
        return this.$store.getters.getEvents;
    },

}


}
</script>
