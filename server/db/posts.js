const knex = require("./knex.js");

function createPost(post) {
    return knex("posts").insert(post);
}

function getAllPosts() {
    return knex("posts").select("*");
}

module.exports = {
    createPost,
    getAllPosts,
}