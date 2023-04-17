const knex = require("./knex.js");

function createIdea(idea) {
  return knex("Ideas").insert(idea);
}

function getAllIdeas() {
  return knex("Ideas").select("*");
}

function createCategory(category) {
  return knex("Categories").insert(category);
}

function deleteCategory(id) {
  return knex("Categories").where("id", id).del();
}

function getAllCategories() {
  return knex("Categories").select("*");
}

function getIdeaDetails(id) {
  return knex("Ideas").where("id", id);
}

function createComment(comment) {
  return knex("Comments").insert(comment);
}

function getComments(idea_id) {
  return knex("Comments").where("idea_id", idea_id);
}

function deleteIdea(id) {
  return knex("Ideas").where("id", id).del();
}

//voting
//the id here is post_id, not vote_id

function getAllIdeaVotes(id) {
  return knex("Votes")
    .join("Ideas", "Votes.idea_id", "=", "Ideas.id")
    .where("Ideas.id", id)
    .sum("value as votes");
}

function voteIdea(vote) {
  return knex("Votes")
    .insert(vote)
    .onConflict(["user_id", "idea_id"])
    .merge()
    .catch((err) => {
      console.log(err);
    });
}

//the below knex function gets the user_id that's associated with a specific idea_id
function getIdeaUser(idea_id) {
  return knex("Ideas")
    .join("Users", "Ideas.user_id", "=", "Users.id")
    .where("Ideas.id", idea_id)
    .select("Users.id");
}

//the below knex function gets the email address that's associated with a specific user_id
function getUserEmail(user_id) {
  return knex("Users").where("id", user_id).select("email");
}

module.exports = {
  createIdea,
  getAllIdeas,
  getAllCategories,
  getIdeaDetails,
  createComment,
  getComments,
  deleteIdea,
  getAllIdeaVotes,
  voteIdea,
  createCategory,
  deleteCategory,
  getIdeaUser,
  getUserEmail,
};
