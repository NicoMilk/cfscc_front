import Api from "./api";

export default {

    storeBlogpost(form) {
        return Api().post("blogposts", form)
    },

    destroyBlogpost(id) {
        return Api().delete(`blogposts/${id}`)
    },

}