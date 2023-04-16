const knex = require("./knex.js");

function createClosureDate(closureDate) {
  return knex
    .transaction((trx) => {
      return trx("ClosureDates")
        .where({ id: 1 })
        .first()
        .then((existingClosureDate) => {
          if (existingClosureDate) {
            return trx("ClosureDates")
              .where({ id: 1 })
              .update(closureDate)
              .transacting(trx);
          } else {
            return trx("ClosureDates")
              .insert({ id: 1, ...closureDate })
              .transacting(trx);
          }
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then(() => {
      return knex("ClosureDates").where({ id: 1 });
    });
}

function getAllClosureDates() {
  return knex("ClosureDates").where({ id: 1 });
}

module.exports = {
  createClosureDate,
  getAllClosureDates,
};
