import Api from "./api";

export default {

    storeRegistration(form) {
        return Api().post("registrations", form)
    },

    getEventUsers(id) { // find users registered to a specific event
        return Api().get(`registrations/${id}`)
    },

    destroyRegistration(id) {
        return Api().delete(`registrations/${id}`)
    },

}