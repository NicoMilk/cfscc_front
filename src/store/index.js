import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

// const url = "http://localhost:8000/api/";
const url = process.env.URL_API;
const status = response => (response.status >= 200 && response.status < 300) ? Promise.resolve(response) : Promise.reject((response.statusText)); // TIP shorthand for actions

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users : [],
    user : {},
    events : [],
    event : {},
    blogposts : [],
  },

  mutations: {

    setUsers(state, users) {
      state.users = users;
    },

    setUser(state, user) {
      state.user = user;
    },

    setEvents(state, events) {
      state.events = events;
    },

    setEvents(state, event) {
      state.event = event;
    },

    setBlogposts(state, blogposts) {
      state.blogposts = blogposts;
    },

  },

  actions: {

    async getUsers(state) { // get all users
      const usersRaw = await fetch(url+"users", {
        headers : {
          "Content-Type": "application/json"
        }
      });
      const validUsers = await status(usersRaw)
      const users = await validUsers.json();
      state.commit("setUsers", users);
    },

    async getUser(state, id) {  // get SINGLE user by id (admin only)
      const userRaw = await fetch(url+"users/"+id, {
        headers : {
          "Content-Type": "application/json"
        }
      });
      const validUser = await status(userRaw)
      const user = await validUser.json();
      state.commit("setUser", user);
      state.commit("getUser");
    },

    async getEvents(state) {
      const eventsRaw = await fetch(url+"events", {
        headers : {
          "Content-Type": "application/json"
        }
      });
      const validEvents = await status(eventsRaw)
      const events = await validEvents.json();
      state.commit("setEvents", events);
    },

    async getBlogposts(state) {
      const blogpostsRaw = await fetch(url+"blogposts", {
        headers : {
          "Content-Type": "application/json"
        }
      });
      const validBlogposts = await status(blogpostsRaw)
      const blogposts = await validBlogposts.json();
      state.commit("setBlogposts", blogposts);
    },

  },

  modules: {
  },

  getters: {

    getUsers(state) {
      return state.users; 
     },

     getUser(state) {
      return state.user; 
     },

     getEvents(state) {
      return state.events; 
     },

     getEvents(state) {
      return state.event; 
     },

     getBlogposts(state) {
      return state.blogposts; 
     },
      
  },

plugins: [createPersistedState()]
})
