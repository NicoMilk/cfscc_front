import Api from "./api";

export default {

    storeEvent(form) {
        return Api().post("events", form)
    },

    getEvent(id) {
        return Api().get(`events/${id}`)
    },

    updateEvent(id, form) {
        return Api().patch(`events/${id}`, form)
    },

    // updateCounters(id) {
    //     return Api().patch(`events/${id}`)
    // },
    
    destroyEvent(id) {
        return Api().delete(`events/${id}`)
    },

}