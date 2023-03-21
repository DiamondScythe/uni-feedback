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

function createComment(comment) {
    return knex("Comments").insert(comment);
}

function getComments(idea_id) {
    return knex("Comments").where('idea_id', idea_id)
}

function deleteIdea(id){
    return knex("Ideas").where('id', id).del()
}

module.exports = {
    createIdea,
    getAllIdeas,
    getAllCategories,
    getIdeaDetails,
    createComment,
    getComments,
    deleteIdea,
}