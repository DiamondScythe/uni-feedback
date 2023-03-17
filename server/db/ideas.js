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

module.exports = {
    createIdea,
    getAllIdeas,
    getAllCategories,
}