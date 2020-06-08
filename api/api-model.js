const db = require("../database/connection.js");

module.exports = {
  add,
  find,
  findBy,
  findByName,
  updateUser,
  getUserId,
  getUserDetails,
  remove,
};

function add(user) {
  return db("user").insert(user, "id");
}

function remove(id) {
  return db("user").del().where({ id });
}

function findByName(username) {
  return db("user").select("username", "email").where({ username }).first();
}

function getUserDetails(username) {
  return db("user").where({ username }).first();
}

function getUserId(username) {
  return db("user").select("id").where({ username }).first();
}

function findBy(filter) {
  return db("user").select("username", "phoneNumber").where(filter);
}

function find() {
  return db("user").select("username");
}

function updateUser(updates, username) {
  return db("user")
    .where({ username })
    .first()
    .then((details) => {
      const upd = { ...details, ...updates };
      const { username, email } = upd;
      return { username, email };
    })
    .then((ret) =>
      db("user")
        .update(ret, "username")
        .where({ username })
        .then((uname) => uname[0] === ret.username && ret)
    );
}
