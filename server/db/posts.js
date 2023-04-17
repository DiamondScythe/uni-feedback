const knex = require("./knex.js");

function createPost(post) {
    return knex("Test").insert(post);
}

function getAllPosts() {
    return knex("Test").select("*");
}

module.exports = {
    createPost,
    getAllPosts,
}