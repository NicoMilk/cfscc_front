import Api from "./api";

export default {

    storeEvent(form) {
        return Api().post("events", form)
    },

    destroyEvent(id) {
        return Api().delete(`events/${id}`)
    },

}