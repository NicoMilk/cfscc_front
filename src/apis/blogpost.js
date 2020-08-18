import Api from "./api";

export default {

    storeBlogpost(form) {
        return Api().post("blogposts", form)
    },

    getBlogpost(id) {
        return Api().get(`blogposts/${id}`)
    },

    updateBlogpost(id, form) {
        return Api().patch(`blogposts/${id}`, form)
    },
    
    destroyBlogpost(id) {
        return Api().delete(`blogposts/${id}`)
    },

}