const knex = require("./knex.js");

function createIdea(idea) {
    return knex("Ideas").insert(idea);
}

function getAllIdeas() {
    return knex("Ideas").select("*");
}

function getAllCategories() {
    return knex("Categories").select("*");
}

function getIdeaDetails(id) {
    return knex("Ideas").where('id', id);
}

module.exports = {
    createIdea,
    getAllIdeas,
    getAllCategories,
    getIdeaDetails,
}