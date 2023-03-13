const knex = require("./knex.js");

function createIdea(idea) {
    return knex("Ideas").insert(idea);
}

function getAllIdeas() {
    return knex("Ideas").select("*");
}

module.exports = {
    createIdea,
    getAllIdeas,
}