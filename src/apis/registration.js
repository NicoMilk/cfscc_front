import Api from "./api";

export default {

    storeRegistration(form) {
        return Api().post("registrations", form)
    },

}