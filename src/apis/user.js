import Api from "./api";

export default {

    register(form) {
        return Api().post("register", form)
    },

    updateUser(id, form) {
        return Api().patch(`users/${id}`, form)
    },

    destroyUser(id) {
        return Api().delete(`users/${id}`)
    },

    getUser(id) {
        return Api().get(`users/${id}`)
    },

    login(form) {
        return Api().post("login", form)
    },

    auth() {
        return Api().get('user')
    },

    logout() {
        return Api().post("logout")
    },

}